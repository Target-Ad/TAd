var usrsys, uuid, inputAd, i;
usrsys = require('./db-usrsystem');
uuid = require('node-uuid');
inputAd = [
  {
    _id: uuid.v4(),
    topic: "新光三越周年慶",
    content: "新光三越周年慶，全館百貨八折起",
    tag: ["department store", "新光三越", "discount"],
    discardUser: [],
    keepUaer: []
  }, {
    _id: uuid.v4(),
    topic: "星巴克-咖啡好友分享日",
    content: "2015/11/9(一),11/11(三),11/16(一),11/18(三)11:00~20:00至全台星巴克門市，購買兩杯容量/冰熱/口味皆一致的飲料，其中一杯由星巴克招待",
    tag: ['starbucks', 'coffee', 'drink', '星巴克', "buy one get one free"],
    discardUser: [],
    keepUaer: []
  }, {
    _id: uuid.v4(),
    topic: "85度C",
    content: "10/1~12/31悠遊卡付款 中大杯咖啡第二杯七折",
    tag: ['coffee', 'discount', '85度C', 'drink'],
    discardUser: [],
    keepUaer: []
  }, {
    _id: uuid.v4(),
    topic: "蘑菇現實輕鬆買",
    content: "9.15~10.18 快來尋寶--日常好物、讀冊良伴、衣著良品都找的到，東西可人，價錢可愛，咻咻咻來蘑菇挖寶就行了!",
    tag: ['clothe', 'necessary', '蘑菇'],
    discardUser: [],
    keepUaer: []
  }, {
    _id: uuid.v4(),
    topic: "7-11",
    content: "11/11~11/24霜淇淋、聖代全品項任選第二件7折",
    tag: ["7-11", "ice cream", "霜淇淋", 'discount', 'seven'],
    discardUser: [],
    keepUaer: []
  }, {
    _id: uuid.v4(),
    topic: "必勝客披薩",
    content: "歡樂吧平日優惠券--出示再享9折",
    tag: ['pizza', 'coupon', '必勝客'],
    discardUser: [],
    keepUaer: []
  }, {
    _id: uuid.v4(),
    topic: "21世紀",
    content: "11月壽星出示證件可購買生日套餐",
    tag: ['birthday', "21世紀"],
    discardUser: [],
    keepUaer: []
  }
];
for (i in inputAd) {
  usrsys.postAd(inputAd[i], fn$);
}
function fn$(r){
  return console.log(r);
}