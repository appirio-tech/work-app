/* jshint -W040 */
(function() {
  'use strict';

  angular
    .module('app.resource')
    .provider('data', dataProvider);

  dataProvider.$inject = [];

  function dataProvider() {
    this.list = function (resource, query) {
      return [
        'data',
        function (data) {  // inject the data service
          return data.list(resource, query);
        }
      ];
    };

    this.get = function (resource, query) {
      return [
        'data',
        function(data) {
          return data.get(resource, query);
        }
      ];
    };

    this.$get = Data;

    Data.$inject = ['ApiResource'];

    function Data(ApiResource) {
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
          return ApiResource[resource].remove(model).$promise;
        },

        delete : function (resource, model) {
          return ApiResource[resource].delete(model).$promise;
        }
      };

      return data;
    }
  }
})();
