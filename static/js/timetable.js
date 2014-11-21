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


			for (var i=0; i < database.length; i++) {
				
				var targetDay = database[i].day;

				//get each database item
				var targetDayArray = database[i]; 
				var nextTargetArray = (database[i+1] !== undefined) ? database[i+1] :  false;
				console.log(nextTargetArray);



				if (targetDayArray.startTime === targetTime){
					days[targetDay].items.push(targetDayArray);
					console.log("push in");

					if (nextTargetArray !== false){
							//check start time is same as targettime
						if(nextTargetArray.starttime > targetTime){
							targetTime = targetTime + 100;
						}
					}

				}else{

					for (var p = 800; p < 2000 ; p=p+100){
	
						//get the starttime of the object
						if (targetDayArray.startTime === targetTime){
							days[targetDay].items.push(targetDayArray);
							console.log("push in");
						}else{
							var arrrayToAdd = {"id": 0, 
										       "name": "free", 
										       "description": "nothing", 
										       "user": 1, 
										       "startTime": targetTime, 
										       "endTime": targetTime, 
										       "day": targetDay};
	
							days[targetDay].items.push(arrrayToAdd);
					
						}
	
						if (nextTargetArray !== false){
								//check start time is same as targettime
							if(nextTargetArray.starttime > targetTime){
								targetTime = targetTime + 100;
							}
						}
						//if start time is === target time, add the item
						//else if start time is > than target time then recursive, keep adding to target time.
					}//end inner for					

				}


/*				while(contloop){

					if(targetDayArray.startTime !== targetTime){
						var arrrayToAdd = {"id": 0, 
									       "name": "free", 
									       "description": "nothing", 
									       "user": 1, 
									       "startTime": targetTime, 
									       "endTime": targetTime, 
									       "day": targetDay};

						days[targetDay].items.push(arrrayToAdd);
						
						if(database[1].startTime === targetTime){
							contloop = false;
						}else{
							targetTime += 100;
						}

					}else{
						days[targetDay].items.push(targetDayArray);
						if(database[1].startTime === targetTime){
							contloop = false;
						}else{
							targetTime += 100;
						}
					}

				}//end while
*/
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




/*

	while(contloop){
		if(targetDayArray.startTime !== targetTime){
			var arrrayToAdd = {"id": 0, 
						       "name": "free", 
						       "description": "nothing", 
						       "user": 1, 
						       "startTime": targetTime, 
						       "endTime": targetTime, 
						       "day": targetDay};
			days[targetDay].items.push(arrrayToAdd);
			
			if(database[1].startTime === targetTime){
				contloop = false;
			}else{
				targetTime += 100;
			}
		}else{
			days[targetDay].items.push(targetDayArray);
			if(database[1].startTime === targetTime){
				contloop = false;
			}else{
				targetTime += 100;
			}
		}
	}
*/
