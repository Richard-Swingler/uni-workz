var $jq = jQuery.noConflict();
var projectOverview = angular.module('project_overview', []).config(function($httpProvider, $interpolateProvider) {
   $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; 
   $interpolateProvider.startSymbol('{$');
   $interpolateProvider.endSymbol('$}');
});
projectOverview.controller('project_overview_ctrl', function($scope, $http) {
	$scope.initialize = function(data){
		$scope.aaa = data;		
	};
	$scope.loadItems = function(){
		$http.get('/api/v1/tasks/').then(function(response){
			$scope.items = response.data;
		});
	};

	var buildTask = function (name, startDate, endDate, progressFlag) {
		return {
			name: name,
			start: startDate,
			end: endDate,
			progress: progressFlag,
		};
	}

	$scope.getData = function(){
		$http.get('/api/v1/tasks/').then(function(response){
			var items = response.data;
			var tasks = [];

			for (var i=0; i<items.length; i++) {
				var task = buildTask(items[i].name,items[i].startDate.substring(0,10), items[i].endDate.substring(0,10), items[i].progressFlag);
				tasks.push(task);
			}
			
			var ganttData = [
				{	
					id: 1, 
					name: "Project tasks", 
					series: tasks,
				}
			];
			 $jq("#ganttChart").ganttView({ 
                data: ganttData,
                slideWidth: 900,
               
            });
		});
	} 
	$scope.loadItems();
	$scope.getData();
});