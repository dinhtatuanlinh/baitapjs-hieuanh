let mysql = require('mysql');
let conn = mysql.createConnection({
    database: 'employee',
    host: "localhost",
    user: "root",
    password: ""
});
function createTables() {
    return new Promise((resolve, reject)=>{
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
                " (Id INT not null AUTO_INCREMENT," +
                " CMT VARCHAR(255) not null, " +
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
    
            let dropWorkSql = "DROP TABLE IF EXISTS Work ";
            conn.query(dropWorkSql, function (err, results) {
                if (err) throw err;
                console.log("Table Roles dropped");
            });
            let createWorkSql = "CREATE TABLE Work " +
                " (Id INT not null AUTO_INCREMENT, " +
                " CMT VARCHAR(255) not null, " +
                " Works INT not null, " +
                " Date DATE not null, " +
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
                " (Id INT not null AUTO_INCREMENT, " +
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
    
            addOption([
                {
                    name: "base salary",
                    value: "2000000"
                },
                {
                    name: "salary per hour",
                    value: "200000"
                },
                {
                    name: "salary per contract",
                    value: "200000"
                }
            ])
        })
        resolve("sucessfully")
    })
    
}


function createEmployee(cccd, name, department, hireDate, role) {
    let date = new Date()
    let createdAt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    let createEmployeeSql = `INSERT INTO employees (CMT, Full_Name, Department, Hire_Date, \`Role\`, Created_at)` +
        ` VALUES('${cccd}', '${name}', '${department}',  '${hireDate}', ${role}, '${createdAt}');`
    conn.query(createEmployeeSql, function (err, results) {
        if (err) throw err;
        console.log("insert sucessfully!");
    })
}
function updateEmployee() {
    let cccd = "073089014094"
    let name = "nguyen van b"
    let deparment = "DU11"
    let hireDate = '2021-10-1'
    let role = PARTTIME
    let date = new Date()
    let updatedAt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    let updateEmployeeSql = `UPDATE employees  SET Full_Name = '${name}', Updated_at = '${updatedAt}' WHERE CMT = '${cccd}';`
    conn.query(updateEmployeeSql, function (err, results) {
        if (err) throw err;
        console.log("update sucessfully!");
    })
}
function getEmployees(cmt, name, from, to) {
    let query

    if (cmt != ''){
        query = `SELECT * FROM employees WHERE CMT = '${cmt}' AND Deleted_at IS NULL;`
    } else if(name != ''){
        query = `SELECT * FROM employees WHERE Full_Name = '${name}' AND Deleted_at IS NULL;`
    }else if( from != '' && to != ''){
        query = `select * from employees where Deleted_at IS NULL AND Hire_Date BETWEEN '${from}' AND '${to}' ;`
    }
    console.log(query)
    // xử lý bất đồng bộ bằng Promise
    return new Promise((resolve, reject)=>{
        conn.query(query, (err, result, fields) => {
            if (err) reject(err)
            console.log(`get employee successfully`);
            resolve(result) 
        });
    })
    
}

function getAll(tableName){
    let query = `SELECT * FROM ${tableName} WHERE Deleted_at IS NULL;`
    console.log(query)
    // xử lý bất đồng bộ bằng Promise
    return new Promise((resolve, reject)=>{
        conn.query(query, (err, result, fields) => {
            if (err) reject(err)
            console.log(`get employee successfully`);
            resolve(result) 
        });
    })
}

function addWordsToEmployee(cmt, works, dateOfWork ){
    let date = new Date()
    let createdAt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    let addWordsToEmployeeQuery = `INSERT INTO work (CMT, Works, Date, Created_at)` +
    ` VALUES('${cmt}', ${works}, '${dateOfWork}', '${createdAt}');`
    console.log(addWordsToEmployeeQuery)
    conn.query(addWordsToEmployeeQuery, function (err, results) {
        if (err) throw err;
        console.log("insert sucessfully!");
    })
}

