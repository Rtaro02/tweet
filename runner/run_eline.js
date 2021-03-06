const TWEET = require('../tweet/tweet.js');
const ELINE = require('../eline/fetch_eline.js');
const request = require('request');
const FIRESTORE = require('../firestore/firestore.js');
const fs = require('fs');
// const ELINE_ANGERME_URL = 'https://www.elineupmall.com/?subcats=Y&pcode_from_q=Y&pshort=Y&pfull=Y&pname=Y&pkeywords=Y&search_performed=Y&q=%E3%82%A2%E3%83%B3%E3%82%B8%E3%83%A5%E3%83%AB%E3%83%A0&dispatch=products.search&page=';
const ELINE_MOMONA_URL = 'https://www.elineupmall.com/?subcats=Y&pcode_from_q=Y&pshort=Y&pfull=Y&pname=Y&pkeywords=Y&search_performed=Y&q=%E7%AC%A0%E5%8E%9F%E6%A1%83%E5%A5%88&dispatch=products.search&page='
const FINAL_PAGE = 1;

function getTweetText(x) {
  return '笠原桃奈ちゃんの新商品が発売されています #ANGERME #アンジュルム \n\n' + x.title + '\n' + x.url;
}

function imageSave(x) {
  return new Promise(function(resolve, reject) {
      request({method: 'GET', url: x.image, encoding: null}, function (error, response, body) {
        if(!error && response.statusCode === 200){
          fs.writeFileSync(x.name, body, 'binary');
        }
        resolve(x);
      });
  });
}

function tweet(x) {
  return new Promise(async function(resolve, reject) {
    var result = await FIRESTORE.findElineResult(x.url);
    if(result == null) {
      var error = await TWEET.post_with_images(getTweetText(x), [ x.name ]);
      if(!error) {
        await FIRESTORE.addElineResult(x);
      }
    } else {
      console.log(new Date() + ' ' + result.title + ' was already tweeted');
    }
    resolve();
  });
}

exports.run = async function() {
  var list = await ELINE.fetch(ELINE_MOMONA_URL, FINAL_PAGE);
  console.log(list);
  var myPromise = Promise.resolve();
  for(var x of list) {
    myPromise = myPromise.then(imageSave.bind(this, x)).then(tweet);
  }
}