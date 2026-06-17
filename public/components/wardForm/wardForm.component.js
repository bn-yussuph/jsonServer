(function () {
    'use strict';

    angular.module('wardApp')
        .component('wardForm', {
            bindings: {
                ward: '<'
            },
            templateUrl: 'components/wardForm/wardForm.tpl.html',
            controller: function wardFormCtrl(wardsSrvc) {
                this.name = 'Form name';
                this.ward = {
                    wardId: '',
                    name: '',
                    BedCapacity: 0
                };

            
                this.submitForm = function () {
                    console.log(this.ward);
                    return wardsSrvc.addWard(this.ward)
                        .then(function(success){
                            console.log(success);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }

                this.deleteWard = function(){
                    return wardsSrvc.deleteWard(wardId)
                        .then(function (success) {
                            console.log(success);
                        })
                        .catch(function(error){
                            console.log(error);
                        });
                }
            }
        });
})()