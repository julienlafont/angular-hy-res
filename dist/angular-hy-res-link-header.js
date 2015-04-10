/**
 * angular-hy-res - Hypermedia client for AngularJS inspired by $resource
 * @version v0.0.10 - 2015-04-10
 * @link https://github.com/julienlafont/angular-hy-res
 * @author Julien LAFONT <julien.lafont@tabmo.fr>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

var httpLink = require('http-link');

angular.module('angular-hy-res-link-header', ['angular-hy-res'])
  .service('hrLinkHeaderExtension', ['hrWebLinkFactory', function(hrWebLinkFactory) {
    this.applies = function(data, headers) {
      return headers('Link') !== null;
    };

    this.dataParser = function(data) {
      return {};
    };

    this.linkParser = function(data, headers, Resource) {
      var links = httpLink.parse(headers('Link'));

      var ret = {};
      for(var i = 0; i < links.length; i++) {
        var l = links[i];
        var wl = hrWebLinkFactory(l, Resource);
        if (!angular.isUndefined(ret[l.rel])) {
          ret[l.rel].push(wl);
        } else {
          ret[l.rel] = [wl];
        }

        delete l.rel;
      }
      return ret;
    };

    this.embeddedParser = function(data, headers) {
      return [];
    };
  }])
  .config(['hrResourceProvider', function(hrResourceProvider) {
    hrResourceProvider.extensions.push('hrLinkHeaderExtension');
  }]);

