const app = angular.module('DropdownSelectApp', ['DropDownSelect']);

app.controller('ctrlTest', function ($scope, filterFilter) {

  $scope.Brand = '';
  $scope.Product = '';

  $scope.brandList = BrandList;
  $scope.productList = ProductList;


  $scope.OnBrandSelected = function () {

    $scope.productList = filterFilter(ProductList, {
      BrandId: $scope.Brand.BrandId
    });
    $scope.$apply();

  }

  $scope.OnItemChange = function () {
    alert('This item is changed');
  }

});


const BrandList = [{
    BrandId: 1,
    Name: 'Apple'
  },
  {
    BrandId: 2,
    Name: 'Samsung'
  },
  {
    BrandId: 3,
    Name: 'Google'
  },
  {
    BrandId: 4,
    Name: 'Microsoft'
  }
]

const ProductList = [{
  ProductId: 1,
  BrandId: 1,
  Name: 'Mobile',

}, {
  ProductId: 2,
  BrandId: 1,
  Name: 'Accessories',

}, {
  ProductId: 3,
  BrandId: 1,
  Name: 'Watch'
}, {
  ProductId: 4,
  BrandId: 2,
  Name: 'Mobile',

}, {
  ProductId: 5,
  BrandId: 3,
  Name: 'Accessories',

}, {
  ProductId: 6,
  BrandId: 3,
  Name: 'AR'
}, ]