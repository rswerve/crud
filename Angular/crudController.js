myApp.controller('crudController', function($scope, crudFactory){
  $scope.word = crudFactory.test

  $scope.formData = {}

  $scope.all = function(){
    crudFactory.getAll()
    .then(function(data){
      $scope.allTheCats = data.data
    })
  }

  $scope.post = function(data){
    crudFactory.post(data)
    .then(function(data){
      $scope.formData = {}
      $scope.all()
    })
  }

  $scope.delete = function(data){
    if (confirm('Delete that cat?')){
      crudFactory.delete(data)
      .then(function(data){
        $scope.all()
      })
    }
  }

  $scope.update = function(name, age, address, id){
    var updatedRecord = {
      name: name,
      age: age,
      address: address,
      id: id
    }
    crudFactory.update(updatedRecord)
    .then(function(data){
    $scope.all()
    })
  }

  $scope.all()

})