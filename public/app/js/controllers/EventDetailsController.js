App.controller('EventDetailsController', ['$modal', 'Upload', '$stateParams', '$rootScope', '$scope', '$http', '$timeout', function($modal, Upload, $stateParams, $rootScope, $scope, $http, $timeout) {
  'use strict';
  
  $scope.timer_autostart = false;
  $scope.default_end = new Date(new Date().getTime() + 50*60000).getTime();
  $scope.default_countdown = 50 * 60;
  $scope.main_state = 'players';
  
  $http.get($rootScope.url + '/event/' + $stateParams.eventId).
    success(function(data){
      $scope.event = data;
    }).
    error(function(data){
      console.log('unable to retrieve event');
    });
  
  $http.get($rootScope.url + '/players/' + $stateParams.eventId).
    success(function(data){
      $scope.players = data;
    }).
    error(function(data){
      console.log('unable to retrieve players');
    });
  
  $scope.getRounds = function(){
      $http.get($rootScope.url + '/rounds/' + $stateParams.eventId).
        success(function(data){
          // get local timezone offset
          var hrs = -(new Date().getTimezoneOffset() / 60)
          for(var i in data){
            if(data[i].start_time != '')
            {
              // calculate between the difference
              var endtime = moment(data[i].start_time).add(hrs, 'hours').add(50,'minutes');
              var diff = moment.duration(endtime.diff(moment()));  
              data[i].end_time = endtime;
              data[i].countdown = diff.asSeconds();
            }
            else
            {
              data[i].end_time = $scope.default_end;
              data[i].countdown = $scope.default_countdown;
            }
          }
          $scope.rounds = data;
        }).
        error(function(data){
          console.log('unable to retrieve rounds');
        });
  };
  $scope.getRounds();
  
  $scope.viewPairings = function(round_id){
      $scope.round_id = round_id
      $scope.main_state = 'pairings';
  }
  
  $scope.changeState = function(tmp){
      $scope.main_state = tmp
  }
    
  $scope.createRound = function(){
    if($scope.rounds == undefined){ return false; }
    var round = {};
    round.name = 'Round ' + ($scope.rounds.length + 1)
    $http.post($rootScope.url + '/round/create', { name: round.name, event_id: $stateParams.eventId }).
      success(function(data){
        //$scope.rounds = data;
        $scope.rounds.push(data);
      }).
      error(function(data){
        console.log('unable to retrieve event');
      });
  }
  
  $scope.deleteRound = function(round_id){
      $http.post($rootScope.url + '/round/delete', { 'id':round_id }).
        success(function(data){
          $scope.getRounds();
        }).
        error(function(data){
          console.log('unable to delete round');
        })
  }
  
  $scope.startStopRound = function(round){
    if(round.start == true)
    {
      round.start = false;
      document.getElementById('roundId_'+round.id).getElementsByTagName('timer')[0].stop();
    }
    else
    {
      console.log(round);
      round.start = true;
      $http.post($rootScope.url + '/round/start', { id: round.id, eventId:$stateParams.eventId}).
        success(function(data){
          document.getElementById('roundId_'+round.id).getElementsByTagName('timer')[0].start();
        }).
        error(function(data){
          console.log('unable to start round');
        });
    }
  }
  
  $scope.upload = function(files)
  {
    if (files && files.length) {
      console.log(files);
      var file = files[0];
      
      if($scope.event == undefined){ return false }
      
      Upload.upload({
          url: $rootScope.url + '/files',
          fields: {
              'event_id': $stateParams.eventId,
              'type': 'players'
          },
          file: file
      }).progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          $scope.log = 'progress: ' + progressPercentage + '% ' + evt.config.file.name + '\n' + $scope.log;
          console.log($scope.log);
      }).success(function (data, status, headers, config) {
          $timeout(function() {
              $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
              console.log($scope.log);
          });
          $scope.players = data.players
      });
      
    }
  }
  
  $scope.uploadPairing = function(files, id)
  {
    if (files && files.length) {
      console.log(files);
      var file = files[0];
      
      if($scope.event == undefined){ return false }
      
      Upload.upload({
          url: $rootScope.url + '/files',
          fields: {
              'event_id': $stateParams.eventId,
              'round_id': id,
              'type': 'pairings'
          },
          file: file
      }).progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          $scope.log = 'progress: ' + progressPercentage + '% ' + evt.config.file.name + '\n' + $scope.log;
          console.log($scope.log);
      }).success(function (data, status, headers, config) {
          $timeout(function() {
              $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
              console.log($scope.log);
          });
          $scope.players = data.players
      });
      
    }
  }
  
  
  $scope.openModal = function (size, title) {
    
    $rootScope.modal_title = title;

    var modalInstance = $modal.open({
      templateUrl: '/myModalContent.html',
      controller: ModalInstanceCtrl,
      size: size
    });

    var state = $('#modal-state');
    modalInstance.result.then(function () {
      state.text('Modal dismissed with OK status');
    }, function () {
      state.text('Modal dismissed with Cancel status');
    });
  };

  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $modal service used above.

  var ModalInstanceCtrl = function ($rootScope, $scope, $modalInstance) {

    $scope.ok = function () {
      $modalInstance.close('closed');
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
  ModalInstanceCtrl.$inject = ["$rootScope", "$scope", "$modalInstance"];
  
}]);
// testing123