var myApp = angular.module('myApp', ['ngRoute', 'mp.deepBlur'])

myApp.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: './HTML/crud.html',
    controller: 'crudController'
  })
})
