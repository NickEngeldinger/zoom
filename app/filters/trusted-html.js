//Angular sanitizes data by default, we need this to get <br> tag in our dataset to work
app.filter('trustedHtml', ($sce) => $sce.trustAsHtml);