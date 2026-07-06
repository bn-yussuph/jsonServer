(function () {
    'use strict';

    var app = angular.module('wardApp');

    app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                // var modelSetter = model.assign;
                console.log("fileModel directive initialized");

                // element.bind('change', function (changeEvent) {
                //     var file = changeEvent.target.files[0];

                //     if (file) {
                //         var reader = new FileReader();

                //         // Triggered when file reading finishes successfully
                //         reader.onload = function (loadEvent) {
                //             scope.$apply(function () {
                //                 try {
                //                     // Extract textual content and convert to a JSON object
                //                     var rawContent = loadEvent.target.result;
                //                     var jsonObject = angular.fromJson(rawContent);

                //                     // Assign the parsed object directly back to the controller scope
                //                     model.assign(scope, jsonObject);
                //                 } catch (error) {
                //                     console.error("Invalid JSON file formatting:", error);
                //                     model.assign(scope, null);
                //                 }
                //             });
                //         };

                //         // Read the local file as plain text
                //         reader.readAsText(file);
                //     }
                // });

                // element.bind('change', function () {
                //     scope.$apply(function () {
                //         // Store the raw File object into the scope variable
                //         model.assign(scope, element[0].files[0]);
                //         console.log(scope.$ctrl.file);
                //     });
                // });

            }
        };
    }]);
})()