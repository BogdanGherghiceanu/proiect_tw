var mysql = require('mysql');
var User = require('../user/User')


class MysqlGoogle {
    constructor() {
        this.con = mysql.createConnection({
            host: "35.223.121.14",
            user: "administrator",
            password: "ParolapentruTW",
            database: "twproject"
        });
    }


    addNewUser(user,callbackSignUp) {
        var sql = ` \
      INSERT INTO 'users' ( \
    	'id','username','password','nume' ,'prenume' ,'email','telefon') \
        VALUES \
        ('${this.getNextUserId()}','${user.username}','${user.password}','${user.nume}','${user.prenume}','${user.email}','${user.telefon}')`;

        con.query(sql, function (err, result) {
            if (err) 
            callbackSignUp(0,user)
            return 0;
            console.log(`[MySQL] A fost inregistrat ultilizatorul : ${user.username}','${user.password}','${user.nume}','${user.prenume}','${user.email}','${user.telefon}')`);
            return 1;
            callbackSignUp(1,user)
        });

        return 0;
    }
    getNextUserId() {
        this.con.query("SELECT MAX(id) as max FROM users", function (err, result, fields) {
            if (err) throw err;
            var resultJson = JSON.stringify(result)
            var max = JSON.parse(resultJson)[0].max;
            return max + 1;
        });
    }
    login(username, password, callbackLogin) {
        this.con.query(`SELECT id,username,password,nume ,prenume , email , telefon FROM users WHERE username = '${username}' AND password = '${password}'`, function (err, result, fields) {
            if (err) throw err;

            var resultString = JSON.stringify(result)
            var resultJson = JSON.parse(resultString)

            var user = new User.User()
            var found=0
            try {
                user.id = resultJson[0].id;
                user.username = resultJson[0].username;
                user.password = resultJson[0].password;
                user.nume = resultJson[0].nume;
                user.prenume = resultJson[0].prenume;
                user.email = resultJson[0].email;
                user.telefon = resultJson[0].telefon;
                user.connected = 1;
                found=1
            } catch {
                console.log("[MySQL]Userul nu a fost gasit");
            }
            callbackLogin(found,user)
        });


    }
}
module.exports.MySQLGoogle=MysqlGoogle

// var con = mysql.createConnection({
//     host: "35.223.121.14",
//     user: "administrator",
//     password: "ParolapentruTW",
//     database: "twproject"
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     //   var sql=" \
//     //   CREATE TABLE `users` ( \
//     // 	`id` INT NOT NULL AUTO_INCREMENT,\
//     // 	`username` VARCHAR(32),\
//     // 	`password` VARCHAR(32),\
//     // 	`nume` VARCHAR(32),\
//     // 	`prenume` VARCHAR(32),\
//     // 	`email` VARCHAR(32),\
//     // 	`telefon` VARCHAR(32),\
//     // 	PRIMARY KEY (`id`)\
//     // ) ";

//     //   var sql=" \
//     //   INSERT INTO `users` ( \
//     // 	`id`,`username`,`password`,`nume` ,`prenume` ,`email`,`telefon`) \
//     //     VALUES \
//     //     (0,'administrator','administrator','-','-','gher.bogdan@gmail.com','0712345678')";


//     // con.query(sql, function (err, result) {
//     //     if (err) throw err;
//     //     console.log("recorded");
//     //   });

//     con.query("SELECT * FROM users", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//     });
// });