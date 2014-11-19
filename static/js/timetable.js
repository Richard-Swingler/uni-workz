var collaboratortool = angular.module('timetable', []).config(function($httpProvider, $interpolateProvider) {
   $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; 
   $interpolateProvider.startSymbol('{$');
   $interpolateProvider.endSymbol('$}');
});


collaboratortool.controller('timetable_ctrl', function($scope, $http) {
	$scope.initialize = function(data){
		$scope.aaa = data;		
	};
	$scope.loadItems = function(){
		$http.get('/api/v1/timetable/').then(function(response){
			
			var items = response.data;

			var days = [{
				name: 'Monday',
				items:[]
			}, {
				name: 'Tuesday',
				items:[]
			}, {
				name: 'Wednesday',
				items:[]
			}, {
				name: 'Thursday',
				items:[]
			}, {
				name: 'Friday',
				items:[]
			}];

			//sort into each day

			for (var i=0; i < items.length; i++) {
				var targetDay = items[i].day;
				days[targetDay].items.push(items[i]);
			}

			$scope.days = days;

			//json.decode
			//do
			//json.encode
		});
	};
	$scope.updateItem = function(data){
		$http.put('/api/update/').then(function(){
		});
	}
	$scope.loadItems();
});
