// ==UserScript==
// @name         Elder Driver Helper
// @namespace    http://edh.undsf.com/
// @version      0.2.0
// @description  源于乘客，服务乘客
// @author       Arathi of Nebnizilla
// @match        https://www.javbus.com/*
// @match        https://www.busjav.us/*
// @match        https://www.dmmbus.us/*
// @match        https://www.seedmm.us/*
// @match        https://www.seedmm.co/*
// @match        https://www.dmmbus.in/*
// @grant        GM_log
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

// 获取jQuery
var $ = jQuery;
var actressDict = undefined;

GM_log("Elder Driver Helper v" + GM_info.script.version);
// GM_log("jQuery版本为：" + $.fn.jquery);

function getConfig(key, defaultValue) {
    let value = GM_getValue(key, defaultValue);
    return value;
}

function setConfig(key, value) {
    GM_setValue(key, value);
}

function initMasterBoard() {
    let masterBoard = {"actresses":[{"name":"\u6A4B\u672C\u3042\u308A\u306A","name_cn":"\u6865\u672C\u6709\u83DC","score":"10"},{"name":"\u660E\u65E5\u82B1\u30AD\u30E9\u30E9","name_cn":"\u660E\u65E5\u82B1\u7EEE\u7F57\u7F57","score":"10"},{"name":"\u5929\u4F7F\u3082\u3048","name_cn":"\u5929\u4F7F\u840C","score":"9.5"},{"name":"\u4E5D\u91CD\u304B\u3093\u306A","name_cn":"\u4E5D\u91CD\u73AF\u5948","score":"9.5"},{"name":"\u9AD8\u6A4B\u3057\u3087\u3046\u5B50","name_cn":"\u9AD8\u6865\u5723\u5B50","score":"9"},{"name":"\u6CB3\u5317\u5F69\u82B1","name_cn":"\u6CB3\u5317\u5F69\u82B1","score":"9"},{"name":"\u91CC\u7F8E\u3086\u308A\u3042","name_cn":"\u91CC\u7F8E\u5C24\u5229\u5A05","score":"9"},{"name":"\u8475","name_cn":"\u8475","score":"8.5"},{"name":"\u9234\u6751\u3042\u3044\u308A","name_cn":"\u94C3\u6751\u7231\u91CC","score":"8.5"},{"name":"\u6843\u4E43\u6728\u304B\u306A","name_cn":"\u6843\u4E43\u6728\u9999\u5948","score":"8.5"},{"name":"\u5712\u7530\u307F\u304A\u3093","name_cn":"\u56ED\u7530\u7F8E\u6A31","score":"8.5"},{"name":"\u685C\u7A7A\u3082\u3082","name_cn":"\u6A31\u7A7A\u6843","score":"8.5"},{"name":"\u5742\u9053\u307F\u308B","name_cn":"\u5742\u9053\u7F8E\u7409","score":"8.5"},{"name":"\u6DF1\u7530\u3048\u3044\u307F","name_cn":"\u6DF1\u7530\u548F\u7F8E","score":"8"},{"name":"\u76F8\u6CA2\u307F\u306A\u307F","name_cn":"\u76F8\u6CFD\u5357","score":"8"},{"name":"\u8475\u3064\u304B\u3055","name_cn":"\u8475\u53F8","score":"8"},{"name":"\u6953\u30AB\u30EC\u30F3","name_cn":"\u67AB\u53EF\u601C","score":"8"},{"name":"\u660E\u91CC\u3064\u3080\u304E","name_cn":"\u660E\u91CC\u7D2C","score":"8"},{"name":"\u661F\u5BAE\u4E00\u82B1","name_cn":"\u661F\u5BAE\u4E00\u82B1","score":"8"},{"name":"\u3042\u3084\u307F\u65EC\u679C","name_cn":"\u5F69\u7F8E\u65EC\u679C","score":"7.5"},{"name":"\u5CAC\u306A\u306A\u307F","name_cn":"\u5CAC\u5948\u5948\u7F8E","score":"7.5"},{"name":"\u4E09\u4E0A\u60A0\u4E9C","name_cn":"\u4E09\u4E0A\u60A0\u4E9A","score":"7.5"},{"name":"\u5E0C\u5D0E\u30B8\u30A7\u30B7\u30AB","name_cn":"\u5E0C\u5D0E\u6770\u897F\u5361","score":"7.5"},{"name":"\u5E0C\u5CF6\u3042\u3044\u308A","name_cn":"\u5E0C\u5C9B\u7231\u7406","score":"7.5"},{"name":"\u672C\u5E84\u9234","name_cn":"\u672C\u5E84\u94C3","score":"7.5"},{"name":"\u541B\u5CF6\u307F\u304A","name_cn":"\u541B\u5C9B\u7F8E\u7EEA","score":"7.5"},{"name":"\u6C34\u535C\u3055\u304F\u3089","name_cn":"\u6C34\u535C\u6A31","score":"7.5"},{"name":"AIKA","name_cn":"Aika","score":"7.5"},{"name":"\u53E4\u5DDD\u3044\u304A\u308A","name_cn":"\u53E4\u5DDD\u4F0A\u7EC7","score":"7.5"},{"name":"\u7F8E\u7AF9\u3059\u305A","name_cn":"\u7F8E\u7AF9\u94C3","score":"7.5"},{"name":"\u4F0A\u85E4\u821E\u96EA","name_cn":"\u4F0A\u85E4\u821E\u96EA","score":"7.5"},{"name":"\u6CB3\u5408\u3042\u3059\u306A","name_cn":"\u6CB3\u5408\u660E\u65E5\u83DC","score":"7.5"},{"name":"\u65E5\u83DC\u3005\u306F\u306E\u3093","name_cn":"\u65E5\u83DC\u83DC\u5F69\u97F3","score":"7.5"},{"name":"\u685C\u7FBD\u306E\u3069\u304B","name_cn":"\u6A31\u7FBD\u548C\u4F73","score":"7"},{"name":"\u677E\u6C38\u3055\u306A","name_cn":"\u677E\u6C38\u7EB1\u5948","score":"7"},{"name":"\u6709\u5742\u6DF1\u96EA","name_cn":"\u6709\u5742\u6DF1\u96EA","score":"7"},{"name":"\u5CA1\u672C\u771F\u6182","name_cn":"\u5188\u672C\u771F\u5FE7","score":"7"},{"name":"\u5C71\u5CB8\u9022\u82B1","name_cn":"\u5C71\u5CB8\u9022\u82B1","score":"7"},{"name":"\u5C0F\u5C9B\u307F\u306A\u307F","name_cn":"\u5C0F\u5C9B\u5357","score":"7"},{"name":"\u4E03\u6CA2\u307F\u3042","name_cn":"\u4E03\u6CFD\u7F8E\u4E9A","score":"7"},{"name":"\u7D17\u5009\u307E\u306A","name_cn":"\u7D17\u5009\u771F\u83DC","score":"7"},{"name":"\u690E\u540D\u305D\u3089","name_cn":"\u690E\u540D\u7A7A","score":"7"},{"name":"\u521D\u5DDD\u307F\u306A\u307F","name_cn":"\u521D\u5DDD\u5357","score":"7"},{"name":"\u67DA\u6708\u3072\u307E\u308F\u308A","name_cn":"\u67DA\u6708\u5411\u65E5\u8475","score":"7"},{"name":"\u5409\u9AD8\u5BE7\u3005","name_cn":"\u5409\u9AD8\u5B81\u5B81","score":"7"},{"name":"\u91CE\u3005\u6D66\u6696","name_cn":"\u91CE\u91CE\u6D66\u6696","score":"6.5"},{"name":"\u611B\u97F3\u307E\u308A\u3042","name_cn":"\u7231\u97F3\u9EBB\u91CC\u4E9A","score":"6.5"},{"name":"\u5927\u69FB\u3072\u3073\u304D","name_cn":"\u5927\u69FB\u54CD","score":"6.5"},{"name":"\u7F8E\u8C37\u6731\u91CC","name_cn":"\u7F8E\u8C37\u6731\u91CC","score":"6.5"},{"name":"\u6CE2\u591A\u91CE\u7D50\u8863","name_cn":"\u6CE2\u591A\u91CE\u7D50\u8863","score":"6.5"},{"name":"\u67B6\u4E43\u3086\u3089","name_cn":"\u67B6\u4E43\u7531\u7F85","score":"6.5"},{"name":"\u5C0F\u5009\u7531\u83DC","name_cn":"\u5C0F\u4ED3\u7531\u83DC","score":"6.5"},{"name":"\u9EBB\u91CC\u68A8\u590F","name_cn":"\u9EBB\u91CC\u68A8\u590F","score":"6.5"},{"name":"\u661F\u5948\u3042\u3044","name_cn":"\u661F\u5948\u7231","score":"6.5"},{"name":"\u53CB\u7530\u5F69\u4E5F\u9999","name_cn":"\u53CB\u7530\u5F69\u4E5F\u9999","score":"6.5"},{"name":"\u5929\u6D77\u3064\u3070\u3055","name_cn":"\u5929\u6D77\u7FFC","score":"6.5"},{"name":"\u97F3\u3042\u305A\u3055","name_cn":"\u97F3\u6893","score":"6.5"},{"name":"\u65E5\u4E43\u539F\u674F","name_cn":"\u65E5\u4E43\u539F\u674F","score":"6.5"},{"name":"\u3042\u3044\u3060\u98DB\u9CE5","name_cn":"\u7231\u7530\u98DE\u9E1F","score":"6"},{"name":"\u7BE0\u7530\u3086\u3046","name_cn":"\u7BE0\u7530\u4F18","score":"6"},{"name":"\u4F50\u85E4\u30A8\u30EB","name_cn":"\u4F50\u85E4\u827E\u9732","score":"6"},{"name":"\u5BCC\u7530\u512A\u8863%20","name_cn":"\u5BCC\u7530\u512A\u8863%20","score":"6"},{"name":"\u3042\u3079\u307F\u304B\u3053","name_cn":"\u5B89\u90E8\u672A\u534E\u5B50","score":"6"},{"name":"\u963F\u90E8\u4E43\u307F\u304F","name_cn":"\u963F\u90E8\u4E43\u7F8E\u4E45","score":"6"}]};
    masterBoard.actresses.forEach(function(actress, index){
        updateMasterBoard(actress.name, actress);
    });
}

