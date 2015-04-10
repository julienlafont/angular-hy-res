/**
 * angular-hy-res - Hypermedia client for AngularJS inspired by $resource
 * @version v0.0.10 - 2015-04-10
 * @link https://github.com/julienlafont/angular-hy-res
 * @author Julien LAFONT <julien.lafont@tabmo.fr>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('angular-hy-res-json', ['angular-hy-res'])
  .service('hrJsonExtension', function() {
    this.applies = function(data, headers) {
      return headers('Content-Type') === 'application/json';
    };

    this.dataParser = function(data) {
      return data;
    };

    this.linkParser = function(data, headers, Resource) {
      return {};
    };

    this.embeddedParser = function(data, headers) {
      return [];
    };
  })
  .config(['hrResourceProvider', function(hrResourceProvider) {
    hrResourceProvider.extensions.push('hrJsonExtension');
  }]);

