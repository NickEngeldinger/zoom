app.controller('eventsList', ($scope, $http) => {
	//Using CORS proxy
	$http.get('https://crossorigin.me/https://api.zoomcare.com/zoomapi-service/v2/rest/content/type/event')
		.then(response => {
			//Some of the data is inconsisent, some instances of 'where' are listed as 
			//+Performance<br>945 NW Lovejoy St, Portland, OR 97209 
			//while others are listed as
			//ZOOM+Performance<br>945 NW Lovejoy St
			//the latter instance conforms with the other ZOOM locations so we'll go with that
			//
			//Also in order to display only the location name in the ng-options we'll add
			//a new 'whereName' property to the object so that we can use the sliced value
			//and omit the address and direction info from the drop down text
			$scope.zEvents = response.data.map((obj) => {
				if (obj.where.startsWith('+')) {
					obj.where = `ZOOM${obj.where.slice(0, -20)}`;
				}
				let where = obj.where.split('<');
				where = where[0].split('(');
				obj.whereName = where[0];
				return obj;
			});
		});

	$scope.remove = (zEvent) => {
		var index = $scope.zEvents.indexOf(zEvent);
		$scope.zEvents.splice(index, 1);
	}

});