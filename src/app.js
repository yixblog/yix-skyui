/**
 * Created by yixian on 13-12-17.
 */

var requestParams = getURLRequestParams();
console.log("requested param:");
console.log(requestParams);
var appSettings = {};
//get script basepath
(function (scriptFileName) {
    $("script").each(function () {
        var src = $(this).attr("src");
        src = src.split("?")[0];
        var fileName = src.substring(src.lastIndexOf('/') + 1);
        if (fileName == scriptFileName) {
            appSettings.basepath = src.substring(0, src.lastIndexOf("/") + 1);
            return false;
        }
        return true;
    })
})('app.js');

var app = angular.module('app', []);
//IE7 Support
app.config(function ($sceProvider) {
    $sceProvider.enabled(false);
});

(function (requestParams, application) {
    var appConfigName = requestParams.appname;
    if (appConfigName == null || appContext[appConfigName] == null) {
        alert("非法请求");
        return
    }
    var appConfig = appContext[appConfigName];
    var controllerFile = appSettings.basepath + "controller/" + appConfig.controller + ".js";
    var htmlTemplateFile = appSettings.basepath + "htmlTemplate/" + appConfig.templateUrl;
    $("<script></script>", {src: controllerFile, type: "text/javascript"}).appendTo("head");
    application.directive("myTemplate", function () {
        console.log('appending template');
        return{
            restrict: "E",
            templateUrl: htmlTemplateFile,
            link:function(scope,element){
                console.log(scope);
                delete requestParams.appname;
                scope.params = requestParams;
            }
        }
    })
})(requestParams, app);


//util filters
//util directives
//datepicker attribute
app.directive('datepicker', function () {
    return{
        restrict: 'A',//Attribute Only
        link: function (scope, element) {
            $(function () {
                element.attr('readonly', 'readonly');
                element.datepicker({
                    dateFormat: 'yy-mm-dd'
                });
            })
        }
    }
});

//tab

//utils
function getURLRequestParams() {
    var paramsString = location.search.substr(1);
    var params = {};
    var paramEqStrings = paramsString.split('&');
    for (var index = 0, len = paramEqStrings.length; index < len; index++) {
        var paramStr = paramEqStrings[index];
        var eqIndex = paramStr.indexOf('=');
        var key = paramStr.substring(0, eqIndex);
        params[key] = utf8Decode(paramStr.substring(eqIndex + 1));
    }
    return params;
}

function utf8Decode(utftext) {
    utftext = unescape(utftext);
    var string = "";
    var i = 0;
    var c1,c2,c3;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    console.log("url decode result:"+string);
    return string;
}