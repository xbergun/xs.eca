/* 25.09.2023 XBERGUN */
const connection = $.hdb.getConnection();
const apiCall = $.import("xsdemo.eca.connectivity.destination", "apiCall");
const sSchema = "ECA";
const sTable = "xsdemo.eca.persistence.user::tables.User";
const util = $.import("xsdemo.eca.connectivity.util", "utilFunctions");
const sUserSequence = "xsdemo.eca.persistence.user::user";

function getAllUser() {
	const LIMIT = 100;
	let users = [];
	let sURL = "/users?limit=" + LIMIT;

	try {

		const response = apiCall.getDataFromAPI(sURL);

		users = users.concat(response.users);

		return users;

	} catch (err) {
		throw err;
	}
}

function insertDbAllUser(allUserData) {
	var sQuery = "INSERT INTO \"" + sSchema + "\".\"" + sTable + "\" VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";

	try {
		connection.executeUpdate(sQuery,
			util.getNextId(sUserSequence),
			allUserData.firstName,
			allUserData.lastName,
			allUserData.age,
			allUserData.gender,
			allUserData.email,
			allUserData.phone,
			allUserData.username,
			allUserData.password
		);
		connection.commit();
	} catch (err) {
		throw err;
	}

}

// bir api üzerinden dummy user verilerini çeker ve hanaya basar.
function createUser() {
    
    util.deleteAllRecords(sTable);
    
	const users = getAllUser();

	for (let i = 0; i < users.length; i++) {
		let userObj = {
			firstName: "",
			lastName: "",
			age: 0,
			gender: "",
			email: "",
			phone: "",
			username: "",
			password: ""
		};
		userObj.firstName = users[i].firstName ? users[i].firstName : null;
		userObj.lastName = users[i].lastName ? users[i].lastName : null;
		userObj.age = users[i].age ? users[i].age : null;
		userObj.gender = users[i].gender ? users[i].gender : null;
		userObj.email = users[i].email ? users[i].email : null;
		userObj.phone = users[i].phone ? users[i].phone : null;
		userObj.username = users[i].username ? users[i].username : null;
		userObj.password = users[i].password ? users[i].password : null;

		if (userObj !== undefined || userObj !== null) {
			insertDbAllUser(userObj);
		}
	}

}