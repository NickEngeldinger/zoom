app.controller('EventsListController', ($scope, $http) => {
	//Using CORS proxy
	$http.get('https://crossorigin.me/https://api.zoomcare.com/zoomapi-service/v2/rest/content/type/event')
		.then(response => {
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