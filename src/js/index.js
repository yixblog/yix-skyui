/**
 * Created by yixian on 13-12-26.
 */
var mainApp = angular.module("app", []);
mainApp.config(function ($sceProvider) {
    $sceProvider.enabled(false);
});

mainApp.controller('mainCtrl', function ($scope) {
    $scope.tabs = {};
    $scope.openTab = function (appName, tabName, url) {
        for (var key in $scope.tabs) {
            if ($scope.tabs[key].active) {
                $scope.tabs[key].active = false;
                break;
            }
        }
        if ($scope.tabs[appName] == null) {
            $scope.tabs[appName] = {
                appName: appName,
                tabName: tabName,
                url: url,
                active: true
            }
        } else {
            $scope.tabs[appName].active = true;
        }
    };

    $scope.closeTab = function (tabObj) {
        delete $scope.tabs[tabObj.appName]
    }
});