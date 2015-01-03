var $jq = jQuery.noConflict();
var taskManager = angular.module('task_manager', ['ui.bootstrap', 'ui.sortable', 'ngCookies']).config(function($httpProvider, $interpolateProvider) {
   $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; 
   $interpolateProvider.startSymbol('{$');
   $interpolateProvider.endSymbol('$}');
});

taskManager.controller('task_manager_ctrl', function($scope, $http, $cookies, $location, $window) {

	// Global function to load all tasks to the page when the page is loaded.
	$scope.loadItems = function(){
		$http.get('/api/v1/tasks/').then(function(response){
			$scope.items = response.data;
			$scope.reviews = new Array();
			// populate the array with default empty values initially
			reviews = [[{"progressFlag": 0}],[{"progressFlag": 1}],[{"progressFlag": 2}]];

			$scope.items.forEach( 
				function buildArray(object){
					if(!reviews[object.progressFlag])
						reviews[object.progressFlag] = [];
					reviews[object.progressFlag].push(object);
				}
			);
			// Make the array global to be used in the templates
			$scope.reviews = reviews;
		});
	}; 


	// Options for Sortable function, will update the DB on object move
	$scope.sortableOptions = {
		// Perform a function when the object is stopped to be dragged
        stop: function(event, ui) { 
        	// Store the ID of the task being dragged
        	var item = ui.item;
        	var itemId = parseInt(item.attr('id'), 10);
        	var i = 0;
        	
        	// Loop through items in the Array of tasks, it is a multidimensional Array
        	reviews.forEach(
        		function buildArray(object){
        			object.forEach( function buildArray(obj){
						if(obj.id && obj.id == itemId){
							// Make an HTTP Put request to update data inside of DB
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
							        "progressFlag": i
							    }
							}).
							success(function(data, status, headers, config) {
							    console.log('Task was successfully updated in Database');
							}).
							error(function(data, status, headers, config) {
							    console.log("Task wasn't successfully updated");
							});
						}
					});
					i++;
				}
			);
        },
	    connectWith: ".apps-container",
	};
	

	// Function to make a POST request to REST API and add a task to the DB
	$scope.addATask = function($flag, $author){
		$http({
			method: 'POST',
			url: '/api/v1/tasks/', 
			headers: {
				'X-CSRFToken': $cookies.csrftoken
			},
			data: {
		        "name": this.add_name, 
		        "description": this.add_description, 
		        "author": $author, 
		        "startDate": "2014-12-07T16:23:02Z", 
		        "endDate": "2014-12-07T16:23:04Z", 
		        "progressFlag": $flag,
		        "assignedUser": this.assigned_user
		    }
		}).
		success(function(object, status, headers, config) {
		    console.log('Task was successfully saved to Database');
		    // Push the newly created Bbject/Task to the array of Tasks to avoid the need for page refreshing
		    reviews[object.progressFlag].push(object);
		}).
		error(function(object, status, headers, config) {
		    console.log("Task wasn't saved to the database");
		});
	};


	// Make a HTTP PUT request to REST API and update the task details 
	$scope.updateTask = function($flag, $author, $id){
		$http({
			method: 'PUT',
			url: '/api/v1/tasks/' + $id, 
			headers: {
				'X-CSRFToken': $cookies.csrftoken
			},
			data: {
		        "name": this.task_name, 
		        "description": this.description, 
		        "author": $author, 
		        "startDate": this.startDate, 
		        "endDate": this.endDate, 
		        "progressFlag": $flag
		    }
		}).
		success(function(data, status, headers, config) {
			var i = 0;
		    // However, to be dynamic we need to Update the task from the LISTs as well, to avoid page refreshing
		    reviews.forEach(
        		function buildArray(object){
        			var j = 0;
        			object.forEach( function updateArray(obj){
						if(obj.id && obj.id == $id){
							$scope.reviews[i][j] = data;
						}
						j++;
					});
					i++;
				}
			);
			console.log('Task was successfully updated in Database');
		}).
		error(function(data, status, headers, config) {
		    console.log("Task wasn't successfully updated in Database");
		});
	};


	// Function to delete a task from the lists, i.e. To Do, In Progress, Done
	$scope.deleteTask = function($id){
		// Make a request to REST API and delete a specific task
		$http({
			method: 'DELETE',
			url: '/api/v1/tasks/' + $id, 
			headers: {
				'X-CSRFToken': $cookies.csrftoken
			}
		}).
		success(function(data, status, headers, config) {
			// However, to be dynamic we need to delete the task from the LISTs as well, to avoid page refreshing
		    var i = 0;
		    // Loop through items in the Array of tasks, it is a multidimensional Array
		    reviews.forEach(
        		function buildArray(object){
        			var j = 0;
        			object.forEach( function deleteFromArray(obj){
						if(obj.id && obj.id == $id){
							$scope.reviews[i].splice(j,1);
						}
						j++;
					});
					i++;
				}
			);
		}).
		error(function(data, status, headers, config) {
		    console.log("The Task could not be deleted");
		});
	}

	// Call the LoadItems function on page request to load all tasks to the lists
	$scope.loadItems();
});


// Custom Filter for capitalizing all Task Names
taskManager.filter('capitalize', function() {
    return function(input, all) {
      	return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
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

		// Opens the Modal on click
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

var ModalInstanceCtrl = function ($scope, $modalInstance) {
	$scope.ok = function () {
	    $modalInstance.close();
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