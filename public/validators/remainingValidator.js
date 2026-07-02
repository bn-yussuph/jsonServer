(function () {
    'use strict';

    var app = angular.module('wardApp');

    app.directive('remainingValidator', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                // console.log(attrs);
                ngModel.$validators.remainingValidator = function (modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    const stats = (scope.$ctrl.stats.previous +
                        scope.$ctrl.stats.admissions +
                        scope.$ctrl.stats.transins) -
                        (scope.$ctrl.stats.discharges +
                            scope.$ctrl.stats.transouts +
                            scope.$ctrl.stats.referred +
                            scope.$ctrl.stats.deaths);
                    ngModel.$setViewValue(stats);
                    ngModel.$render();
                    const isValid = value === stats;
                    console.log("Validator called with value: ", value, ", stats: ", stats, " and isValid: ", isValid);
                    return isValid;
                };
            }
        };
    });
})()