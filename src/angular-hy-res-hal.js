'use strict';

angular.module('angular-hy-res-hal', ['angular-hy-res'])
  .provider('hrHalExtension', function() {
    this.$get = function(hrWebLinkFactory, hrLinkCollection) {
      
      var HalExtension = function() {
        this.applies = function(data, headers) {
          return true;
        };

        this.dataParser = function(data, headers) {
          var ret = {};
          angular.copy(data, ret);
          delete ret._links;
          delete ret._embedded;
          return ret;
        };

        this.linkParser = function(data, headers, Resource) {
          if (!angular.isObject(data._links)) {
            return null;
          }

          var ret = {};
          angular.forEach(data._links, function(val, key) {
            if (!angular.isArray(val)) {
              val = [val];
            }

            var linkArray = [];
            angular.forEach(val, function(l) {
              linkArray.push(hrWebLinkFactory(l, Resource));
            });

            ret[key] = hrLinkCollection.fromArray(linkArray);
          });
          return ret;
        };

        this.embeddedParser = function(data, headers) {
          var ret = {};
          angular.forEach(data._embedded || {}, function(val, key) {
            if (!angular.isArray(val)) {
              val = [val];
            }

            ret[key] = val;
          });

          return ret;
        };
      };

      return new HalExtension();
    };
  })
  .config(['hrResourceProvider', function(hrResourceProvider) {
    hrResourceProvider.extensions.push('hrHalExtension');
  }]);