function updateMasterBoard(name, actressInfo) {
    let key = "actress_dict";
    let _actressDict = getConfig(key, {});
    _actressDict[name] = actressInfo;
    setConfig(key, _actressDict);
}

function getBackgroundColor(score) {
    let rank = (score - 6) / (10 - 6);
    let r = (rank > 0.5) ? Math.floor((rank-0.5)/0.5*15) : 0;
    let g = (rank > 0.5) ? 0 : Math.floor(((0.5-rank)/0.5)*15);
    let b = (rank > 0.5) ? Math.floor((1-(rank-0.5)/0.5)*15) : Math.floor((1-(0.5-rank)/0.5)*15);
    return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}

function actressAvatarRender() {
    let url = window.location.href;
    if (url.indexOf("actresses")>=0) {
        $("a.avatar-box").each(function(index, element){
            let info = element.querySelector("div.photo-info");
            let span = element.querySelector("div.photo-info span");

            let name = span.innerText;
            // let buscode = actress.href;
            let actress = actressDict[name];
            if (actress != undefined) {
                let bgcolor = getBackgroundColor(actress.score);
                let displayChineseName = getConfig("display_cn_name", true);
                let name = displayChineseName ? actress.name_cn : actress.name;
                span.innerText = name + "(★" + actress.score + ")";
                element.style.backgroundColor = bgcolor;
                info.style.backgroundColor = bgcolor;
                info.style.color = '#fff';
            }
        });
    }
}

