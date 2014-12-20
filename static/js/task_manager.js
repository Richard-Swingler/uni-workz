var $jq = jQuery.noConflict();
var taskManager = angular.module('task_manager', ['ui.bootstrap', 'ui.sortable', 'ngCookies']).config(function($httpProvider, $interpolateProvider) {
   $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; 
   $interpolateProvider.startSymbol('{$');
   $interpolateProvider.endSymbol('$}');
});


taskManager.controller('task_manager_ctrl', function($scope, $http, $cookies) {
	$scope.initialize = function(data){
		$scope.aaa = data;		
	};
	// $scope.updateItem = function(){
	// 	$http({
	// 		method: 'POST',
	// 		url: '/api/v1/tasks/', 
	// 		headers: {
	// 			'X-CSRFToken': $cookies.csrftoken
	// 		},
	// 		data: {
	// 	        "name": "to do 1", 
	// 	        "description": "asdfsafd12", 
	// 	        "author": 1, 
	// 	        "startDate": "2014-12-07T16:23:02Z", 
	// 	        "endDate": "2014-12-07T16:23:04Z", 
	// 	        "progressFlag": 0
	// 	    }
	// 	}).
	// 	success(function(data, status, headers, config) {
	// 	    console.log('yay');
	// 	}).
	// 	error(function(data, status, headers, config) {
	// 	    console.log($cookies.csrftoken);
	// 	});
	// };
	$scope.loadItems = function(){
		$http.get('/api/v1/tasks/').then(function(response){
			$scope.items = response.data;

			var objects = response.data;

			var reviews = new Array();

			//for(var i = 0; i < objects.length; i++){
			//	reviews.push([objects[i].progressFlag, objects[i]]);
			//}

			objects.forEach( 
				function buildArray(object){
					if(!reviews[object.progressFlag])
						reviews[object.progressFlag] = [];
					reviews[object.progressFlag].push(object);
				}
			);

			$scope.reviews = reviews;
		});
	}; 

	$scope.sortableOptions = {

		start: function(event, ui) {
                item = ui.item;
                console.log(item.attr('id'));
                newList = oldList = ui.item.parent().parent();
                console.log(oldList.attr('id'));
            },
            stop: function(event, ui) {          
                alert("Moved " + item.attr('id') + " from " + oldList.attr('id') + " to " + newList.attr('id') + " to " + ui.item.index());
            },
            change: function(event, ui) {  
                if(ui.sender) newList = ui.placeholder.parent().parent();
            },
            receive: function(event, ui) {
		        var sourceList = ui.sender;
		        var targetList = $jq(this);
		    },
	    connectWith: ".apps-container",
	};
	
	$scope.loadItems();
	//$scope.updateItem();
});


angular.module('modalviews',  ['ui.bootstrap']);
// add manager Modal
var addManagerModal = function($scope, $modal) {
	$scope.open = function ($task) {
		$scope.task = $task;
		var modalInstance = $modal.open({
	    templateUrl: 'addManager',
	    	scope: $scope,
	      	controller: ModalInstanceCtrl});
};
	


};

var ModalInstanceCtrl = function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};