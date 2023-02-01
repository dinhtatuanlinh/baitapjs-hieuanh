let mysql = require('mysql');
let conn = mysql.createConnection({
    database: 'employee',
    host: "localhost",
    user: "root",
    password: ""
});
function createTables (){
    conn.connect(function (err) {
        if (err) {
            throw err;
        }
        console.log("Connected!");
        let dropEmployeeSql = "DROP TABLE IF EXISTS Employees ";
        conn.query(dropEmployeeSql, function (err, results) {
            if (err) throw err;
            console.log("Table EMPLOYEES dropped");
        });
        let createEmployeeSql = "CREATE TABLE Employees " +
            " (Id INT not null, " +
            " Full_Name VARCHAR(255) not null, " +
            " Department VARCHAR(255) not null, " +
            " Hire_Date DATE not null, " +
            " Role INT not null, " +
            " Created_at DATE not null, " +
            " Updated_at DATE, " +
            " Deleted_at DATE, " +
            " PRIMARY KEY (Id) )";
        conn.query(createEmployeeSql, function (err, results) {
            if (err) throw err;
            console.log("Table Employees created");
        })

        let dropRolesSql = "DROP TABLE IF EXISTS Roles ";
        conn.query(dropRolesSql, function (err, results) {
            if (err) throw err;
            console.log("Table Roles dropped");
        });
        let createRolesSql = "CREATE TABLE Roles " +
            " (Id INT not null, " +
            " Name VARCHAR(255) not null, " +
            " Created_at DATE not null, " +
            " Updated_at DATE, " +
            " Deleted_at DATE, " +
            " PRIMARY KEY (Id) )";
        conn.query(createRolesSql, function (err, results) {
            if (err) throw err;
            console.log("Table Roles created");
        })

        let dropWorkSql = "DROP TABLE IF EXISTS Work ";
        conn.query(dropWorkSql, function (err, results) {
            if (err) throw err;
            console.log("Table Roles dropped");
        });
        let createWorkSql = "CREATE TABLE Work " +
            " (Id INT not null, " +
            " Employee_id INT not null, " +
            " Works INT not null, " +
            " Created_at DATE not null, " +
            " Updated_at DATE, " +
            " Deleted_at DATE, " +
            " PRIMARY KEY (Id) )";
        conn.query(createWorkSql, function (err, results) {
            if (err) throw err;
            console.log("Table Work created");
        })

        let dropOptionsSql = "DROP TABLE IF EXISTS Options ";
        conn.query(dropOptionsSql, function (err, results) {
            if (err) throw err;
            console.log("Table Options dropped");
        });
        let createOptionsSql = "CREATE TABLE Options " +
            " (Id INT not null, " +
            " Name VARCHAR(255) not null, " +
            " Value VARCHAR(255) not null, " +
            " Created_at DATE not null, " +
            " Updated_at DATE, " +
            " Deleted_at DATE, " +
            " PRIMARY KEY (Id) )";
        conn.query(createOptionsSql, function (err, results) {
            if (err) throw err;
            console.log("Table Options created");
        })
    })
}

module.exports = {
    conn: conn,
    createTables: createTables
};