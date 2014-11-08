var taskManager = angular.module('task_manager', []).config(function($httpProvider, $interpolateProvider) {
   $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; 
   $interpolateProvider.startSymbol('{$');
   $interpolateProvider.endSymbol('$}');
});


taskManager.controller('task_manager_ctrl', function($scope, $http) {
	$scope.initialize = function(data){
		$scope.aaa = data;		
	};
	$scope.loadItems = function(){
		$http.get('/api/v1/tasks/').then(function(response){
			$scope.items = response.data;
		});
	};
	$scope.updateItem = function(data){
		aler('>>');
		$http.put('/api/update/').then(function(){
			alert('might have done something');
			alert('maybe');
			alert('possibly');
		});
	}
	$scope.loadItems();
});