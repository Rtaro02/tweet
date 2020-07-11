var assert = require('assert');
var fs = require('fs');
var fetch_ameba = require('../ameba/save_ameba_images.js');
const url = 'https://ameblo.jp/angerme-ss-shin/entry-12610610350.html?frm=theme';

describe('アメブロ画像保存', function () {
    // テストのタイムアウトを10sec.に設定
    this.timeout(20000);
    var actual;
    it('2020-07-12の莉佳子ちゃんのURLをインプットすると画像は三枚', async function () {
        actual = (await fetch_ameba.save(url));
        assert.equal(actual.length, 3);
    });
    it('2020-07-12の莉佳子ちゃんのURLをインプットすると画像名が返却される', async function () {
        assert.equal(actual[0], 'o0958127814788062073.jpg');
        assert.equal(actual[1], 'o1080144014788062087.jpg');
        assert.equal(actual[2], 'o0958127814788062103.jpg');
    });
});
