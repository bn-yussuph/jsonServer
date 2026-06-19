(function () {
    'use strict';

    var app = angular.module('wardApp', ['ui.router']);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        // Define application states
        $stateProvider
            .state('home', {
                url: '/home',
                component: 'home',
                resolve: {}
            })
            .state('wards', {
                url: '/wards',
                component: 'wardForm',
                resolve: {
                    wards: function(wardsSrvc){
                        return wardsSrvc.getAllWards();
                    }
                }
            })
            .state('statistics', {
                url: '/statistics',
                component: 'wardStats',
                resolve: {
                    wards: function(wardsSrvc){
                        return wardsSrvc.getAllWards();
                    }
                }
            });
    }]);
})()
