var linebot = require('linebot');
var express = require('express');
var getJSON = require('get-json');

var bot = linebot({
  channelId: '1502480862',
  channelSecret: '6179ea5766ea4f906587db3923ead214',
  channelAccessToken: 'iwBpT4wLnfkXBerOft2sVzfnqbdrILLxiCh9FuqJ0bmQUIBwcPmcap3Q54tsjaq94glksU4HwjbxbG/N4ZO7c6nNFlM6WiGqYQFTWbt6V8gw8HfBC3ak9K5ZZanHm+ankqVvTmbJdzavo8Ta/352rQdB04t89/1O/w1cDnyilFU='
});

var timer;

sorryStickerList = [3,8,9,16,17,104,111]
hiStickerList = [119,120,132,409,410]
searchState = true;
var pm = [];
var res_med = [
      	{
      "medicine": "普拿疼",
      "description":"適應症為退燒、止痛(包含頭痛、喉嚨痛等)，但不能消炎(Aspirin、NSAID才能)。",
      "ingredients":"Acetaminophen",
      	"JP": [{"name":"EVE quick DX","img":"https://i.imgur.com/cPjrQka.png","price":"¥1,400/40丸","intro":"http://www.ssp.co.jp/eve/products/eveqdx/"},{"name":"EVE quick","img":"https://i.imgur.com/gEHooru.png","price":"¥1,000/40丸","intro":"http://www.ssp.co.jp/eve/products/eveq/"},{"name":"EVE A","img":"https://i.imgur.com/gBDDt3D.png","price":"¥710/60丸","intro":"http://www.ssp.co.jp/eve/products/evea/"}],
      	"TH": [{"name":"TIFFY dey","img":"https://i.imgur.com/b4BhV36.png","price":"฿663","intro":"https://www.amazon.com/Tiffy-Dey-Sachets-Tablets-Each/dp/B004QETJA8"}],
      	"KR": [{"name":"해열제","img":"https://i.imgur.com/qEYw28G.png","price":"₩3,500","intro":"http://inuri.soaworld.com/653"}]
      	},
      	{
      "medicine": "若元錠",
      "description":"幫助胃腸的消化作用，維持身體的均衡營養。消化、整腸、營養三效合一，發揮完整的胃腸道保健效果，維持身體的健康。",
      "ingredients":"Powder of cultured Aspergillus oryzae NK , Cultured lactobacilli powder , Dried Yeast",
      	"JP": [{"name":"大正漢方胃腸藥","img":"https://i.imgur.com/2gQfi25.png","price":"¥1,510/48包","intro":"https://www.xiji.com/product-11670.html"},{"name":"Ebios","img":"https://i.imgur.com/GZTR6VH.png","price":"¥1,698/2,000丸","intro":"https://www.asahi-fh.com/ebios/"},{"name":"三共胃腸藥","img":"https://i.imgur.com/FG1IDci.png","price":"¥1,698/24包","intro":"https://www.daiichisankyo-hc.co.jp/products/details/ds_ichoyaku_blue_gran/"}],
      	"TH": [{"name":"五塔散","img":"https://i.imgur.com/El7Dsq1.png","price":"฿28","intro":"http://baike.baidu.com/item/%E6%B3%B0%E5%9B%BD%E4%BA%94%E5%A1%94%E6%A0%87%E8%A1%8C%E5%86%9B%E6%95%A3"}],
      	"KR": [{"name":"겔포스엠현탁액","img":"https://i.imgur.com/G9qatEP.png","price":"₩3,500","intro":"http://www.kmle.co.kr/viewDrug.php?m=%B6%F3%BD%C4&inx=6098&c=22872122c6be252e15c87a7da83312a5"},{"name":"훼스탈플러스정","img":"https://i.imgur.com/aoe1EPD.png","price":"₩2,500","intro":"http://www.kmle.co.kr/viewDrug.php?inx=5031&c=9750f0d8e0e5365485fdca09be800ced"},{"name":"베아제정","img":"https://i.imgur.com/2uDMRMb.png","price":"₩2,000","intro":"http://www.kmle.co.kr/viewDrug.php?m=%B6%F3%BD%C4&inx=3344&c=3f7df51fd92a282d6080ad4fe333eb1a"}]
      	},
      	{
      "medicine": "曼秀雷敦",
      "description":"有溫和的止癢、止痛效果，常用於輕微燙傷。但是，因為薄荷和樟腦較刺激，容易產生過敏反應。",
      "ingredients":"Camphor、Menthol",
      	"JP": [{"name":"メンソレータム軟膏c","img":"https://i.imgur.com/MpAEOWu.png","price":"¥380/¥680/¥900","intro":"https://jp.rohto.com/mentholatum/ointment/"},{"name":"液体ムヒS2a","img":"https://i.imgur.com/hu1fW48.png","price":"¥842","intro":"http://www.info.pmda.go.jp/ogo/J0801000168_03_01"},{"name":"新ウナコーワクール","img":"https://i.imgur.com/nTxVBD9.png","price":"¥450/¥700","intro":"http://hc.kowa.co.jp/otc/9905"},{"name":"BETNEVATEＮ軟膏（ベトネベートＮ軟膏）","img":"https://i.imgur.com/xe6XnWz.png","price":"¥1,134/5g","intro":"https://www.daiichisankyo-hc.co.jp/products/details/betnevate_n/"},{"name":"ENKURON UF軟膏（エンクロンＵＦクリーム ）","img":"https://i.imgur.com/uWR17a2.png","price":"¥1,815/12g","intro":"http://medical.shiseido.co.jp/enkuron/cream-ufex.html"}],
      	"KR": [{"name":"후시딘연고","img":"https://i.imgur.com/prGz8bp.png","price":"₩7,500","intro":"http://blog.daum.net/drugblog/39"}]
      	},
      	{
      "medicine": "正露丸",
      "description":"緩解食慾不振、腹痛腹瀉、消化不良、噁心嘔吐。水土不服、減少消化道蠕動。消除蛀牙造成的牙髓炎的疼痛（用法：含於蛀牙位置，以其藥效將直接令牙髓壞死，但不能根治蛀牙）",
      "ingredients":"wood-tar creosote , gambir leaves and young sprig powder , Amur corktree bark powder , Chinese liquorice root powder , chenpi powder",
      	"JP": [{"name":"大幸藥品-正露丸","img":"https://i.imgur.com/sYh9ZOH.png","price":"¥800/50丸","intro":"https://www.seirogan.co.jp/products/seirogan/"},{"name":"和泉薬品-正露丸","img":"https://i.imgur.com/pzjECgY.png","price":"¥410/30丸","intro":"https://www.kenko.com/product/item/itm_6934572572.html"},{"name":"松本製薬-正露丸","img":"https://i.imgur.com/wsXnfNW.png","price":"¥2,730/500丸","intro":"http://www.kegg.jp/medicus-bin/japic_otc?japic_code=J0601003022"}],
      	"KR": [{"name":"동성정로환당의정","img":"https://i.imgur.com/mSoMF41.png","price":"₩3,000","intro":"http://www.kmle.co.kr/viewDrug.php?m=%B6%F3%BD%C4&inx=4641&c=e1f321a3bb511f3a25587df4ce020532"}]
      	},
      	{
      "medicine": "斯斯",
      "description":"緩解感冒之各種症狀(咽喉痛、發燒、頭痛、關節痛、肌肉痛、流鼻水、鼻塞、打噴嚏、咳嗽)",
      "ingredients":"Acetaminophen、Ethenzamide、Codeine Phosphate",
      	"JP": [{"name":"新ルル-A錠","img":"https://i.imgur.com/l2lFVC3.png","price":"¥1,680/150丸","intro":"https://www.daiichisankyo-hc.co.jp/products/details/lulu_a_tab_s/"},{"name":"パブロンゴールドＡ微粒","img":"https://i.imgur.com/YXIJefg.png","price":"¥1,700/28包","intro":"https://www.catalog-taisho.com/04525.php"},{"name":"ルルアタックEX","img":"https://i.imgur.com/e5lGh5a.png","price":"¥1,296/12丸","intro":"https://www.daiichisankyo-hc.co.jp/products/details/lulu_attack_ex/"}],
      	"KR": [{"name":"래피콜","img":"https://i.imgur.com/b9ymmDR.png","price":"₩3,000","intro":"http://www.kmle.co.kr/viewDrug.php?inx=54267&c=0870189a8fc139034c7b16f774560dd4"},{"name":"파워콜에스","img":"https://i.imgur.com/KF2uxa9.png","price":"₩17,620","intro":"http://www.monews.co.kr/news/articleView.html?idxno=37999"},{"name":"판콜에스캡슐","img":"https://i.imgur.com/GZA5qDU.png","price":"₩2,000","intro":"http://www.kmle.co.kr/viewDrug.php?m=%B6%F3%BD%C4&inx=32756&c=e05d6020630c65d81ba4e177e379dfe9"}]
      	},
      	{
      "medicine": "肌樂",
      "description":"用於肌肉痠痛，可緩解痠痛",
      "ingredients":"wood-tar creosote , gambir leaves and young sprig powder , Amur corktree bark powder , Chinese liquorice root powder , chenpi powder",
      	"JP": [{"name":"アンメルシン1%ヨコヨコ","img":"https://i.imgur.com/tiFUnWC.png","price":"¥1,300/¥1,800","intro":"http://www.kobayashi.co.jp/seihin/ans_y/index.html"},{"name":"アンメルツヨコヨコ","img":"https://i.imgur.com/BAmek8P.png","price":"¥670","intro":"http://www.kobayashi.co.jp/seihin/nan_y/"},{"name":"ニューアンメルツヨコヨコA","img":"https://i.imgur.com/30iK7vk.png","price":"¥500/¥750","intro":"http://www.kobayashi.co.jp/seihin/nan_y/index.html"}],
      	"TH": [{"name":"Counterpain","img":"https://i.imgur.com/RGtY9Xe.png","price":"฿138","intro":"https://www.alibaba.com/product-detail/Pain-Relief-Cream-COUNTERPAIN-Cream-120g_50027086756.html"},{"name":"Counterpain cool","img":"https://i.imgur.com/0yxVeqp.png","price":"฿72","intro":"https://www.alibaba.com/product-detail/Counterpain_50009214843.html"},{"name":"Counterpain plus","img":"https://i.imgur.com/TLyS3yT.png","price":"฿315","intro":"https://www.alibaba.com/product-detail/Special-price-Counterpain-Plus-pain-relief_144950406.html"}]
      	},
      	{
      "medicine": "舒立效",
      "description":"直接對喉嚨做殺菌的效果，喉糖裡面還有藥性，有效紓解喉嚨痛",
      "ingredients":"wood-tar creosote、gambir leaves and young sprig powder、Amur corktree bark powder、Chinese liquorice root powder、chenpi powder",
      	"JP": [{"name":"龍角散喉糖(のどすっきり飴)","img":"https://i.imgur.com/g9HHf6d.png","price":"¥180/100g","intro":"https://www.ryukakusan.co.jp/productdetail/detail/9/17"},{"name":"龍角散DIRECT(龍角散ダイレクト)","img":"https://i.imgur.com/0EUtuxK.png","price":"¥550/16包","intro":"https://www.ryukakusan.co.jp/promotion3/jp"},{"name":"VICKS喉糖(ヴィックス)","img":"https://i.imgur.com/0UgdvJF.png","price":"¥290/20丸","intro":"https://www.catalog-taisho.com/05574.php"}],
      	"TH": [{"name":"Strepsils","img":"https://i.imgur.com/LLrQehb.png","price":"฿35","intro":"http://www.strepsilsth.com/product3.html"},{"name":"ยาตะขาบ","img":"https://i.imgur.com/OL07sq5.png","price":"฿850/5เข้า","intro":"http://www.takabb.com/index.php/cn/"}]
      	}
      ];

