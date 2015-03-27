(function() {
  'use strict';

  angular
    .module('app.resource')
    .provider('data', data);

  data.$inject = ['ApiResource'];

  function data() {
    return {
      list : function (resource, query) {
        return [
          'data',
          function (data) {  // inject the data service
            return data.list(resource, query);
          }
        ]
      },

      get: function (resource, query) {
        return [
          'data',
          function(data) {
            return data .get(resource, query);
          }
        ]
      },

      $get: function (ApiResource) {

        var data = {

          list: function (resource, query) {
            return ApiResource[resource].query(query).$promise;
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
