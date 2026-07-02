(function () {
    'use strict';

    var app = angular.module('wardApp', ['angular.css.injector', 'ui.router']);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        // Define application states
        $stateProvider
            .state('home', {
                url: '/home',
                component: 'home',
                resolve: {
                    wards: function (wardsSrvc) {
                        return wardsSrvc.getAllWards();
                    }
                }
            })
            .state('home.wardstatesdetail', {
                url: '/{wardId}',
                component: 'wardStatesDetail',
                resolve: {
                    ward: function (wards, $stateParams) {
                        for (let i = 0; i < wards.length; i++) {
                            if (wards[i].id === $stateParams.wardId) {
                                return wards[i];
                            }
                        }
                    },
                    wardState: function ($state, $stateParams, wardStateSrvc) {
                        return wardStateSrvc.getWardStateById($stateParams.wardId);
                    }
                }
            })
            .state('wards', {
                url: '/wards',
                component: 'wardForm',
                resolve: {
                    wards: function (wardsSrvc) {
                        return wardsSrvc.getAllWards();
                    }
                }
            })
            .state('statistics', {
                url: '/statistics',
                component: 'wardStats',
                resolve: {
                    wards: function (wardsSrvc) {
                        return wardsSrvc.getAllWards();
                    }
                }
            });
    }]);
})()
