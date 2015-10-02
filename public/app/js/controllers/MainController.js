App.controller('MainController', ['$rootScope', '$scope', '$http', '$state', '$auth', function($rootScope, $scope, $http, $state, $auth) {
  'use strict';
  
  $scope.events = [];
  $scope.subevents = [];
  $scope.show_subevents = false;
  $scope.current_event = {}
  $scope.parent_event = {}
  $scope.display_back = false;
    
  $rootScope.logout = function(){
      $auth.logout();
  }
  
  $scope.getEvents = function(){
    $http.get($rootScope.url + '/events').
    success(function(data){
      $scope.events = data;
      console.log(data);
    }).
    error(function(data){
      console.log('unable to retrieve event');
    });
  }
  
  $scope.getSubEvents = function(id){
    $http.get($rootScope.url + '/events/' + id).
    success(function(data){
      $scope.events = data;
    }).
    error(function(data){
      console.log('unable to retrieve event');
    });
  }
  
  $scope.getEvents();
  
  $scope.createEvent = function(){
    if($scope.parent_event)
    {
      $scope.event.parent_id = $scope.parent_event.id
    }
    $http.post($rootScope.url + '/event/create', $scope.event).
    success(function(data){
      if(data.status == 'authenticated')
      {
          $state.go('/');
      }
    
      //$scope.events.push(data.data);
      $scope.getEvents();
      if($scope.parent_event)
      {
        $scope.getSubEvents($scope.parent_event.id);
      }
      $scope.event.name = '';
      $scope.event.desc = '';
    }).
    error(function(data){
      console.log('error saving');
    });
    
  }
  
  $scope.selectParent = function(event)
  {
    console.log('parent!');
    $scope.parent_event = event;
  }
  
  $scope.clearParent = function(){
    $scope.parent_event = undefined;
  }
  
  $scope.showSubEvents = function(event){
    if(event.root_id == 0)
    {
        $scope.event.root = event.id
    }
    $scope.current_event = event;
    $scope.getSubEvents(event.id);
    $scope.selectParent(event);
    $scope.display_back = true;
  }
  
  $scope.hideSubEvents = function(){
    $http.get($rootScope.url + '/event/' + $scope.current_event.parent_id).
      success(function(data){
        $scope.current_event = data;
      }).
      error(function(data){
        console.log('unable to retrieve event');
      });
    if($scope.current_event.parent_id == 0)
    {
      $scope.getEvents();
      $scope.display_back = false;
    }
    else
    {
      $scope.getSubEvents($scope.current_event.parent_id);
    }
  }
  
  $scope.toggleEvent = function(event){
    var action = '';
    var val = 0;
    if(event.enabled == 1)
    {
        action = 'disable';
        val = 0;
    }
    else
    {
        action = 'enable';
        val = 1;
    }
      
    $http.post($rootScope.url + '/event/' + action, event).
    success(function(data){
      //$scope.events.push(data.data);
      console.log('event ' + action);
      event.enabled = val;
    }).
    error(function(data){
      console.log('error '+action+' event');
    });
  }
}]);