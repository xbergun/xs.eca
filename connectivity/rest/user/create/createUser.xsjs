const createUserService = $.import("xsdemo.eca.connectivity.core.user.create", "createUser");

function createUser() {
	try {
		createUserService.createUser();

	} catch (err) {
		$.response.status = 400;
		$.response.setBody(err.toString());
	}

}

try {
	switch ($.request.method) {
		case $.net.http.GET:
			createUser();
			break;
		default:
			break;
	}
} catch (err) {
	$.response.status = 400;
	$.response.setBody(err.toString());
}