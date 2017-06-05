//Angular's date format filter requires a full date so we'll dummy one up
app.filter('timeFormat', ($filter) => {
	return (time) => {
		let d;
		time !== undefined ? d = new Date('January 1, 2001 ' + time + ':00') : d = '';
		return d;
	}
});