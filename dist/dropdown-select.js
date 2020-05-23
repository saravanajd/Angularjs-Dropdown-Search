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
          '            <input type="text" ng-model="searchText" style="padding: 0.2rem 1rem;width: 100%">',
          '        </li>',
          '        <li class="ng-dropdown-item" ',
          '        ng-repeat="item in ddData | filter:ddSearchFilter" data-item="{{item}}" ng-click="SelectItem($event,item)">',
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
        // require: "^ngModel",
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
          '$document',
          function($scope, $element, $document) {
            console.log('$element', $element, '$document', $document);

            $scope.searchText = '';
            $scope.labelText = '-- select --';
            if ($scope.ddModel && $scope.ddModel[$scope.ddLabel]) {
              $scope.labelText = $scope.ddModel[$scope.ddLabel];
            }

            $scope.ddSearchFilter = function(item) {
              return (
                !$scope.searchText ||
                (item[$scope.ddLabel] &&
                  item[$scope.ddLabel]
                    .toLowerCase()
                    .indexOf($scope.searchText.toLowerCase()) > -1)
              );
            };

            $scope.SelectItem = function($event, item) {
              $scope.ddModel = item;

              console.log(
                '$scope.ddModel',
                $scope.ddModel,
                '$scope.ddData',
                $scope.ddData
              );

              $scope.labelText = $scope.ddModel[$scope.ddLabel];
              $element.removeClass('show');
            };

            $element.on('click', function($event) {
              const ele = angular.element($event.target);

              const isTarget = ele.closest('.ng-dropdown-text').length === 1;

              if (isTarget) {
                $element.toggleClass('show');
              }
            });

            $document.on('mouseup', function($event) {
              if (!$event || !$event.target) {
                return;
              }

              const isDropdownContainer =
                $element.has($event.target).length === 1;

              if (!isDropdownContainer) {
                $element.removeClass('show');
              }
            });
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
