(function () {
    'use strict';

    var app = angular.module('wardApp', ['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider,  $locationProvider) {
        // console.log("$routeProvider invoked");
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/', {
                component: 'home'
            })
            .when('/wards', {
                templateUrl: 'components/wardForm/wardForm.tpl.html',
                controller: 'wardCtrl'
            })
            .when('/stats', {
                templateUrl: 'views/stats.html',
                controller: 'wardCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})()
