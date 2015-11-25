usrsys = require \./db-usrsystem
uuid = require \node-uuid
input-ad =
  * _id: uuid.v4!
    topic: "新光三越周年慶"
    content: "新光三越周年慶，全館百貨八折起"
    tag: ["department store" "新光三越" "discount"]
    discard-user:[]
    keep-user:[]
    imag:"D"
  * _id: uuid.v4!
    topic: "星巴克-咖啡好友分享日"
    content: "2015/11/9(一),11/11(三),11/16(一),11/18(三)11:00~20:00至全台星巴克門市，購買兩杯容量/冰熱/口味皆一致的飲料，其中一杯由星巴克招待"
    tag: [\starbucks \coffee \drink \星巴克 "buy one get one free"]
    discard-user:[]
    keep-user:[]
    imag:"A"
  * _id: uuid.v4!
    topic: "85度C"
    content: "10/1~12/31悠遊卡付款 中大杯咖啡第二杯七折"
    tag: [\coffee \discount \85度C \drink ]
    discard-user:[]
    keep-user:[]
    imag:"B"
  * _id: uuid.v4!
    topic: "蘑菇現實輕鬆買"
    content: "9.15~10.18 快來尋寶--日常好物、讀冊良伴、衣著良品都找的到，東西可人，價錢可愛，咻咻咻來蘑菇挖寶就行了!"
    tag: [\clothe \necessary \蘑菇]
    discard-user:[]
    keep-user:[]
    imag:"C"
  * _id: uuid.v4!
    topic: "7-11"
    content: "11/11~11/24霜淇淋、聖代全品項任選第二件7折"
    tag: ["7-11" "ice cream" "霜淇淋" \discount \seven]
    discard-user:[]
    keep-user:[]
    imag:"E"
  * _id: uuid.v4!
    topic: "必勝客披薩"
    content: "歡樂吧平日優惠券--出示再享9折"
    tag: [\pizza \coupon \必勝客]
    discard-user:[]
    keep-user:[]
    imag:"F"
  * _id: uuid.v4!
    topic: "21世紀"
    content: "11月壽星出示證件可購買生日套餐"
    tag:[\birthday "21世紀"]
    discard-user:[]
    keep-user:[]
    imag:"G"
  * _id: uuid.v4!
    topic: "『OK即時快訊』－本周鋒面報到！"
    content: "天氣逐漸溜滑梯 早上出門真的需要大勇氣 來杯暖呼呼的咖啡 在寒冬中是溫暖甜蜜的小確幸ξ( ✿＞◡❛)✿11/23-11/25 中杯美式第2杯5元"
    tag:["OK" "咖啡" "coffee" "drink" "飲料"]
    discard-user:[]
    keep-user:[]
    imag:"I"
  * _id: uuid.v4!
    topic: "伯朗分享日"
    content: "今11/23飲品買一送一 不限品項規格立馬揪好友一起喝杯咖啡吧！最最重要的是－伯朗分享日11/30再加碼一天～這麼超值的優惠，快分享給好友們知道！"
    tag:["buy one get one free" "coffee" "咖啡" "伯朗" "飲料" "買一送一"]
    discard-user:[]
    keep-user:[]
    imag:"J"
  * _id: uuid.v4!
    topic: "大苑子"
    content: "好康優惠報你知((o(^_^)o))即日起至01/21(四)前至全台7-11 中國信託ATM交易就可以列印【紫米紅豆(小杯)第二件半價】酷碰券唷!"
    tag:[ "大苑子" "中國信託" "第二件半價"]
    discard-user:[]
    keep-user:[]
    imag:"K"
  * _id: uuid.v4!
    topic: "7-11"
    content: "【美樂蒂與雙星仙子40周年展 限時87折up】最萌的美樂蒂與雙星仙子歡慶40周年，限定聯名款甜蜜親親系列新上市，快來ibon mart挑選吧！"
    tag:["duscount" "7-11" "美樂蒂" "雙星仙子"]
    discard-user:[]
    keep-user:[]
    imag:"L"
  * _id: uuid.v4!
    topic: "MisterDonut"
    content: "Mister Donut報好康~歡慶耶誕 百分好禮 耶誕5Q  兩盒只要100元唷!"
    tag:["MisterDount" "耶誕"]
    discard-user:[]
    keep-user:[]
    imag:"M"
  * _id: uuid.v4!
    topic: "摩斯漢堡"
    content: "從明天開始，暖暖的西京燒比目魚珍珠堡，搭配料多好喝的豚汁蔬菜湯，只要百元喔！"
    tag:["摩斯漢堡" "米漢堡"]
    discard-user:[]
    keep-user:[]
    imag:"O"
  * _id: uuid.v4!
    topic: "酷聖石冰淇淋"
    content: "酷聖石冰淇淋，限時優惠經典冰淇淋買大送小！"
    tag:["酷聖石" "coldstone" "買大送小" "ice scream" "冰淇淋"]
    keep-user:[]
    imag:"P"
    
for i of input-ad
  usrsys.post-ad input-ad[i], (r)->
    console.log r
#vi:tw:2
