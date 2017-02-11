var mysql = require('mysql');

var connectionMySql = function() {
	return mysql.createConnection({
		host: 'mariadb.cqxvag8vxv01.us-west-2.rds.amazonaws.com',
    	user:'gabrielcastro',
    	password:'gabrielcastro',
    	database: 'MariaDBTest'
	})
};

//wrapper
module.exports = function(){
	return connectionMySql;
}