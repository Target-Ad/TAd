var usrsys, uuid, randomInt, inputAd, i;
usrsys = require('./db-usrsystem');
uuid = require('node-uuid');
randomInt = function(low, high){
  return Math.floor(Math.random() * (high - low) + low);
};
inputAd = [
  {
    _id: uuid.v4(),
    activity: "新光三越周年慶",
    shop: "新光三越",
    place: "新光三越",
    discription: "新光三越周年慶，全館百貨八折起",
    tag: ["department store", "新光三越", "discount"],
    discardUser: [],
    keepUser: [],
    imag: "D",
    period: [{
      start: "2015/12/11 12:00",
      end: "2015/12/18 12:00"
    }],
    rnd: randomInt(0, 500)
  }, {
    _id: uuid.v4(),
    topic: "星巴克-咖啡好友分享日",
    place: "全台每一間星巴克",
    discription: "2015/11/9(一),11/11(三),11/16(一),11/18(三)11:00~20:00至全台星巴克門市，購買兩杯容量/冰熱/口味皆一致的飲料，其中一杯由星巴克招待",
    tag: ['starbucks', 'coffee', 'drink', '星巴克', "buy one get one free"],
    discardUser: [],
    keepUser: [],
    imag: "A",
    period: [{
      start: "2015/12/11 12:00",
      end: "2015/12/18 12:00"
    }],
    rnd: randomInt(0, 500)
  }, {
    _id: uuid.v4(),
    topic: "85度C",
    place: "全台每一間85度C",
    discription: "10/1~12/31悠遊卡付款 中大杯咖啡第二杯七折",
    tag: ['coffee', 'discount', '85度C', 'drink'],
    discardUser: [],
    keepUser: [],
    imag: "B",
    period: [{
      start: "2015/10/01 12:00",
      end: "2015/12/31 12:00"
    }],
    rnd: randomInt(0, 500)
  }, {
    _id: uuid.v4(),
    topic: "蘑菇現實輕鬆買",
    place: "蘑菇連鎖店",
    discription: "9.15~10.18 快來尋寶--日常好物、讀冊良伴、衣著良品都找的到，東西可人，價錢可愛，咻咻咻來蘑菇挖寶就行了!",
    tag: ['clothe', 'necessary', '蘑菇'],
    discardUser: [],
    keepUser: [],
    imag: "C",
    period: [{
      start: "2015/09/15 12:00",
      end: "2015/10/18 12:00"
    }],
    rnd: randomInt(0, 500)
  }, {
    _id: uuid.v4(),
    topic: "7-11",
    place: "全台7-11",
    discription: "11/11~11/24霜淇淋、聖代全品項任選第二件7折",
    tag: ["7-11", "ice cream", "霜淇淋", 'discount', 'seven'],
    discardUser: [],
    keepUser: [],
    imag: "E",
    period: [{
      start: "2015/11/11 12:00",
      end: "2015/11/24 12:00"
    }],
    rnd: randomInt(0, 500)
  }, {
    _id: uuid.v4(),
    topic: "必勝客披薩",
    discription: "歡樂吧平日優惠券--出示再享9折",
    tag: ['pizza', 'coupon', '必勝客'],
    discardUser: [],
    keepUser: [],
    imag: "F",
    period: [{
      start: "2015/12/11 12:00",
      end: "2015/12/18 12:00"
    }],
    rnd: randomInt(0, 500)
  }, {
    _id: uuid.v4(),
    topic: "21世紀",
    discription: "11月壽星出示證件可購買生日套餐",
    tag: ['birthday', "21世紀"],
    discardUser: [],
    keepUser: [],
    imag: "G",
    rnd: randomInt(0, 500)
  }, {
    _id: uuid.v4(),
    topic: "『OK即時快訊』－本周鋒面報到！",
    discription: "天氣逐漸溜滑梯 早上出門真的需要大勇氣 來杯暖呼呼的咖啡 在寒冬中是溫暖甜蜜的小確幸ξ( ✿＞◡❛)✿11/23-11/25 中杯美式第2杯5元",
    tag: ["OK", "咖啡", "coffee", "drink", "飲料"],
    discardUser: [],
    keepUser: [],
    imag: "I",
    rnd: randomInt(0, 500)
  }, {
    _id: uuid.v4(),
    topic: "伯朗分享日",
    discription: "今11/23飲品買一送一 不限品項規格立馬揪好友一起喝杯咖啡吧！最最重要的是－伯朗分享日11/30再加碼一天～這麼超值的優惠，快分享給好友們知道！",
    tag: ["buy one get one free", "coffee", "咖啡", "伯朗", "飲料", "買一送一"],
    discardUser: [],
    keepUser: [],
    imag: "J",
    rnd: randomInt(0, 500)
  }, {
    _id: uuid.v4(),
    topic: "大苑子",
    discription: "好康優惠報你知((o(^_^)o))即日起至01/21(四)前至全台7-11 中國信託ATM交易就可以列印【紫米紅豆(小杯)第二件半價】酷碰券唷!",
    tag: ["大苑子", "中國信託", "第二件半價"],
    discardUser: [],
    keepUser: [],
    imag: "K",
    rnd: randomInt(0, 500)
  }, {
    _id: uuid.v4(),
    topic: "7-11",
    discription: "【美樂蒂與雙星仙子40周年展 限時87折up】最萌的美樂蒂與雙星仙子歡慶40周年，限定聯名款甜蜜親親系列新上市，快來ibon mart挑選吧！",
    tag: ["duscount", "7-11", "美樂蒂", "雙星仙子"],
    discardUser: [],
    keepUser: [],
    imag: "L",
    rnd: randomInt(0, 500)
  }, {
    _id: uuid.v4(),
    topic: "MisterDonut",
    discription: "Mister Donut報好康~歡慶耶誕 百分好禮 耶誕5Q  兩盒只要100元唷!",
    tag: ["MisterDount", "耶誕"],
    discardUser: [],
    keepUser: [],
    imag: "M",
    rnd: randomInt(0, 500)
  }, {
    _id: uuid.v4(),
    topic: "摩斯漢堡",
    discription: "從明天開始，暖暖的西京燒比目魚珍珠堡，搭配料多好喝的豚汁蔬菜湯，只要百元喔！",
    tag: ["摩斯漢堡", "米漢堡"],
    discardUser: [],
    keepUser: [],
    imag: "O",
    rnd: randomInt(0, 500)
  }, {
    _id: uuid.v4(),
    topic: "酷聖石冰淇淋",
    discription: "酷聖石冰淇淋，限時優惠經典冰淇淋買大送小！",
    tag: ["酷聖石", "coldstone", "買大送小", "ice scream", "冰淇淋"],
    keepUser: [],
    imag: "P",
    rnd: randomInt(0, 500)
  }
];
for (i in inputAd) {
  usrsys.postAd(inputAd[i], fn$);
}
function fn$(r){
  return console.log(r);
}