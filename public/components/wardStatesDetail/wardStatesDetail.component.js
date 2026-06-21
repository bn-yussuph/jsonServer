(function(){
    'use strict';

    var app = angular.module('wardApp');

    app.component('wardStatesDetail', {
        bindings: {
            wardState: '<',
            wards: '<'
        },
        controller: WardStatesDetailController,
        templateUrl: 'components/wardStatesDetail/wardStatesDetail.tpl.html'
    });

    function WardStatesDetailController() {
        this.$onInit = function(){
            console.log(this.wardState);
        }
    }

})()