(function () {
    'use strict';

    angular.module('wardApp')
        .component('wardForm', {
            bindings: {
                wards: '<'
            },
            templateUrl: 'components/wardForm/wardForm.tpl.html',
            controller: function wardFormCtrl($state, wardsSrvc) {
                this.name = 'Form name';
                this.ward = {};


                this.submitForm = function (form) {
                    console.log(form.$valid);
                    if (form.$valid) {
                        var result = wardsSrvc.addWard(this.ward)
                            .then(function (success) {
                                $state.reload();
                                console.log(success);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                        this.ward = {};
                        // $state.go($state.current.name, $state.current.params, {reload: true});

                        return result;
                    }
                }

                this.deleteWard = function (wardId) {
                    return wardsSrvc.deleteWard(wardId)
                        .then(function (success) {
                            console.log(success);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        });
})()