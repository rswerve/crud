myApp.factory('crudFactory', function($http){
  var service = {}
  service.test = 'The Cat Factory'

  service.getAll = function(){
    return $http({
      method: 'GET',
      url: '/cats'
    })
    .then(function(data){
      return data
    })
  }

  service.post = function(data){
    return $http({
      method: 'POST',
      url: '/cats/',
      data: data
    })
  }

  service.delete = function(data){
    return $http({
      method: 'DELETE',
      url: '/cats/:' + data,
    })
  }

  service.update = function(data){
    return $http({
      method: 'PUT',
      url: '/cats/:' + data.id,
      data: data
    })
  }

  return service
})