/**
 * Created by yixian on 13-12-17.
 */

var requestParams = getURLRequestParams();

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
    var controllerFile = "controller/" + appConfig.controller + ".js";
    var htmlTemplateFile = "htmlTemplate/" + appConfig.templateUrl;
    $("<script></script>", {src: controllerFile, type: "text/javascript"}).appendTo("head");
    application.directive("myTemplate", function () {
        console.log('appending template');
        return{
            restrict: "E",
            templateUrl: htmlTemplateFile
        }
    })
})(requestParams, app);


//utils
function getURLRequestParams() {
    var paramsString = location.search.substr(1);
    var params = {};
    var paramEqStrings = paramsString.split('&');
    for (var index = 0, len = paramEqStrings.length; index < len; index++) {
        var paramStr = paramEqStrings[index];
        var eqIndex = paramStr.indexOf('=');
        var key = paramStr.substring(0, eqIndex);
        params[key] = paramStr.substring(eqIndex + 1);
    }
    return params;
}