var res_sym = [
                {
              "symptom": "頭痛",
                "JP": [{"name":"EVE quick DX","img":"https://i.imgur.com/cPjrQka.png","price":"¥1,400/40丸","intro":"http://www.ssp.co.jp/eve/products/eveqdx/"},{"name":"EVE quick","img":"https://i.imgur.com/gEHooru.png","price":"¥1,000/40丸","intro":"http://www.ssp.co.jp/eve/products/eveq/"},{"name":"EVE A","img":"https://i.imgur.com/gBDDt3D.png","price":"¥710/60丸","intro":"http://www.ssp.co.jp/eve/products/evea/"},{"name":"新ルル-A錠","img":"https://i.imgur.com/l2lFVC3.png","price":"¥1,680/150丸","intro":"https://www.daiichisankyo-hc.co.jp/products/details/lulu_a_tab_s/"}],
                "TH": [{"name":"TIFFY dey","img":"https://i.imgur.com/b4BhV36.png","price":"฿663","intro":"https://www.amazon.com/Tiffy-Dey-Sachets-Tablets-Each/dp/B004QETJA8"}],
                "KR": [{"name":"해열제","img":"https://i.imgur.com/qEYw28G.png","price":"₩3,500","intro":"http://inuri.soaworld.com/653"},{"name":"래피콜","img":"https://i.imgur.com/b9ymmDR.png","price":"₩3,000","intro":"http://www.kmle.co.kr/viewDrug.php?inx=54267&c=0870189a8fc139034c7b16f774560dd4"},{"name":"파워콜에스","img":"https://i.imgur.com/KF2uxa9.png","price":"₩17,620","intro":"http://www.monews.co.kr/news/articleView.html?idxno=37999"},{"name":"판콜에스캡슐","img":"https://i.imgur.com/GZA5qDU.png","price":"₩2,000","intro":"http://www.kmle.co.kr/viewDrug.php?m=%B6%F3%BD%C4&inx=32756&c=e05d6020630c65d81ba4e177e379dfe9"}]
                },
                {
              "symptom": "喉嚨痛",
                "JP": [{"name":"龍角散喉糖(のどすっきり飴)","img":"https://i.imgur.com/g9HHf6d.png","price":"¥180/100g","intro":"https://www.ryukakusan.co.jp/productdetail/detail/9/17"},{"name":"龍角散DIRECT(龍角散ダイレクト)","img":"https://i.imgur.com/0EUtuxK.png","price":"¥550/16包","intro":"https://www.ryukakusan.co.jp/promotion3/jp"},{"name":"VICKS喉糖(ヴィックス)","img":"https://i.imgur.com/0UgdvJF.png","price":"¥290/20丸","intro":"https://www.catalog-taisho.com/05574.php"},{"name":"EVE quick DX","img":"https://i.imgur.com/cPjrQka.png","price":"¥1,400/40丸","intro":"http://www.ssp.co.jp/eve/products/eveqdx/"},{"name":"EVE quick","img":"https://i.imgur.com/gEHooru.png","price":"¥1,000/40丸","intro":"http://www.ssp.co.jp/eve/products/eveq/"}],
                "TH": [{"name":"Strepsils","img":"https://i.imgur.com/LLrQehb.png","price":"฿35","intro":"http://www.strepsilsth.com/product3.html"},{"name":"ยาตะขาบ","img":"https://i.imgur.com/OL07sq5.png","price":"฿850/5เข้า","intro":"http://www.takabb.com/index.php/cn/"},{"name":"TIFFY dey","img":"https://i.imgur.com/b4BhV36.png","price":"฿663","intro":"https://www.amazon.com/Tiffy-Dey-Sachets-Tablets-Each/dp/B004QETJA8"}],
                "KR": [{"name":"해열제","img":"https://i.imgur.com/qEYw28G.png","price":"₩3,500","intro":"http://inuri.soaworld.com/653"}]
                },
                {
              "symptom": "感冒",
                "JP": [{"name":"新ルル-A錠","img":"https://i.imgur.com/l2lFVC3.png","price":"¥1,680/150丸","intro":"https://www.daiichisankyo-hc.co.jp/products/details/lulu_a_tab_s/"},{"name":"パブロンゴールドＡ微粒","img":"https://i.imgur.com/YXIJefg.png","price":"¥1,700/28包","intro":"https://www.catalog-taisho.com/04525.php"},{"name":"ルルアタックEX","img":"https://i.imgur.com/e5lGh5a.png","price":"¥1,296/12丸","intro":"https://www.daiichisankyo-hc.co.jp/products/details/lulu_attack_ex/"}],
                "KR": [{"name":"래피콜","img":"https://i.imgur.com/b9ymmDR.png","price":"₩3,000","intro":"http://www.kmle.co.kr/viewDrug.php?inx=54267&c=0870189a8fc139034c7b16f774560dd4"},{"name":"파워콜에스","img":"https://i.imgur.com/KF2uxa9.png","price":"₩17,620","intro":"http://www.monews.co.kr/news/articleView.html?idxno=37999"},{"name":"판콜에스캡슐","img":"https://i.imgur.com/GZA5qDU.png","price":"₩2,000","intro":"http://www.kmle.co.kr/viewDrug.php?m=%B6%F3%BD%C4&inx=32756&c=e05d6020630c65d81ba4e177e379dfe9"},{"name":"래피콜","img":"https://i.imgur.com/b9ymmDR.png","price":"₩3,000","intro":"http://www.kmle.co.kr/viewDrug.php?inx=54267&c=0870189a8fc139034c7b16f774560dd4"},{"name":"파워콜에스","img":"https://i.imgur.com/KF2uxa9.png","price":"₩17,620","intro":"http://www.monews.co.kr/news/articleView.html?idxno=37999"},{"name":"판콜에스캡슐","img":"https://i.imgur.com/GZA5qDU.png","price":"₩2,000","intro":"http://www.kmle.co.kr/viewDrug.php?m=%B6%F3%BD%C4&inx=32756&c=e05d6020630c65d81ba4e177e379dfe9"}]
                },
                {
              "symptom": "發燒",
                "JP": [{"name":"EVE quick DX","img":"https://i.imgur.com/cPjrQka.png","price":"¥1,400/40丸","intro":"http://www.ssp.co.jp/eve/products/eveqdx/"},{"name":"EVE quick","img":"https://i.imgur.com/gEHooru.png","price":"¥1,000/40丸","intro":"http://www.ssp.co.jp/eve/products/eveq/"},{"name":"EVE A","img":"https://i.imgur.com/gBDDt3D.png","price":"¥710/60丸","intro":"http://www.ssp.co.jp/eve/products/evea/"},{"name":"新ルル-A錠","img":"https://i.imgur.com/l2lFVC3.png","price":"¥1,680/150丸","intro":"https://www.daiichisankyo-hc.co.jp/products/details/lulu_a_tab_s/"},{"name":"ルルアタックEX","img":"https://i.imgur.com/e5lGh5a.png","price":"¥1,296/12丸","intro":"https://www.daiichisankyo-hc.co.jp/products/details/lulu_attack_ex/"}],
                "TH": [{"name":"TIFFY dey","img":"https://i.imgur.com/b4BhV36.png","price":"฿663","intro":"https://www.amazon.com/Tiffy-Dey-Sachets-Tablets-Each/dp/B004QETJA8"}],
                "KR": [{"name":"해열제","img":"https://i.imgur.com/qEYw28G.png","price":"₩3,500","intro":"http://inuri.soaworld.com/653"},{"name":"래피콜","img":"https://i.imgur.com/b9ymmDR.png","price":"₩3,000","intro":"http://www.kmle.co.kr/viewDrug.php?inx=54267&c=0870189a8fc139034c7b16f774560dd4"},{"name":"파워콜에스","img":"https://i.imgur.com/KF2uxa9.png","price":"₩17,620","intro":"http://www.monews.co.kr/news/articleView.html?idxno=37999"},{"name":"판콜에스캡슐","img":"https://i.imgur.com/GZA5qDU.png","price":"₩2,000","intro":"http://www.kmle.co.kr/viewDrug.php?m=%B6%F3%BD%C4&inx=32756&c=e05d6020630c65d81ba4e177e379dfe9"}]
                },
                {
              "symptom": "蚊蟲叮咬",
                "JP": [{"name":"メンソレータム軟膏c","img":"https://i.imgur.com/MpAEOWu.png","price":"¥380/¥680/¥900","intro":"https://jp.rohto.com/mentholatum/ointment/"},{"name":"液体ムヒS2a","img":"https://i.imgur.com/hu1fW48.png","price":"¥842","intro":"http://www.info.pmda.go.jp/ogo/J0801000168_03_01"},{"name":"新ウナコーワクール","img":"https://i.imgur.com/nTxVBD9.png","price":"¥450/¥700","intro":"http://hc.kowa.co.jp/otc/9905"},{"name":"BETNEVATEＮ軟膏（ベトネベートＮ軟膏）","img":"https://i.imgur.com/xe6XnWz.png","price":"¥1,134/5g","intro":"https://www.daiichisankyo-hc.co.jp/products/details/betnevate_n/"},{"name":"ENKURON UF軟膏（エンクロンＵＦクリーム ）","img":"https://i.imgur.com/uWR17a2.png","price":"¥1,815/12g","intro":"http://medical.shiseido.co.jp/enkuron/cream-ufex.html"}],
                "KR": [{"name":"후시딘연고","img":"https://i.imgur.com/prGz8bp.png","price":"₩7,500","intro":"http://blog.daum.net/drugblog/39"}]
                },
                {
              "symptom": "肌肉痠痛",
                "JP": [{"name":"アンメルシン1%ヨコヨコ","img":"https://i.imgur.com/tiFUnWC.png","price":"¥1,300/¥1,800","intro":"http://www.kobayashi.co.jp/seihin/ans_y/index.html"},{"name":"アンメルツヨコヨコ","img":"https://i.imgur.com/BAmek8P.png","price":"¥670","intro":"http://www.kobayashi.co.jp/seihin/nan_y/"},{"name":"ニューアンメルツヨコヨコA","img":"https://i.imgur.com/30iK7vk.png","price":"¥500/¥750","intro":"http://www.kobayashi.co.jp/seihin/nan_y/index.html"}],
                "TH": [{"name":"Counterpain","img":"https://i.imgur.com/RGtY9Xe.png","price":"฿138","intro":"https://www.alibaba.com/product-detail/Pain-Relief-Cream-COUNTERPAIN-Cream-120g_50027086756.html"},{"name":"Counterpain cool","img":"https://i.imgur.com/0yxVeqp.png","price":"฿72","intro":"https://www.alibaba.com/product-detail/Counterpain_50009214843.html"},{"name":"Counterpain plus","img":"https://i.imgur.com/TLyS3yT.png","price":"฿315","intro":"https://www.alibaba.com/product-detail/Special-price-Counterpain-Plus-pain-relief_144950406.html"}]
                },
                {
              "symptom": "腸胃不適",
                "JP": [{"name":"大幸藥品-正露丸","img":"https://i.imgur.com/sYh9ZOH.png","price":"¥800/50丸","intro":"https://www.seirogan.co.jp/products/seirogan/"},{"name":"和泉薬品-正露丸","img":"https://i.imgur.com/pzjECgY.png","price":"¥410/30丸","intro":"https://www.kenko.com/product/item/itm_6934572572.html"},{"name":"大正漢方胃腸藥","img":"https://i.imgur.com/2gQfi25.png","price":"¥1,510/48包","intro":"https://www.xiji.com/product-11670.html"},{"name":"Ebios","img":"https://i.imgur.com/GZTR6VH.png","price":"¥1,698/2,000丸","intro":"https://www.asahi-fh.com/ebios/"},{"name":"三共胃腸藥","img":"https://i.imgur.com/FG1IDci.png","price":"¥1,698/24包","intro":"https://www.daiichisankyo-hc.co.jp/products/details/ds_ichoyaku_blue_gran/"}],
                "TH": [{"name":"五塔散","img":"https://i.imgur.com/El7Dsq1.png","price":"฿28","intro":"http://baike.baidu.com/item/%E6%B3%B0%E5%9B%BD%E4%BA%94%E5%A1%94%E6%A0%87%E8%A1%8C%E5%86%9B%E6%95%A3"}],
                "KR": [{"name":"동성정로환당의정","img":"https://i.imgur.com/mSoMF41.png","price":"₩3,000","intro":"http://www.kmle.co.kr/viewDrug.php?m=%B6%F3%BD%C4&inx=4641&c=e1f321a3bb511f3a25587df4ce020532"},{"name":"겔포스엠현탁액","img":"https://i.imgur.com/G9qatEP.png","price":"₩3,500","intro":"http://www.kmle.co.kr/viewDrug.php?m=%B6%F3%BD%C4&inx=6098&c=22872122c6be252e15c87a7da83312a5"},{"name":"훼스탈플러스정","img":"https://i.imgur.com/aoe1EPD.png","price":"₩2,500","intro":"http://www.kmle.co.kr/viewDrug.php?inx=5031&c=9750f0d8e0e5365485fdca09be800ced"},{"name":"베아제정","img":"https://i.imgur.com/2uDMRMb.png","price":"₩2,000","intro":"http://www.kmle.co.kr/viewDrug.php?m=%B6%F3%BD%C4&inx=3344&c=3f7df51fd92a282d6080ad4fe333eb1a"}]
                }
              ];

