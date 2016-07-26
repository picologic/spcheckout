var spr = require('sp-request');
var url = require('url');

module.exports = function(options){
	
	var client = spr.create(options);
	var requestUrl = getCheckoutRequestUrl(options);

	return client.requestDigest(options.siteUrl)
			.then(function(digest) {
				return client.post(requestUrl, {
					headers: {
						"X-RequestDigest": digest
					}
				});
			});
};

function getFileServerRelativeUrl(options) {
	var path = removeTrailingSlash(url.parse(options.siteUrl).path);
	return path + '/' + options.folder + '/' + options.fileName;
}

function getCheckoutRequestUrl(options) {
	var fileUrl = getFileServerRelativeUrl(options);
	var apiPath = '/_api/web/GetFileByServerRelativeUrl(\'' + encodeURIComponent(fileUrl) + '\')/CheckOut()';
	
	return options.siteUrl + apiPath;
}

function removeTrailingSlash(url) {
	return url.replace(/(\/$)|(\\$)/, '');
}