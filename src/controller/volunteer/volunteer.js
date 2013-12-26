app.controller('volunteer',function($scope,$http){
    $http.post('../resources/localData/volunteers.json',{}).success(function(data){
        $scope.volunteers = data.works;
    });

});