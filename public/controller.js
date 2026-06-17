(function () {
	'use strict';
	var app = angular.module('wardApp', []);

	app.controller('wardCtrl', ['$scope', 'wardsSrvc', 'wardStateSrvc', 'statsSrvc', 'wardHelpers',
		function ($scope, wardsSrvc, wardStateSrvc, statsSrvc, wardHelpers) {
			$scope.title = "Ward Application";
			// $scope.ward = {};

			this.$onInit = function () {
				wardsSrvc.getWard()
					.then(function (data) {
						// console.log("onInit fired", data);
						$scope.wards = data;
					})
					.catch(function (error) {
						$scope.errorMessage = 'Failed to get data';
					});

				wardStateSrvc.getAllWardsState()
					.then(function (data) {
						// console.log("onInit fired", data);
						$scope.wardState = data;
						$scope.statsWithNames = wardHelpers
							.replaceIdwithNames($scope.wards, $scope.wardState)
						console.log("Stats with ward names", $scope.statsWithNames);
					})
					.catch(function (error) {
						$scope.errorMessage = 'Failed to get data';
					});

				statsSrvc.getAllStats()
					.then(function (data) {
						// console.log("onInit fired", data);
						$scope.wardStats = data;
					})
					.catch(function (error) {
						$scope.errorMessage = 'Failed to get data';
					});
			}

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