(function () {
    'use strict';

    var app = angular.module('wardApp');

    app.component('wardStats', {
        bindings: {
            wards: '<'
        },
        controller: WardStatsController,
        templateUrl: 'components/wardStats/wardStats.tpl.html'
    });

    WardStatsController.$inject = ['$state', '$filter', 'wardStateSrvc'];
    function WardStatsController($state, $filter, wardStateSrvc) {
        this.stats = {};

        this.submitStats = function (form) {
            // console.log(form);
            var formatedDate = $filter('date')(form.date, 'yyyy-MM-dd');
            form.date = formatedDate;
            console.log(form);
                var result = wardStateSrvc.addWardState(form)
                    .then(function (success) {
                        $state.reload();
                        console.log(success);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.stats = {};
                return result;

        }

        // this.$onInit = function () {
        //     wardsSrvc.getAllWards()
        //         .then(function (success) {
        //             console.log(success.data);
        //             this.wards = success.data;
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         })
        // }
    }
})();