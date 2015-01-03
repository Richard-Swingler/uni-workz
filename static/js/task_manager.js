var $jq = jQuery.noConflict();
var taskManager = angular.module('task_manager', ['ui.bootstrap', 'ui.sortable', 'ngCookies']).config(function($httpProvider, $interpolateProvider) {
   $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; 
   $interpolateProvider.startSymbol('{$');
   $interpolateProvider.endSymbol('$}');
});

// Custom Filter for capitalizing all Task Names
taskManager.filter('capitalize', function() {
    return function(input, all) {
      	return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
});

taskManager.controller('task_manager_ctrl', function($scope, $http, $cookies, $location, $window) {


	$scope.initialize = function(data){
		$scope.aaa = data;		
	};
	
	$scope.loadItems = function(){
		$http.get('/api/v1/tasks/').then(function(response){
			$scope.items = response.data;
			var objects = response.data;
			$scope.reviews = new Array();
			reviews = [[{"progressFlag": 0}],
			    [{"progressFlag": 1}],
			    [{"progressFlag": 2}]]

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
		items:'li',
		start: function(event, ui) {
            item = ui.item;
            console.log(item.attr('id'));
            console.log(ui.item.index());
            console.log(ui.item.parent().attr('id'));
        },
        stop: function(event, ui) {          
        	item = ui.item;
        	var itemId = parseInt(item.attr('id'), 10);
        	var count = 0;
        	
        	reviews.forEach(
        		function buildArray(object){
        			count++;
        			object.forEach(
		        		function buildArray(obj){
							if(obj.id){
								if(obj.id == itemId){
								 	console.log(count);
								 	$http({
										method: 'PUT',
										url: '/api/v1/tasks/' + itemId, 
										headers: {
											'X-CSRFToken': $cookies.csrftoken
										},
										data: {
									        "name": obj.name, 
									        "description": obj.description, 
									        "startDate": obj.startDate, 
									        "endDate": obj.endDate, 
									        "progressFlag": count-1
									    }
									}).
									success(function(data, status, headers, config) {
									    console.log('Task was successfully updated in Database');
									}).
									error(function(data, status, headers, config) {
									    console.log($cookies.csrftoken);
									});
								}	
							}
						}
					);
				}
			);
        },
	    connectWith: ".apps-container",
	};
	
	$scope.addATask = function($flag, $author){
		var self = this;
		console.log('User clicked submit with ',
            self.add_description, self.add_name, self.dt, self.dt1, $author, self.assigned_user);

		$http({
			method: 'POST',
			url: '/api/v1/tasks/', 
			headers: {
				'X-CSRFToken': $cookies.csrftoken
			},
			data: {
		        "name": self.add_name, 
		        "description": self.add_description, 
		        "author": $author, 
		        "startDate": "2014-12-07T16:23:02Z", 
		        "endDate": "2014-12-07T16:23:04Z", 
		        "progressFlag": $flag,
		        "assignedUser": self.assigned_user
		    }
		}).
		success(function(data, status, headers, config) {
		    console.log('Task was successfully saved to Database');
		}).
		error(function(data, status, headers, config) {
		    console.log($cookies.csrftoken);
		});
	};

	$scope.updateATask = function($flag, $author, $id){
		var self = this;
		console.log('User clicked submit with ',
            self.task_name, self.description, self.startDate, self.endDate, $author, self.assigned_user, $id);

		$http({
			method: 'PUT',
			url: '/api/v1/tasks/' + $id, 
			headers: {
				'X-CSRFToken': $cookies.csrftoken
			},
			data: {
		        "name": self.task_name, 
		        "description": self.description, 
		        "author": $author, 
		        "startDate": self.startDate, 
		        "endDate": self.endDate, 
		        "progressFlag": $flag
		    }
		}).
		success(function(data, status, headers, config) {
		    console.log('Task was successfully updated in Database');
		    $window.location.reload();
		}).
		error(function(data, status, headers, config) {
		    console.log($cookies.csrftoken);
		});
	};

	$scope.deleteTask = function($id){
		$http({
			method: 'DELETE',
			url: '/api/v1/tasks/' + $id, 
			headers: {
				'X-CSRFToken': $cookies.csrftoken
			}
		}).
		success(function(data, status, headers, config) {
		    console.log('Task was successfully deleted from Database');
		    $window.location.reload();
		}).
		error(function(data, status, headers, config) {
		    console.log($cookies.csrftoken);
		});
	}

	$scope.loadItems();
});

var addManagerModal = function($scope, $modal) {
	$scope.open = function ($task) {
		$scope.task = $task;
		
		// These variables are for Form Input models so the input fields are filled with relvant data when you press on a task
		$scope.task_name = $task.name;
		$scope.description = $task.description;
		$scope.startDate = $task.startDate;
		$scope.endDate = $task.endDate;
		$scope.author = $task.author;
		$scope.assignedUser = $task.assignedUser;
		$scope.taskId = $task.id;
		// It ends hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

		var modalInstance = $modal.open({
	    	templateUrl: 'addManager',
	    	scope: $scope,
	      	controller: ModalInstanceCtrl
	    });
	};

	$scope.add = function ($flag) {
		$scope.flag = $flag;
		var modalInstance = $modal.open({
	    templateUrl: 'add_task',
	    	scope: $scope,
	      	controller: ModalInstanceCtrl
	    });
	};
};

var ModalInstanceCtrl = function ($scope, $modalInstance, $window) {
	$scope.ok = function () {
	    $modalInstance.close();
	    $window.location.reload();
	};
	$scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	};
};

taskManager.controller('DatepickerDemoCtrl', function ($scope) {
	$scope.today = function() {
	    $scope.dt = new Date();
	};
	$scope.today();

	$scope.clear = function () {
	    $scope.dt = null;
	};

	$scope.today1 = function() {
	    $scope.dt1 = new Date();
	};
	$scope.today1();

	$scope.clear1 = function () {
	    $scope.dt1 = null;
	};

	$scope.todate = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.opened = true;
	};

	$scope.todate1 = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.opened1 = true;
	};

	$scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	};

	$scope.formats = ['yyyy-mm-dd', 'shortDate'];
	$scope.format = $scope.formats[0];
});