_bot();

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});

function sym2med(statement, location) {
  searchState = true
  var med = {}
  for (var i = 0; i < res_sym.length; i++){
    var value = res_sym[i].symptom
    if (value == statement) {
      console.log('in');
      med = res_sym[i]
      searchState = false
      break
    }
  }
  console.log(searchState);
  if (searchState == true) {
    var x = Math.floor((Math.random() * 7)+0)
    replyMessage = [
      { type: 'text', text: '抱歉！目前還沒有收錄能治療「'+statement+'」相關症狀藥品的資料' },
      {
        type: 'sticker',
        packageId: '1',
        stickerId: sorryStickerList[x]
      }
    ]
    return replyMessage;
  }
  var symptom = med.symptom;
  if(location == '日本'){
    var detail = med.JP;
  }else if (location == '泰國') {
    var detail = med.TH;
  }else if (location == '韓國') {
    var detail = med.KR;
  }else{
    var detail = []
  }
  console.log(detail.length);
  if( detail.length == 0){
    var x = Math.floor((Math.random() * 7)+0)
    replyMessage = [
      { type: 'text', text: '抱歉！目前還沒有收錄在'+location+'能治療「'+statement+'」相關症狀藥品的資料' },
      {
        type: 'sticker',
        packageId: '1',
        stickerId: sorryStickerList[x]
      }
    ]
    return replyMessage;
  }
  var columns = []
  for(var info in detail){
    console.log(detail[info]);
    columns.push({
        thumbnailImageUrl: detail[info].img,
        title: detail[info].name,
        text: detail[info].price,
        actions: [{
            type: 'uri',
            label: '查看藥品詳情',
            uri: detail[info].intro
        }]
    });
  }
  var medicineCarousel = {
      type: 'template',
      altText: '治療'+symptom+'藥品的搜尋結果',
      template: {
          type: 'carousel',
          columns: columns
      }
  }
  var replyMessage = [
    { type: 'text', text: '您搜尋的是「'+symptom+'」' },
    { type: 'text', text: '為您找到以下在'+location+'能治療「'+statement+'」相關症狀藥品的資料：' },
    medicineCarousel
  ]
  return replyMessage;
}

