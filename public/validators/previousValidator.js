(function () {
    'use strict';

    var app = angular.module('wardApp');

    app.directive('previousValidator', ['wardStateSrvc', '$filter', function (wardStateSrvc, $filter) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                console.log("wardId", scope.$ctrl.stats.warddId);
                console.log("date", scope.$ctrl.stats.date);

                // if(!scope.$ctrl.stats.wardId && !scope.$ctrl.stats.date) {
                //     console.error("wardId or date is not defined in stats object.");
                //     return false; // Exit early if wardId or date is not defined
                // }

                ngModel.$validators.previousValidator = function (modelValue, viewValue) {
                    var previous = modelValue || viewValue;
                    let date = new Date(scope.$ctrl.stats.date);
                    date.setDate(date.getDate() - 1); // Subtract one day
                    console.log(date);
                    var formatedDate = $filter('date')(date, 'dd-MM-yyyy');
                    console.log("FormatedDated", formatedDate);

                    if (!scope.$ctrl.stats.wardId && !scope.$ctrl.stats.date) {
                        console.error("wardId or date is not defined in stats object.");
                        return false; // Exit early if wardId or date is not defined
                    }

                    wardStateSrvc.getWardStateByIdAndData(scope.$ctrl.stats.wardId, formatedDate)
                        .then(function (res) {
                            console.log("Ward state data retrieved:", res);
                            const previousValue = res.length > 0 ? res[0].remaining : 0;
                            const isValid = previous === previousValue;
                            ngModel.$setViewValue(previousValue);
                            ngModel.$render();
                            console.log("isValid", isValid);
                            return isValid;
                        })
                        .catch(function (error) {
                            console.error("Error retrieving ward state data:", error);
                            return false; // Consider invalid if there's an error
                        });
                    return true; // Return true for now, actual validation will be handled asynchronously
                };
            }
        };
    }]);
})()