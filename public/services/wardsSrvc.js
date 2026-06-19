(function () {
	'use strict';

	var app = angular.module('wardApp');

	app.service('wardsSrvc', ['$http', 'BASE_URL', function ($http, BASE_URL) {

		this.getAllWards = function () {
			return $http.get(BASE_URL + 'wards')
				.then(function (response) {
					// Return only the data payload to the controller
					return response.data;
				})
				.catch(function (error) {
					console.error('Error fetching data:', error);
					throw error; // Pass error along to the controller
				});
		}

		this.getAllWardsWithStates = function(){
			return $http.get(BASE_URL + 'wards?_embed=states')
				.then(function (response) {
					// Return only the data payload to the controller
					return response.data;
				})
				.catch(function (error) {
					console.error('Error fetching data:', error);
					throw error; // Pass error along to the controller
				});
		}

		this.getWardWithStates = function(wardId){
			return $http.get(BASE_URL + wardId + '?_embed=states')
				.then(function (response) {
					// Return only the data payload to the controller
					return response.data;
				})
				.catch(function (error) {
					console.error('Error fetching data:', error);
					throw error; // Pass error along to the controller
				});
		}

		this.getWardBy = function (wardId) {
			return $http.get(BASE_URL + 'wards/' + wardId)
				.then(function (response) {
					// Return only the data payload to the controller
					return response.data;
				})
				.catch(function (error) {
					console.error('Error fetching data:', error);
					throw error; // Pass error along to the controller
				});
		}

		this.addWard = function (payload) {
			var url = BASE_URL + 'wards';
			return $http.post(url, payload)
				.then(function (success) {
					console.log(success);
					return success.data;
				})
				.catch(function (error) {
					console.log(error);
					throw error;
				});
		};

		this.deleteWard = function (wardId) {
			return $http.delete(BASE_URL + "wards/" + wardId)
				.then(function (success) {
					console.log(success);
					return success.data;
				})
				.catch(function (error) {
					console.log(error);
					throw error;
				});
		};

		this.EditWard = function (wardId, payload) {
			return $http.patch(BASE_URL + "wards/" + wardId, payload)
				.then(function (success) {
					console.log(success);
					return success.data;
				})
				.catch(function (error) {
					console.log(error);
					throw error;
				});
		};

	}]);
})();