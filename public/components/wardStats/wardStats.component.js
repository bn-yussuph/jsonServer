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

    WardStatsController.$inject = ['$state', '$filter', 'cssInjector', 'wardStateSrvc', 'excelSrvc'];
    function WardStatsController($state, $filter, cssInjector, wardStateSrvc, excelSrvc ) {
        this.stats = {};
        this.file = null;

        cssInjector.add('/components/wardStats/wardStats.css');

        this.uploadFile = function () {
            console.log("Uploading file: ", this.file);

            var file = new FormData();
            file.append('file', this.file);

            wardStateSrvc.uploadFile(file)
                .then(function (success) {
                    console.log("File uploaded successfully: ", success);
                })
                .catch(function (error) {
                    console.error("Error uploading file: ", error);
                });
        }

        this.submitStats = function (form) {
            // console.log(form);
            // console.log(wardStatsForm);
            var formatedDate = $filter('date')(form.date, 'dd-MM-yyyy');
            form.date = formatedDate;
            // console.log(form);
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

        this.updateFemales = function () {
            this.stats.females = this.stats.remaining - this.stats.males;
            console.log("females: ", this.stats.females);
        };
    }
})();