(function () {
	'use strict';

	var app = angular.module('wardApp');

	app.service('statsSrvc', ['$http', 'BASE_URL', statsSrvcFxn]);

	function statsSrvcFxn($http, BASE_URL){

		this.getAllStats = function (argument) {
			return $http.get(BASE_URL + 'stats')
			.then(function(response) {
                // Return only the data payload to the controller
                return response.data; 
            })
            .catch(function(error) {
                console.error('Error fetching data:', error);
                throw error; // Pass error along to the controller
            });
		}

		this.getStatsByWardId = function (wardId) {
			return $http.get(BASE_URL + 'stats', { params: { wardId: wardId }})
				.then(function(response) {
                // Return only the data payload to the controller
                return response.data.stats; 
            })
            .catch(function(error) {
                console.error('Error fetching data:', error);
                throw error; // Pass error along to the controller
            });
        }

		this.getStatsByWardIdAndDate = function(wardId, date){
			return $http.get(BASE_URL + 'stats', { params: { wardId: wardId, date: date }})
				.then(function(response) {
                // Return only the data payload to the controller
                return response.data; 
            })
            .catch(function(error) {
                console.error('Error fetching data:', error);
                throw error; // Pass error along to the controller
            });
		}

		this.editWardState = function(wardId, date, payload){
			return $http.patch(BASE_URL + 'stats', { params: { wardId: wardId, date: date }}, payload)
				.then(function(response) {
                // Return only the data payload to the controller
                return response.data; 
            })
            .catch(function(error) {
                console.error('Error fetching data:', error);
                throw error; // Pass error along to the controller
            });
		}

		this.deleteWardState = function (wardId, date) {
			return $http.delete(BASE_URL + 'stats', { params: { wardId: wardId, date: date }})
				.then(function(response) {
                // Return only the data payload to the controller
                return response.data; 
            })
            .catch(function(error) {
                console.error('Error fetching data:', error);
                throw error; // Pass error along to the controller
            });
		}
	}

})()