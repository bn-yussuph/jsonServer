(function () {
	'use strict';

	var app = angular.module('wardApp');

	app.service('wardStateSrvc', wardStateSrvcFxn);


	wardStateSrvcFxn.$inject = ['$http', 'BASE_URL'];
	function wardStateSrvcFxn($http, BASE_URL){

		this.getAllWardsState = function (argument) {
			return $http.get(BASE_URL + 'state')
				.then(function (res) {
					console.log(res.data)
					return res.data;
				})
				.catch(function (error) {
					console.log(error);
					throw error;
				});
		}

		this.getWardStateById = function (wardId) {
			return $http.get(BASE_URL + 'state?wardId=' + wardId )
				.then(function (res) {
					console.log(res)
					return res.data;
				})
				.catch(function (error) {
					console.log(error);
					throw error;
				});
		}

		this.getWardStateByIdAndData = function (wardId, date) {
			var params = {
				params: {
					wardId: wardId,
					date: date
				}
			}
			return $http.get(BASE_URL + 'state', params)
				.then(function (res) {
					console.log(res)
					return res.data;
				})
				.catch(function (error) {
					console.log(error);
					throw error;
				});
		}

		this.addWardState = function(payload){
			return $http.put(BASE_URL + 'state', payload)
				.then(function (res) {
					console.log(res)
					return res.data;
				})
				.catch(function (error) {
					console.log(error);
					throw error;
				});
		}

		this.deleteWardStete = function(wardId, date){
			var params = {
				params: {
					wardId: wardId,
					date: date
				}
			}
			return $http.delete(BASE_URL + 'state', params)
				.then(function (res) {
					console.log(res)
					return res.data;
				})
				.catch(function (error) {
					console.log(error);
					throw error;
				});
		}
	}

})()