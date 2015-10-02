App.controller('LoginController', ['$rootScope', '$scope', '$http', '$state', '$auth', function($rootScope, $scope, $http, $state, $auth) {
  'use strict';
    
  $scope.login = {}
  $scope.loading = '';
  $scope.auth = $auth;

  $scope.login_submit = function(){
      $scope.loading = 'LOADING';
      $auth.login($scope.user)
        .then(function() {
          $scope.loading = '';
          $scope.error = '';
          $state.go("app.mainpage");
        })
        .catch(function(response) {
          $scope.loading = '';
          $scope.error = response.data.message;
        });
      /*
      $http.post($rootScope.url + '/login', $scope.login).
        success(function(data){
          console.log(data)
          $scope.loading = '';
          if(data.status == 'ok')
          {
              $state.go("app.mainpage");
          }
      }).
        error(function(data){
          console.log('unable to retrieve event');
      });
      */
  }
  
  $scope.register_submit = function(formValid){
      if(!formValid){ return false; }
      $scope.loading = 'REGISTERING'
      $http.post($rootScope.url + '/register', $scope.register).
        success(function(data){
          console.log(data);
          $scope.loading = '';
          if(data.status == 'ok')
          {
            $state.go('app.mainpage');
          }
      }).
        error(function(data){
      });
  }
  
  console.log($auth.isAuthenticated());
  
    
  $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
  };
    
  $scope.logout = function(){
      $auth.logout();
  };
}])