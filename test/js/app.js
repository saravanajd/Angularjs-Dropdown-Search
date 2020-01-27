const app = angular.module('DropdownSelectApp', ['DropDownSelect']);

app.controller('ctrlTest', function($scope) {
  $scope.name = 'sara';

  const userList = [
    {
      Id: 1,
      Name: 'sara'
    },
    {
      Id: 2,
      Name: 'jade'
    },
    {
      Id: 3,
      Name: 'jd'
    },
    {
      Id: 4,
      Name: 'moe'
    },
    {
      Id: 5,
      Name: 'deku'
    },
    {
      Id: 6,
      Name: 'joro'
    }
  ];

  $scope.userList = userList;
  $scope.selectedUser = userList[2];
});
