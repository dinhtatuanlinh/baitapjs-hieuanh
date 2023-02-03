let http = require("http"); // thư viên http để tạo server
// cần 2 thư viện là url và querystring để lấy cái biến mà từ user gửi lên
let url = require('url');
let queryString = require("querystring")
let connection = require("./database/connection")

let dataInDBExisting = true;//if data has already created in database this var is true else this var is false
if (!dataInDBExisting) {
    connection.createTables()
}

// google.com
// let app = require(__pathFrameWork + 'app')
// truyền vào 1 hàm callback vào hàm http.createServer(callback)
// callback có 2 biến truyền vào là request và response
let service = http.createServer(function (req, res) {

    const parsed = url.parse(req.url);
    // req.url = google.com?search=book&date=20/10&...
    // hàm queryString.parse chỉ có thể lấy dữ liêu bằng phương thức get
    let params = queryString.parse(parsed.query)
    // phương thức queryString.parse sẽ bóc biến search mà user lên lấy giá trị của biến
    // console.log(params)
    // let a = parsed.search
    // console.log(req.url);

    // // midleware()
    // truy cập vào service có vài phương thức để truy cập
    // method 1 GET dùng để lấy dữ liệu 
    // truyền dữ liệu cảu method get là qua url google.com?search=book
    // search tên của biến truyền vào còn book là giá trị cảu biến
    // method 2 POST dùng để update và delete dữ liệu
    // nhập url vào trình duyệt thì phương sẽ get
    // dữ liệu mà truyền quà phương thức get thì ko được mã hóa không an toàn
    // do vây với dữ liệu mà cần bảo mật thì mình dùng phương thức post
    if (req.method === 'GET') {
        // google.com/
        // biến parsed.pathname = /
        // nếu mà google.com/get-employee
        // thì parsed.pathname trả ra /get-employee
        switch (parsed.pathname) {
            case "/":
                console.log('123');
                // connection.createEmployee()
                // báo cho trình duyệt biết là server đã làm xong việc bằng 2 hàm res.writeHead và res.end()
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end()
                break
            case "/get-employee":
                let cmt = params.cmt
                let name = params.name
                let from = params.from
                let to = params.to
                // console.log(cmt, name, from, to)
                // let result = await connection.getEmployees('073089014094')
                connection.getEmployees(cmt, name, from, to).then(result=>{
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify(result))
                }).catch(err =>{
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify(err))
                })

                break
            case "/get-average-salary-in-month":
                let month = parseInt(params.month)
                let year = parseInt(params.year)
                connection.getWorkOfEveryEmployeeInMonth(month, year).then(async result=>{
                    console.log(await countAverageSalary(result))
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify(result))
                }).catch(err =>{
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify(err))
                })
                break
            case "/get-email":
                // connection.getEmployeeByCMT('073089014094')
                // kiêm tra dữ liệu gửi lên bằng phương thức get
                console.log('############################')
                console.log(params.search)
                console.log('############################')
                console.log('email')
                // data đang ở dang object 
                let data = {
                    email: "dttl@gmail.com"
                }
                console.log(typeof data) // kiểm tra kiểu dữ liệu
                // chuyển dữ liệu từ object thành string (JSON) bằng hàm JSON.stringify
                let StringData = JSON.stringify(data)
                console.log(typeof StringData)
                res.writeHead(200, { 'Content-Type': 'application/json' })
                // truyền dữ liệu kiểu string vào hàm res.end() dữ liệu sẽ được gửi tới trình duyệt
                res.end(StringData)
                break
            case "/weather":
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end('weather')
                break
            case "/users":
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end('users')
                break
            default:
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end("404 not found!!!")
        }
    } else if (req.method === 'POST') {
        switch (parsed.pathname) {
            case "/create-employee":
                console.log("test post method")
                getData(req).then(result => {
                    console.log(result)
                    connection.addWordsToEmployee(result.cmt, result.work)
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end()
                })

                break
            case "/add-work":
                getData(req).then(result => {
                    console.log(result)
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end()
                })
                break
            case "/update-employee":

                break
            case "/delete-employee":

                break

            case "/add-options":
                getData(req).then(result => {
                    console.log(result)
                    connection.addOption(result)
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end()
                })
                break
            case "/register":
                register(req, res)
                break
            default:
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end("404 not found!!!")
        }
    } else if (req.method === "PUT") {

    } else if (req.method === "PATCH") {

    } else if (req.method === "DELETE") {

    }
});


// let Port = normalizePort(process.env.PORT || 8988);
// gọi hàm listen truyền vào số port và 1 hàm ở in ra câu báo server tạo thành công
let port = 9000 // tránh trường hợp magic number 
// trên máy chủ chạy rất nhiều services 
// ví dụ cái service này nó thông ra internet qua cổng 9000 của máy chủ 
service.listen(
    port,
    console.log(
        `service on: http://localhost:${port}`
    )
);
// ví dụ trên máy chủ port 9000 đã có service khác chạy rồi thì service tạo ra sẽ bị lỗi
service.on("error", onError);
// service.on("listening", onListening);


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error) {
        console.log("đã có lỗi")
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
// function onListening() {
//     let addr = service.address();
//     let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
//     console.log("Listening on " + bind);
// }
let user = {
    username: "dinhtatuanlinh",
    password: "123456"
}
function getData(req) {
    return new Promise((resolve, reject) => {
        req.on("data", (chunk) => {

            let str = decodeURIComponent(escape(String.fromCharCode(...chunk)))
            resolve(JSON.parse(str))
        });
    })
}

async function login(req, res) {
    let data = await getData(req)
    console.log(data)
    if (data.username !== user.username && data.password !== user.password) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end("error input")
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(data))
}

function countAverageSalary(data){
    return new Promise((resolve, reject)=>{
        connection.getOptions().then(result=>{
            let baseSalary
            let salaryPerHour
            let salaryPerContract
            result.forEach(element => {
                switch (element.Name) {
                    case "base salary":
                        baseSalary = parseInt(element.Value)
                        break;
                    case "salary per hour":
                        salaryPerHour = parseInt(element.Value)
                        break
                    case "salary per contract":
                        salaryPerContract = parseInt(element.Value)
                        break
                    default:
                        break;
                }
            });
            let totalSalary = 0
            data.forEach(element => {
                switch (element.Role) {
                    case 1:
                        totalSalary += element.Works * salaryPerContract
                        break;
                    case 2:
                        totalSalary += baseSalary + element.Works * salaryPerHour
                        break;
                
                    default:
                        break;
                }
            });
            console.log(typeof data.length)
            let averageSalary = totalSalary / data.length
            resolve(averageSalary)
            console.log(data)
            console.log(result)
        }).catch(err=>{
            console.log(err)
            reject(err)
        })
    })
    
}