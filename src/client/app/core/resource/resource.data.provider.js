(function() {
  'use strict';

  angular
    .module('app.resource')
    .provider('DataProvider', DataProvider);

  DataProvider.$inject = ['ApiResource'];

  function DataProvider(ApiResource) {
    return {
      list : function (resource, query) {
        return [
          'DataProvider',
          function (DataProvider) {  // inject the data service
            return DataProvider.list(resource, query);
          }
        ]
      },

      get: function (resource, query) {
        return [
          'DataProvider',
          function(DataProvider) {
            return DataProvider .get(resource, query);
          }
        ]
      },

      $get: function () {

        var data = {

          list: function (resource, query) {
            return ApiResource[resource].get(query).$promise;
          },

          get : function (resource, query) {
            return ApiResource[resource].get(query).$promise;
          },

          create : function (resource, model) {
            return ApiResource[resource].save(model).$promise;
          },

          update : function (resource, model) {
            return ApiResource[resource].update(model).$promise;
          },

          remove : function (resource, model) {
            return data.remove(resource, model).$promise;
          }
        };

        return data;
      }
    }
  }
});