function getWorkOfEveryEmployeeInMonth(month, year){
    let query = `select * from employees INNER JOIN work ON employees.CMT = work.CMT WHERE MONTH(work.Date) = ${month + 1} AND YEAR(work.Date) = ${year} AND employees.Deleted_at IS NULL AND work.Deleted_at IS NULL;`
    console.log(query)
    return new Promise((resolve, reject)=>{
        conn.query(query, (err, result, fields) => {
            if (err) reject(err)
            console.log(`get employee successfully`);
            resolve(result) 
        });
    })
}
function getWorkByCMTPerMonth(cmt, month, year){
    let query = `select * from employees INNER JOIN work ON employees.CMT = work.CMT WHERE employees.CMT = '${cmt}' AND MONTH(work.Date) = ${month + 1} AND YEAR(work.Date) = ${year} AND employees.Deleted_at IS NULL AND work.Deleted_at IS NULL;`
    console.log(query)
    return new Promise((resolve, reject)=>{
        conn.query(query, (err, result, fields) => {
            if (err) reject(err)
            console.log(`get employee successfully`);
            resolve(result) 
        });
    })
}
function getOptions(){
    let query = `SELECT * FROM options;`
    console.log(query)
    return new Promise((resolve, reject)=>{
        conn.query(query, (err, result, fields) => {
            if (err) reject(err)
            console.log(`get employee successfully`);
            // console.log(result)
            resolve(result) 
        });
    })
}
function addOption(data){
    let date = new Date()
    let createdAt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    let value = ''
    data.forEach((element, i) => {
        if ((data.length -1) == i){
            value += `('${element.name}', '${element.value}', '${createdAt}') `
        }else{
            value += `('${element.name}', '${element.value}', '${createdAt}'), `
        }
        
    });
    let query = `INSERT INTO options (Name, Value, Created_at)` +
    ` VALUES ${value};`
    console.log(query)
    conn.query(query, function (err, results) {
        if (err) throw err;
        console.log("insert sucessfully!");
    })
}

// function getWorkOfAnEmployeeByMonth(CMT,)

module.exports = {
    conn: conn,
    createTables: createTables,
    createEmployee: createEmployee,
    updateEmployee: updateEmployee,
    getEmployees: getEmployees,
    getAll: getAll,
    addWordsToEmployee: addWordsToEmployee,
    getWorkOfEveryEmployeeInMonth: getWorkOfEveryEmployeeInMonth,
    getOptions: getOptions,
    addOption: addOption,
    getWorkByCMTPerMonth: getWorkByCMTPerMonth
};

// - tìm kiếm nhân viên theo tên số CMT
// dùng câu sql select * from employees where Full_Name = 'nguyen van a" AND Deleted_at = null để tìm theo tên (có thể dùng INNER JOIN giống ở dưới để lấy lượng công việc của nhân viên theo tháng)
// dùng câu sql select * from employees where CMT = '05413406' AND Deleted_at = null để tìm theo CMT

// - tìm kiếm nhân viên theo thời gian băt đầu làm
// ví dụ tìm từ ngày 1 thang 10 năm 2022 tới 1 thang 11 năm 2022
// dùng câu sql select * from employees where Hire_date BETWEEN '2022-10-1' AND '2022-11-1' AND Deleted_at = null để tìm theo tên

// - tinh trung bình lương của tất cả nhân viên trong khoảng thời gian
// dùng câu 
// câu sql này sẽ nối 2 bảng employees và work lại làm 1 bảng từ đó có thể biết được nhân viên nào làm được bao nhiêu công việc trong tháng 10 năm 2022
// khi có được lượng công việc của từng nhân viên dùng câu lệnh if else để check xem nhân viên đó là biên chế hay thời vụ
//  sau đó lấy dữ liệu từ bàng options ra
// đối với nhân viên biên chế thì lấy lương cơ bản lưu ở bảng options + với số lượng công việc từ kết quả của 2 bảng employees và work ở trên
// nhân với lương của mỗi work làm thêm

// đối với nhân viên thời vụ lấy lương / mỗi hợp đồng trong bảng options nhân với số lượng công việc của nhân viên thời vụ đó từ kết quả
// của 2 bảng employees và work ở trên
// sau khi có được lương của từng nhân viên tính tống rồi chia trung bình

// - câu cuối lấy dữ liệu ở câu trên để tính lương của mỗi người theo từng tháng
