/* XBERGUN */
const sSchema = "ECA";
const connection = $.hdb.getConnection();

function getNextId(sTableUrl) {
	const sQuery = "SELECT \"" + sSchema + "\".\"" + sTableUrl + "\" .NEXTVAL AS \"ID\" FROM DUMMY";

	try {
		let aQueryResult = connection.executeQuery(sQuery);
		let id = parseInt(aQueryResult[0].ID.toString(), 0);
		return id;
	} catch (err) {
		throw new Error("{\"Message\": \"Could not get next Request  ID. " + err.message + " \" }");
	}
}

function deleteAllRecords(sTable) {
    
	const sQuery = "DELETE \"" + sSchema + "\".\"" + sTable + "\" .NEXTVAL AS \"ID\" FROM DUMMY";

	try {
		connection.executeQuery(sQuery);
        connection.commit();
	} catch (err) {
		throw new Error("{\"Message\": \"Could not get next Request  ID. " + err.message + " \" }");
	}
}