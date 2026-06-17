(function () {
	'use strict';

	var app = angular.module('wardApp');

	app.service('wardsSrvc', ['$http', 'BASE_URL', function($http, BASE_URL){

		this.getWard = function () {
			return $http.get(BASE_URL + 'wards')
				.then(function(response) {
                // Return only the data payload to the controller
                return response.data; 
            })
            .catch(function(error) {
                console.error('Error fetching data:', error);
                throw error; // Pass error along to the controller
            });
		}

		this.getWardBy = function (wardId) {
			return $http.get(BASE_URL + 'wards/' + wardId)
				.then(function(response) {
                // Return only the data payload to the controller
                return response.data; 
            })
            .catch(function(error) {
                console.error('Error fetching data:', error);
                throw error; // Pass error along to the controller
            });
		}

		this.addWard = function(payload){
			var url = BASE_URL + 'wards';
			return $http.post(url, payload)
				.then(function (success) {
					console.log(success);
				})
				.catch(function (error) {
					console.log(error);
					throw error;
				});
		};

		this.deleteWard = function(wardId){
			console.log("Ward service delete fxn", wardId);
			return $http.delete("http://localhost:3000/wards/" + wardId)
				.then(function (success) {
					console.log(success);
				})
				.catch(function (error) {
					console.log(error);
					throw error;
				});
		};

		this.EditWard = function (payload) {
			return $http.patch("http://localhost:3000/wards/" + wardId, payload)
				.then(function (success) {
					console.log(success);
				})
				.catch(function (error) {
					consolle.log(error);
					throw error;
				});
		};
	
	}]);
})();