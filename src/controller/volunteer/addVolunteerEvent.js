/**
 * Created by yixian on 13-12-27.
 */
app.controller('addVolunteerCtrl', function ($scope) {
    $scope.saveEdit = function (params) {
        var type = params.type == 'add' ? '新增记录' : '修改记录';
        alert(type + "\r\n姓名:" + params.name + "\r\n时间:" + params.time + "\r\n地点:" + params.location + "\r\n内容:" + params.content);
    }
});