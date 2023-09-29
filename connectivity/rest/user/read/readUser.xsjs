/* 26.09.2023 XBERGUN */

const readUserService = $.import("xsdemo.eca.connectivity.core.user.read", "readUser");

function readUser() {
    let sRequestBody = $.request.body ? $.request.body.asString() : undefined;

	try {
	 const allUsers =  readUserService.getAllUsers();
	 let jsonData = JSON.stringify(allUsers);
	 return $.response.setBody(jsonData);
	} catch (err) {
		$.response.status = 400;
		$.response.setBody(err);
	}
}

try {
	switch ($.request.method) {
		case $.net.http.GET || $.net.http.POST:
			readUser();
			break;
		default:
			break;
	}
} catch (err) {
	$.response.status = 400;
	$.response.setBody(err.toString());
}