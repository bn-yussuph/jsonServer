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
                resolve: {
                    wards: function(wardsSrvc){
                        return wardsSrvc.getAllWards();
                    }
                }
            })
            .state('home.wardstatesdetail', {
                url: '/{wardId}',
                component: 'wardStatesDetail',
                resolve: {
                    wardState: function($stateParams,  wardStateSrvc){
                        return wardStateSrvc.getWardStateById($stateParams.wardId);
                    }
                }
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
