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

	var buildTask = function (name) {
		return {
			name: name,
			start: new Date(2010,00,03),
			end: new Date(2010,00,03)
		};
	}

	$scope.getData = function(){
		$http.get('/api/v1/tasks/').then(function(response){
			var items = response.data;
			var tasks = [];

			for (var i=0; i<items.length; i++) {
				var task = buildTask(items[i].name);
				tasks.push(task);
			}
			console.log( new Date(items[0].startDate.substring(0, 10)));
			var ganttData = [
				{	
					id: 1, 
					name: items[0].name, 
					series: tasks,
					start:  new Date(items[0].startDate.substring(0, 10)), 
					end:  new Date(items[0].endDate.substring(0, 10))
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