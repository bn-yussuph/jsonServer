(function(){
    'use strict';

    var app = angular.module('wardApp', ['ngRoute']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                component: 'home'
            })
            .when('/ward', {
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
    }   ]);
})()
