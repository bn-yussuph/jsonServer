(function () {
	'use strict';

	angular.module('wardApp')
		.component('home', {
			templateUrl: 'components/home/home.tpl.html',
			controller: homeController,
			bindings: {
                wards: '<'
			}
		});
	homeController.$inject = ['$scope', 'wardsSrvc', 'wardStateSrvc', 'statsSrvc'];
	function homeController($scope, wardsSrvc, wardStateSrvc, statsSrvc) {

        this.$onInit = function () {
            
            wardsSrvc.getAllWardsWithStates()
                .then(function (data) {
                    // console.log("onInit fired", data);
                    $scope.wardWithStates = data;
                })
                .catch(function (error) {
                    $scope.errorMessage = 'Failed to get data';
                });


            statsSrvc.getAllStats()
                .then(function (data) {
                    $scope.wardStats = data;
                })
                .catch(function (error) {
                    $scope.errorMessage = 'Failed to get stats';
                });
        }
    }

})()