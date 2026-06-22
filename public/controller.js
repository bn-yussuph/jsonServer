(function () {
	'use strict';
	var app = angular.module('wardApp');

	app.controller('wardCtrl', ['$scope', 'wardsSrvc', 'wardStateSrvc', 'statsSrvc', 'wardHelpers',
		function ($scope, wardsSrvc, wardStateSrvc, statsSrvc, wardHelpers) {
			$scope.title = "Ward Application";
			// $scope.ward = {};

			$scope.submitForm = function () {
				return wardsSrvc.addData()
					.then(function (success) {
						console.log(success);
						return success.data;
					})
					.catch(function (error) {
						console.log(error);
					});
			};

			$scope.deleteWard = function (wardId, event) {
				if (event) {
					event.preventDefault();
				}
				return wardsSrvc.deleteWard(wardId)
					.then(function (success) {
						console.log("ward Deleted successful, ID: ", wardId);
					})
					.catch(function (error) {
						console.log("can not deleted Ward");
					});
			}
		}])
}
)();