function med2med(statement, location) {
  searchState = true
  var med = {}
  for (var i = 0; i < res_med.length; i++){
    var value = res_med[i].medicine
    if (value == statement) {
      console.log('in');
      med = res_med[i]
      searchState = false
      break
    }
  }
  console.log(searchState);
  if (searchState == true) {
    var x = Math.floor((Math.random() * 7)+0)
    replyMessage = [
      { type: 'text', text: '抱歉！目前還沒有與「'+statement+'」具有相似效果或成分藥品的資料' },
      {
        type: 'sticker',
        packageId: '1',
        stickerId: sorryStickerList[x]
      }
    ]
    return replyMessage;
  }
  var medicine = med.medicine;
  var description = med.description;
  var ingredients = med.ingredients;
  if(location == '日本'){
    var detail = med.JP;
  }else if (location == '泰國') {
    var detail = med.TH;
  }else if (location == '韓國') {
    var detail = med.KR;
  }else{
    var detail = []
  }
  console.log(detail.length);
  if( detail.length == 0){
    var x = Math.floor((Math.random() * 7)+0)
    replyMessage = [
      { type: 'text', text: '抱歉！目前在'+location+'沒有與「'+statement+'」具有相似效果或成分藥品的資料' },
      {
        type: 'sticker',
        packageId: '1',
        stickerId: sorryStickerList[x]
      }
    ]
    return replyMessage;
  }
  var columns = []
  for(var info in detail){
    console.log(detail[info]);
    columns.push({
        thumbnailImageUrl: detail[info].img,
        title: detail[info].name,
        text: detail[info].price,
        actions: [{
            type: 'uri',
            label: '查看藥品詳情',
            uri: detail[info].intro
        }]
    });
  }
  var medicineCarousel = {
      type: 'template',
      altText: '相似效果或成分藥品資訊搜尋結果',
      template: {
          type: 'carousel',
          columns: columns
      }
  }
  var replyMessage = [
    { type: 'text', text: '您搜尋的是「'+medicine+'」' },
    { type: 'text', text: '主要成分是'+ingredients+'，'+description},
    { type: 'text', text: '為您找到以下在'+location+'具有相似效果或成分的藥品：' },
    medicineCarousel
  ]
  return replyMessage;
}

