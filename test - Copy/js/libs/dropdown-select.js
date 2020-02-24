// import { angular } from '../../src/js/angular';

const app = angular.module('ngDropdowns', []);

app.directive('ngDropdownSelect', [
  'DropdownService',
  function(DropdownService) {
    return {
      restirct: 'A',
      replace: true,
      scope: {
        dropdownSelect: '=',
        dropdownModel: '=',
        dropdownItemLabel: '@',
        dropdownOnChange: '&',
        dropdownDisabled: '='
      },
      controller: [
        '$scope',
        '$element',
        function($scope, $element) {
          $scope.labelField = $scope.dropdownItemLabel || 'text';

          DropdownService.register($element);

          this.select = function(selected) {
            if (!angular.equals(selected, $scope.dropdownModel)) {
              $scope.dropdownModel = selected;
              $scope.dropdownOnChange({
                selected: selected
              });
              console.log('select.$element', $element);
              $element[0].blur();
            }
          };

          $element.bind('click', function($event) {
            $event.stopPropagation();
            if (!$scope.dropdownDisabled) {
              DropdownService.toggleActive($element);
            }
          });

          $scope.$on('$destory', function() {
            DropdownService.unregister($element);
          });
        }
      ]
    };
  }
]);
