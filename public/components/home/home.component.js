(function () {
    'use strict';

    angular.module('wardApp')
        .component('home', {
            templateUrl: 'components/home/home.tpl.html',
            controller: homeController,
            bindings: {
                wards: '<'
            }
        });
    homeController.$inject = ['$scope', 'cssInjector', 'wardsSrvc', 'wardStateSrvc', 'statsSrvc'];
    function homeController($scope, cssInjector, wardsSrvc, wardStateSrvc, statsSrvc) {
        
        cssInjector.add('/components/home/home.css');

               this.$onInit = function () {
                this.hasContent = false;
                // console.log(this.wards);

            wardsSrvc.getAllWardsWithStates()
                .then(function (data) {
                    // console.log("onInit fired", data);
                    $scope.wardWithStates = data;
                })
                .catch(function (error) {
                    $scope.errorMessage = 'Failed to get data';
                });


            statsSrvc.getAllStats()
                .then(function (data) {
                    $scope.wardStats = data;
                })
                .catch(function (error) {
                    $scope.errorMessage = 'Failed to get stats';
                });
        }

        this.$onDestroy = function(){
            this.hasContent = false;
        }
    }

})()