function _bot() {
  bot.on('message', function(event) {
    if (event.message.type == 'text') {
      var msg = event.message.text;
      var replyMsg = '';
      //search by location
      if (msg.indexOf('@') != -1) {
        splitMsg = msg.split('@')
        statement = splitMsg[0]
        location = splitMsg[1]
        if (statement.indexOf('*') != -1) {
          statement = statement.split('*')[1]
          replyMsg = sym2med(statement, location);
        }
        else if (statement.indexOf('#') != -1){
          statement = statement.split('#')[1]
          replyMsg = med2med(statement, location);
        }else {
          replyMsg = '你在亂？？';
        }
      }
      // \help
      else if (msg.indexOf('/help') != -1){
        replyMsg = '「舟燈藥 ゾーデンヤウ」提供兩種查詢方式：\n\n→ 您可以使用直接輸入症狀及所在地區，例如 ：\n\n*頭痛@日本\n\n系統會提供您所在地區所販賣的相關藥品\n\n→ 也可以輸入在台灣的常用藥品及所在地區，輸入：\n\n#普拿疼@日本\n\n會提供您成分或效果類似的藥品！打一下指令試看看吧！';
      }
      // hung
      else if (msg.indexOf('妹妹') != -1){
        replyMsg = '醒醒吧！你沒有妹妹！';
      }
      else if (msg.indexOf('你是誰') != -1){
        replyMsg = '我是「舟燈藥 ゾーデンヤウ」';
      }else if (msg.indexOf('你好') != -1){
        var x = Math.floor((Math.random() * 5)+0)
        replyMsg = [
          { type: 'text', text: '你好R～' },
          {
            type: 'sticker',
            packageId: '1',
            stickerId: hiStickerList[x]
          }
        ]
      }else if (msg.indexOf('嗨') != -1){
        var x = Math.floor((Math.random() * 5)+0)
        replyMsg = [
          { type: 'text', text: '哈囉～' },
          {
            type: 'sticker',
            packageId: '1',
            stickerId: hiStickerList[x]
          }
        ]
      }
      //can't read
      if (replyMsg == '') {
        var x = Math.floor((Math.random() * 7)+0)
        replyMsg = [
          { type: 'text', text: '對不起拉QQ' },
          { type: 'text', text: '我不知道'+msg+'是什麼意思' },
          {
            type: 'sticker',
            packageId: '1',
            stickerId: sorryStickerList[x]
          }
        ]
      }
      event.reply(replyMsg).then(function(data) {
        console.log(replyMsg);
      }).catch(function(error) {
        console.log('error');
      });
    }
  });
}
