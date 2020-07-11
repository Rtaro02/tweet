var assert = require('assert');
var fetch_ameba = require('../ameba/fetch_ameba.js');
const MOMONA_URL = 'https://ameblo.jp/angerme-ss-shin/theme-10097979200.html';
const MUROTA_URL = 'https://ameblo.jp/angerme-ss-shin/theme-10087284995.html';

describe('アメブロ挙動確認', function () {
    // テストのタイムアウトを10sec.に設定
    this.timeout(10000);
    it('桃奈ちゃんのURLをインプットするとURLが返却される', async function () {
        var actual = (await fetch_ameba.fetch(MOMONA_URL)).url;
        var regex = /^https:\/\/ameblo.jp\/angerme-ss-shin\/entry-.*$/;
        assert.equal(regex.test(actual), true);
    });
    it('桃奈ちゃんのURLをインプットするとTIMEが返却される', async function () {
        var actual = (await fetch_ameba.fetch(MOMONA_URL)).time;
        var regex = /^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d$/;
        assert.equal(regex.test(actual), true);
    });
    it('卒業メンバーのむろのURLを指定すると、URLが取得できる', async function () {
        var actual = (await fetch_ameba.fetch(MUROTA_URL)).url;
        var expected = 'https://ameblo.jp/angerme-ss-shin/entry-12584111667.html?frm=theme';
        assert.equal(actual, expected);
    });
    it('卒業メンバーのむろのURLを指定すると、タイトルが取得できる', async function () {
        var actual = (await fetch_ameba.fetch(MUROTA_URL)).title;
        var expected = 'ありがとうございました！ 室田瑞希';
        assert.equal(actual, expected);
    });
    it('卒業メンバーのむろのurlを指定すると、時刻が取得できる', async function () {
        var actual = (await fetch_ameba.fetch(MUROTA_URL)).time;
        var regex = /^2020-03-22 \d\d:50:53$/;
        assert.equal(regex.test(actual), true);
    });
});