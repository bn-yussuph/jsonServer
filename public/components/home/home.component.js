(function () {
	'use strict';

	angular.module('wardApp')
		.component('home', {
			templateUrl: 'components/home/home.tpl.html',
			controller: homeController,
			bindings: {

			}
		});


	homeController.$inject = [];
	function homeController() {
		// body...
	}
})()