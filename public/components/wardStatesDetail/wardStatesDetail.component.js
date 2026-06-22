(function () {
    'use strict';

    var app = angular.module('wardApp');

    app.component('wardStatesDetail', {
        bindings: {
            wardState: '<',
            ward: '<'
        },
        require: {
            homeCtrl: '^^home'
        },
        controller: WardStatesDetailController,
        templateUrl: 'components/wardStatesDetail/wardStatesDetail.tpl.html'
    });

    function WardStatesDetailController($state, $stateParams, cssInjector) {
        cssInjector.add('/components/wardStatesDetail/wardStatesDetail.css');
        this.$onInit = function () {
            this.homeCtrl.hasContent = true;
        }

        this.$onDestroy = function(){
            this.homeCtrl.hasContent = false;
        }
    }

})()