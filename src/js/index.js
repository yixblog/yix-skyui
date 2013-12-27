/**
 * Created by yixian on 13-12-26.
 */
var mainApp = angular.module("app", ['ngAnimate']);
mainApp.config(function ($sceProvider) {
    $sceProvider.enabled(false);
});

var menuConfigs = [
    {
        label: "司法信息",
        submenu: [
            {
                label: "公益劳动",
                appName: "fs_VolunteerPage"
            },
            {
                label: "电话汇报",
                appName: "fs_PhoneReport"
            },
            {
                label: "矫正方案",
                appName: "fs_ReformPlan"
            }
        ]
    },
    {
        label: "航班信息",
        appName: "fs_FlightRecord"
    },
    {
        label: "网吧信息",
        appName: "fs_netcafeRecord"
    }
];

mainApp.controller('mainCtrl', function ($scope) {
    $scope.tabs = [];
    $scope.menu = menuConfigs;
    $scope.submenu = [];

    $scope.chooseMenu = function (menuObj) {
        clearChosenMenu($scope.menu);
        if (menuObj.submenu != null) {
            $scope.submenu = menuObj.submenu;
        } else {
            $scope.submenu = [];
            $scope.openTab(menuObj.appName, menuObj.label, null);
        }
        menuObj.active = true;
    };

    $scope.chooseSubmenu = function (menuObj) {
        clearChosenMenu($scope.menu);
        $scope.openTab(menuObj.appName, menuObj.label);
        menuObj.active = true;
    };

    function clearChosenMenu(menus) {
        for (var i = 0, len = menus.length; i < len; i++) {
            menus[i].active = false;
            if (menus[i].submenu != null) {
                clearChosenMenu(menus[i].submenu)
            }
        }
    }

    $scope.openTab = function (appName, tabName, params) {
        var oldTab = $scope.findOpeningTab();
        if (oldTab != null) {
            oldTab.active = false;
        }
        var url = "src/workspace.html?appname=" + appName;
        if (params != null) {
            for (var key in params) {
                url += "&" + key + "=" + params[key];
            }
        }
        console.log('configured url:'+url);
        var thisTab = findTab(appName);
        if (thisTab == null) {
            var newtab = {
                appName: appName,
                tabName: tabName,
                url: url,
                active: true
            };
            $scope.tabs.push(newtab);
        } else {
            thisTab.active = true;
            thisTab.url = url;
        }
        console.log($scope.tabs);
    };

    function findTab(appName) {
        console.log("finding tab");
        for (var index = 0, len = $scope.tabs.length; index < len; index++) {
            var tab = $scope.tabs[index];
            if (tab.appName == appName) {
                return tab;
            }
        }
        return null;
    }

    $scope.findOpeningTab = function () {
        console.log("finding opening");
        var result=null;
        for (var index = 0, len = $scope.tabs.length; index < len; index++) {
            var tab = $scope.tabs[index];
            if (tab.active) {
                if(result==null){
                    result = tab;
                }else{
                    tab.active=false;
                }
            }
        }
        return result;
    };

    $scope.activeTab = function (tabObj) {
        console.log('activing tab:' + tabObj.appName);
        var oldTab = $scope.findOpeningTab();
        if (oldTab != null) {
            oldTab.active = false;
        }
        var index = findTabIndex(tabObj.appName);
        var tab = $scope.tabs[index];
        tab.active = true;
    };

    function findTabIndex(tabAppName) {
        var findIndex = -1;
        for (var index = 0, len = $scope.tabs.length; index < len; index++) {
            var tab = $scope.tabs[index];
            if (tab.appName == tabAppName) {
                findIndex = index;
                break;
            }
        }
        console.log('found index:' + findIndex);
        return findIndex;
    }

    $scope.closeTab = function (appName) {
        var findIndex = findTabIndex(appName);
        console.log('find index:' + findIndex);
        if (findIndex > -1) {
            $scope.tabs.splice(findIndex, 1);
        }
        var actTab = $scope.tabs.length > findIndex ? $scope.tabs[findIndex] : $scope.tabs[findIndex - 1];
        console.log("closing tab");
        console.log(actTab);
        actTab.active = true;

        console.log($scope.tabs);
    }
});
//外部调用Controller内方法
function openTab(appName, tabName, params) {
    angular.element(".mainDiv").scope().$apply(function(scope){
        scope.openTab(appName, tabName, params);
    });
}

function closeTab(appName){
    angular.element(".mainDiv").scope().$apply(function(scope){
        scope.closeTab(appName);
    });
}