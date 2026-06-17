(function(){
    'use strict';

    var app = angular.module('wardApp');

    app.factory('wardHelpers', wardHelpers);

    function wardHelpers(){
        return {
            replaceIdwithNames: function(wards, wardStats){
                console.log("Helper fxn replaceIdwithNames called");
                console.log("params:", wards, wardStats);
                for(var ward of wards){
                    for(var stat of wardStats){
                        if(stat.wardId === ward.wardId){
                            stat.wardName = ward.name;
                            stat.wardCapacity = ward.BedCapacity;
                        }
                    }
                }
                console.log("return value:", wardStats);
                return wardStats;
                
            },
            transformWardStats: function(){}
        };
    }
})()