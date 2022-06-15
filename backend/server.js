// var httpModule = require('http');
// const { MySQLGoogle } = require('./database/mysqlGoogle');
// const config = require('./plugins/config');
// const { splitPath } = require('./plugins/UrlSplitter');
// const callbacks = require('./requests/callbacks');
// const errorRequest = require('./requests/errorRequest');
// const login = require('./user/login');
// const { User } = require('./user/User');
// require('./user/User');


// var mySQLGoogle = new MySQLGoogle()

// var server = httpModule.createServer((req, res) => {
//     path = splitPath(req.url)

//     switch (path.path1) {

//         case 'login':
//             //verificam requestul
//             try {
//                 if (req.method != 'GET' || req.headers.username == null || req.headers.password == null) {
//                     errorRequest.err400(res);
//                     break
//                 }
//                 var user = new User();
//                 user.username = req.headers.username;
//                 user.password = req.headers.password
//                 login.login(mySQLGoogle, user.username, user.password, (found, userReturn) => {
//                     switch (found) {
//                         case -1:
//                             console.log(`[LOGIN]${user.username} sau parola contin caractere invalide`);
//                             errorRequest.err400(res)
//                             break;
//                         case 0:
//                             console.log(`[LOGIN]${user.username} nu a fost gasit sau a introdus o parola gresita`)
//                             errorRequest.err401(res)
//                             break;
//                         case 1:
//                             console.log(`[LOGIN] ${user.username} a fost gasit`)
//                             userReturn.password = ""

//                             res.writeHead(200, { 'Content-Type': 'text/json' });
//                             res.write(JSON.stringify(userReturn))
//                             res.end();
//                             break;

//                     }
//                 })

//             }
//             catch (err) {
//                 console.log(err);
//                 errorRequest.err400(res);
//                 break;
//             }

//         case 'signup':
//             try {
//                 if (req.method != 'GET' || req.headers.username == null || req.headers.password == null) {
//                     errorRequest.err400(res);
//                     break
//                 }
//                 var user = new User();
//                 user.username = req.headers.username;
//                 user.password = req.headers.password;
//                 user.nume = req.headers.nume;
//                 user.prenume = req.headers.prenume;
//                 user.email = req.headers.email;
//                 user.telefon = req.headers.telefon;
//                 mySQLGoogle.check(mySQLGoogle,user,(user,status)=>{
//                     if(status==1){
//                         console.log("Exista");
//                     }
//                     else{
//                         console.log("nu exista");
//                         mySQLGoogle.signUp(user,(status,user)=>{
//                             console.log("mergeee!!!!!!!!!!");

//                         })
//                     }
//                 })




//             } catch (err) {
//     console.log(err);
//     errorRequest.err400(res);
// }

// break;

//         default:
// console.log("default");
// break;

//     }

// });
// mySQLGoogle.getAllUsers();
// server.listen(config.PORT);
// console.log(`Serverul ruleaza la ${config.URL}:${config.PORT}`);

var httpModule = require('http');
const config = require('./plugins/config');

const { MySQLGoogle } = require('./database/mysqlGoogle');

const router = require('./Router/router')
httpModule.createServer(router.handle).listen(config.PORT)

var mySQLGoogle = new MySQLGoogle()
mySQLGoogle.getAllUsers();

console.log(`Serverul ruleaza la ${config.URL}:${config.PORT}`);