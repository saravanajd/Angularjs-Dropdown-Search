(function(window, angular) {
  'use strict';

  const apps = angular.module('DropDownSelect', []);

  apps.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put(
        'template/dropdownSelect.html',
        [
          '<div class="ng-dropdown-container">',
          '    <div class="ng-dropdown-text">',
          '        <span>{{labelText}}</span>',
          '    </div>',
          '    <ul class="ng-dropdown-options">',
          '        <li class="ng-dropdown-item">',
          '            <input type="text" style="padding: 0.2rem 1rem;width: 100%">',
          '        </li>',
          '        <li class="ng-dropdown-item" ng-repeat="item in ddData" data-item="{{item}}" ng-click="SelectItem($event,item)">',
          '            {{item[ddLabel]}}',
          '        </li>',
          '    </ul>',
          '</div>'
        ].join('')
      );
    }
  ]);

  apps.directive('dropdownSelect', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          ddModel: '=',
          ddData: '=',
          ddLabel: '@',
          ddChange: '&'
        },
        controller: [
          '$scope',
          '$element',
          function($scope, $element) {
            console.log(
              '$scope.ddModel',
              $scope.ddModel,
              '$scope.ddData',
              $scope.ddData
            );

            $scope.labelText = '-- select --';
            if ($scope.ddModel && $scope.ddModel[$scope.ddLabel]) {
              $scope.labelText = $scope.ddModel[$scope.ddLabel];
            }

            $scope.SelectItem = function($event, item) {
              $scope.ddModel = item;

              console.log(
                '$scope.ddModel',
                $scope.ddModel,
                '$scope.ddData',
                $scope.ddData
              );

              $scope.labelText = $scope.ddModel[$scope.ddLabel];
            };

            $element.on('click', function($event) {
              $event.stopPropagation();
              $element.addClass('show');
            });

            // $element.bind('click', function($event) {
            //   $event.stopPropagation();

            //   $element.addClass('show');
            //   //              $element.toggleClass('show');
            // });
          }
        ],
        // templateUrl: 'dropdownSelect.html' // 'template/dropdownSelect.html'
        templateUrl: 'template/dropdownSelect.html'
      };
    }
  ]);

  function IsString(value) {
    return typeof value === 'string';
  }

  function IsArray(value) {
    return typeof value === 'object';
  }
})(window, window.angular);
