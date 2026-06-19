(function () {
	'use strict';

	var app = angular.module('wardApp');

	app.service('wardStateSrvc', wardStateSrvcFxn);


	wardStateSrvcFxn.$inject = ['$http', 'BASE_URL'];
	function wardStateSrvcFxn($http, BASE_URL) {

		this.getAllWardsState = function () {
			return $http.get(BASE_URL + 'states')
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
			return $http.get(BASE_URL + 'states?wardId=' + wardId)
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
			return $http.get(BASE_URL + 'states', params)
				.then(function (res) {
					console.log(res)
					return res.data;
				})
				.catch(function (error) {
					console.log(error);
					throw error;
				});
		}

		this.addWardState = function (payload) {
			return $http.post(BASE_URL + 'states', payload)
				.then(function (res) {
					console.log(res)
					return res.data;
				})
				.catch(function (error) {
					console.log(error);
					throw error;
				});
		}

		this.deleteWardStete = function (wardId, date) {
			var params = {
				params: {
					wardId: wardId,
					date: date
				}
			}
			return $http.delete(BASE_URL + 'states', params)
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