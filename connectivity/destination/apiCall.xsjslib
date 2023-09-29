const userApiDestination    = $.net.http.readDestination("xsdemo.eca.connectivity.destination", "USERAPI");
const client                = new $.net.http.Client();


function getDataFromAPI(sURL) {
	try {
		var request = new $.net.http.Request($.net.http.GET, sURL);
		request.headers.set('Accept', "application/json");
		request.headers.set('Content-Type', 'application/json');
		var response = client.request(request, userApiDestination).getResponse();
		response = JSON.parse(response.body.asString());
		return response;
	} catch (err) {
		err.functionName = "getDataFromAPI";
		err.functionStep = err.functionStep === undefined ? "" : err.functionStep;
		err.funtionStep = err.functionName + "/getDataFromAPI";
		throw err
	}
}