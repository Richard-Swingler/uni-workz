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
			
			var database = response.data;

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

			//sorting the JSON database by time ----------------------------------------------------------------
			var sortByProperty = function (property){
				return function (x,y){
					return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    			};
			};
			database.sort(sortByProperty("startTime"));
			//--------------------------------------------------------------------------------------------------

			var targetTime = 800;
			var recursiveNo=0;


			for (var i=0; i < database.length; i++) {
				
				var targetDay = database[i].day;

				//get each database item
				var targetDayArray = database[i]; 
				var nextTargetArray = (database[i+1] !== undefined) ? database[i+1] :  false;
				console.log(nextTargetArray);

				//if 800 then add
				if (targetTime === 800 && targetDayArray.startTime === 800 && days[targetDay].items.length === 0){
					days[targetDay].items.push(targetDayArray);
				}

				//if not 800, and is empty  add free blocks then add targetarray
				if (targetTime > 800 && days[targetDay].items.length === 0){

					recursiveNo = ((targetDayArray.startTime - 800) / 100)-1;

					for (var recurNo = 0 ; recurNo <= recursiveNo; recurNo++){
						var plus = (recurNo===0) ? 0 : (recurNo)*100;

						var arrrayToAdd = {"id": 0, 
								       "name": "free1", 
								       "description": "nothing", 
								       "user": 1, 
								       "startTime": 800 + plus, 
								       "endTime": undefined, 
								       "day": targetDay};	
						days[targetDay].items.push(arrrayToAdd);
					}
					days[targetDay].items.push(targetDayArray);

				}else if (targetTime > 800 && days[targetDay].items.length !== 0){ // if not 800 and is not empty

					var previousdayitem = days[targetDay].items[days[targetDay].items.length-1];

					recursiveNo = ((targetDayArray.startTime - previousdayitem.startTime) / 100) - 2;

					if (previousdayitem.startTime+100 === targetTime){
						days[targetDay].items.push(targetDayArray);
					}else{

						for (var recurNo = 0 ; recurNo <= recursiveNo; recurNo++){

							var plusB = (recurNo===0) ? previousdayitem.startTime + 100 : previousdayitem.startTime+100 + (recurNo*100);
							
							arrrayToAdd = {"id": 0, 
									       "name": "free2", 
									       "description": "nothing", 
									       "user": 1, 
									       "startTime": plusB, 
									       "endTime": undefined, 
									       "day": targetDay};	
							days[targetDay].items.push(arrrayToAdd);
						}
						days[targetDay].items.push(targetDayArray);
					}//end inner
				}// end if 

				if (nextTargetArray !== false){
					//check start time is same as targettime
					if(nextTargetArray.startTime !== targetTime){
						targetTime = targetTime + 100;
						console.log(targetTime + "+100")
					}
				}

			} //end for

			$scope.days = days;
		});
	};
	$scope.updateItem = function(data){
		$http.put('/api/update/').then(function(){
		});
	}
	$scope.loadItems();
});

