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
			$scope.items = response.data;
		});
	};
	$scope.updateItem = function(data){
		$http.put('/api/update/').then(function(){
		});
	}
	$scope.loadItems();
});
