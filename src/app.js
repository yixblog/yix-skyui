/**
 * Created by yixian on 13-12-17.
 */

var requestParams = getURLRequestParams();
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
                console.log(element.html());
                scope.paramstring="scope apram"
            }
        }
    })
})(requestParams, app);

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
app.directive('myTabs',function(){

});

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