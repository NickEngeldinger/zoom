const app = angular.module('zoomEvents', ['angular.filter']);
app.controller('EventsListController', ($scope, $http) => {
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
app.filter('trustedHtml', ($sce) => $sce.trustAsHtml);
app.filter('timeFormat', ($filter) => {
	return (time) => {
		let d;
		time !== undefined ? d = new Date('January 1, 2001 ' + time + ':00') : d = '';
		return d;
	}
});
app.filter('dateSuffix', function($filter) {
  var suffixes = ["th", "st", "nd", "rd"];
  return function(input) {
    var dtfilter = $filter('date')(input, 'MMMM dd');
    var day = parseInt(dtfilter.slice(-2));
    var relevantDigits = (day < 30) ? day % 20 : day % 30;
    var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    return dtfilter+suffix;
  };
});