function actressNameRender() {
    $("span.genre[onmouseover]").each(function(index, element){
        let link = element.querySelector('a');
        let name = link.innerText;
        let actress = actressDict[name];
        if (actress != undefined) {
            let displayChineseName = getConfig("display_cn_name", true);
            let name = displayChineseName ? actress.name_cn : actress.name;
            link.innerText = name + "(★" + actress.score + ")";
            link.style.color = getBackgroundColor(actress.score);
        }
    });
}

function injectMenu() {
    let html =
`<ul class="nav navbar-nav navbar-right">
  <li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" role="button" aria-expanded="false">
      <span class="glyphicon glyphicon-wrench" style="font-size:12px;"></span>
      <span class="hidden-md hidden-sm">助手设置</span>
      <span class="caret"></span>
    </a>
    <ul class="dropdown-menu" role="menu">
      <li class="mypointer disabled"><a href="#"><input type="checkbox" id="edhconf-display-score">&nbsp;&nbsp;显示评分</a></li>
      <li class="mypointer"><a href="#"><input type="checkbox" id="edhconf-display-chinese-name">&nbsp;&nbsp;显示中文名</a></li>
      <li class="mypointer disabled"><a href="#"><input type="checkbox" id="edhconf-coloring">&nbsp;&nbsp;名单上色</a></li>
      <li class="mypointer disabled"><a href="#" id="edh-generate-masterboard">生成大师榜</a></li>
    </ul>
  </li>
</ul>`;
    $("div#navbar").append(html);

    let displayScore = getConfig("display_score", true);
    let displayChineseName = getConfig("display_cn_name", true);
    let coloring = getConfig("coloring", true);

    $("input#edhconf-display-score").prop('checked', displayScore);
    $("input#edhconf-display-chinese-name").prop('checked', displayChineseName);
    $("input#edhconf-coloring").prop('checked', coloring);

    $("input#edhconf-display-score").change(function(){
        let displayScore = $("input#edhconf-display-score").prop('checked');
        setConfig("display_score", displayScore);
    });

    $("input#edhconf-display-chinese-name").change(function(){
        let displayChineseName = $("input#edhconf-display-chinese-name").prop('checked');
        setConfig("display_cn_name", displayChineseName);
    });

    $("input#edhconf-coloring").change(function(){
        let coloring = $("input#edhconf-coloring").prop('checked');
        setConfig("coloring", coloring);
    });
}

(function() {
    'use strict';
    // 隐藏不堪入目的小广告
    $('.ad-table').hide();

    // 加载大师榜
    // let masterBoard =
    // masterBoard.actresses.forEach(function(actress, index) {
    //     actressDict[actress.name] = actress;
    // });
    actressDict = getConfig("actress_dict", {});
    if (Object.keys(actressDict).length == 0) {
        initMasterBoard();
        actressDict = getConfig("actress_dict", {});
    }

    injectMenu();

    // 头像处理
    actressAvatarRender();

    // 演员名字处理
    actressNameRender();
})();