/**
 * Created by yixian on 13-12-17.
 */

var requestParams = getURLRequestParams();

var app = angular.module('app',[]);
//IE7 Support
app.config(function($sceProvider){
    $sceProvider.enabled(false);
});

app.config(function($routeProvider){

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