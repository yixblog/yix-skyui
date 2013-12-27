app.controller('volunteer', function ($scope, $http) {
    $http.post('../resources/localData/volunteers.json', {}).success(function (data) {
        $scope.volunteers = data.works;
    });
    $scope.newVolunteer = function () {
        top.openTab("fl_Volunteer_add", "添加记录", {type: 'add'})
    };
    $scope.editVolunteer = function (volunteer) {
        var param = {name: volunteer.name, time: volunteer.time, content: volunteer.content, location: volunteer.location};
        param.type = 'edit';
        console.log('edit');
        console.log(param);
        top.openTab('fl_Volunteer_add', '修改记录', param)
    }
});