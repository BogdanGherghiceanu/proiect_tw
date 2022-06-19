var mysql = require('mysql');
const { generareToken } = require('../plugins/generateToken');
const { User } = require('../user/User');
const { DateSimplified } = require('../plugins/dateProccesing')

class MySQLAccountManager {
    constructor() {

        this.con = mysql.createConnection({
            host: "35.223.121.14",
            user: "administrator",
            password: "ParolapentruTW",
            database: "twproject"
        });
    }
    //signUP
    signUp(user, callbackSignUp) {



        var curentDateString = new DateSimplified();
        var sql = ` \
            INSERT INTO users ( \
              username,password,nume ,prenume ,email,telefon,last_active, grad) \
              VALUES \
              ('${user.username}','${user.password}','${user.nume}','${user.prenume}','${user.email}','${user.telefon}','${curentDateString.getCurrentString()}',2)`;


        this.con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                callbackSignUp(0, user)
                return 0;
            }


            console.log(`[MySQL] A fost inregistrat ultilizatorul : ${user.username}','${user.password}','${user.nume}','${user.prenume}','${user.email}','${user.telefon}')`);

            callbackSignUp(1, user)
            return 1;
        });




        return 0;
    }

    checkForExistingUser(mysql, user, callbackSignUp) {
        var usernameOrEmailIsUsed = -1
        var sql = `SELECT username FROM users WHERE username = '${user.username}' OR email = '${user.email}'`
        this.con.query(sql, function (err, result, fields) {
            if (err) throw err;
            try {
                var resultJson = JSON.stringify(result)
                var max = JSON.parse(resultJson)[0].users;
                usernameOrEmailIsUsed = 1
            }
            catch (e) {
                usernameOrEmailIsUsed = 0
            }

            if (usernameOrEmailIsUsed == 0) {
                callbackSignUp(user, 0)
            }
            else {
                callbackSignUp(user, 1)
            }
        });
    }

    //Login
    login(username, password, callbackLogin) {
        this.con.query(`SELECT id,username,password,nume ,prenume , email , telefon, last_active, grad FROM users WHERE username = '${username}' AND password = '${password}'`, function (err, result, fields) {
            if (err) throw err;

            var resultString = JSON.stringify(result)
            var resultJson = JSON.parse(resultString)

            var user = new User()
            var found = 0
            try {
                user.id = resultJson[0].id;
                user.username = resultJson[0].username;
                user.password = resultJson[0].password;
                user.nume = resultJson[0].nume;
                user.prenume = resultJson[0].prenume;
                user.email = resultJson[0].email;
                user.telefon = resultJson[0].telefon;
                user.last_active = resultJson[0].last_active;
                user.grad = resultJson[0].grad;
                found = 1
            } catch {
                console.log("[MySQL]Userul nu a fost gasit");
            }
            callbackLogin(found, user)
        });


    }

    //generare token
    signInGetToken(user, callBackSignInWhenTokenIsReady) {
        this.generateNewToken((token) => {
            this.insertToken(user, token, callBackSignInWhenTokenIsReady)
        });
    }
    //user, callBackFunction
    generateNewToken(callBackInsertToken) {

        this.con.query("SELECT token FROM tokensLogin", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            var resultJson = JSON.parse(JSON.stringify(result));
            // console.log(resultJson[0].token);
            var allTokens = []
            for (const line of resultJson) {
                allTokens.push(line.token)
            }
            var token = generareToken(allTokens)
            callBackInsertToken(token)

        });


    }
    insertToken(user, token, callBackSignInWhenTokenIsReady) {
        var sql = `INSERT INTO tokensLogin ( \
            token,username) \
            VALUES \
            ('${token}','${user.username}')`;

        this.con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                return 0;
            }
            console.log(`[TOKEN] a fost generat un token pentr ${user.username} `);
            callBackSignInWhenTokenIsReady(token)
        });
    }

    getLevelOfAccesFromId(id, callback) {
        this.con.query(`SELECT grad FROM users WHERE id='${id}'`, function (err, result, fields) {
            if (err) throw err;
            try {
                var grad = result[0].grad;
                callback(grad)
            }
            catch { callback(10) }
        });

    }

    getIdFromToken(token, callBackToken) {
        this.getUsernameByToken(token, (username) => {
            if (username == -1) {
                callBackToken(-1)
            } else {
                this.getIdByUsername(username, callBackToken)
            }
        })
    }

    getUsernameByToken(token, callback) {
        this.con.query(`SELECT username FROM tokensLogin WHERE token='${token}'`, function (err, result, fields) {
            if (err) throw err;
            try {
                var username = result[0].username;
                callback(username)
            }
            catch { callback(-1) }
        });
    }
    getIdByUsername(username, callBackToken) {
        this.con.query(`SELECT id FROM users WHERE username='${username}'`, function (err, result, fields) {
            if (err) throw err;
            console.log(result)
            var userid = result[0].id;
            console.log(userid);
            callBackToken(userid);
        })
    }

    fromClientToAngajat(user_id, callback) {

        this.con.query(`UPDATE users SET grad = 1 WHERE id = ${user_id}`, function (err, result, fields) {
            if (err) throw err;
            if (result.affectedRows) {
                console.log(`[Administrator] Userul cu id: ${user_id} este acum angajat`);
                callback(1)
            } else {

                console.log(`[Administrator] Userul cu id: ${user_id} nu exista`);
                callback(0)
            }
        });
    }

    fromAngajatToClient(user_id, callback) {

        this.con.query(`UPDATE users SET grad = 2 WHERE id = ${user_id}`, function (err, result, fields) {
            if (err) throw err;
            if (result.affectedRows) {
                console.log(`[Administrator] Userul cu id: ${user_id} este acum client`);
                callback(1)
            } else {

                console.log(`[Administrator] Userul cu id: ${user_id} nu exista`);
                callback(0)
            }
        });
    }

    fromClientToAdministrator(user_id) {

        this.con.query(`UPDATE users SET grad = 0 WHERE id = ${user_id}`, function (err, result, fields) {
            if (err) throw err;
            console.log(`[Administrator] Userul cu id: ${user_id} este acum administrator`);

        });
    }



    //extra
    getNumberOfUsers() {
        this.con.query("SELECT MAX(id) as max FROM users", function (err, result, fields) {
            if (err) throw err;
            var resultJson = JSON.stringify(result)
            var max = JSON.parse(resultJson)[0].max;
            max = max + 1
            return max;
        });
    }

    getAllUsers(callback) {
        this.con.query("SELECT * FROM users", function (err, result, fields) {
            if (err) {
                callback(0, '')
                throw err;
            }
            callback(1, result)
        });
    }

    deleteUserById(userid, callback) {
        var sql = `DELETE FROM users WHERE id=${userid}`;
        this.con.query(sql, function (err, result) {
            if (err) {
                callback(0)
                throw err;
            }
            console.log(`[Administrator]${userid} a fost sters`);
            callback(1)
        });
    }




    //temporary
    createNewTable() {

        var sql = " \
      CREATE TABLE `tokensLogin` ( \
    	`id` INT NOT NULL AUTO_INCREMENT,\
    	`username` VARCHAR(32),\
    	`token` VARCHAR(255),\
    	PRIMARY KEY (`id`)\
    ) ";

        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("created");
        });

    }
    alterTable() {
        var sql = 'ALTER TABLE users ADD last_active varchar(50)';
        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("adaugat");
        });
    }
    alterTable1() {
        var sql = 'ALTER TABLE users ADD grad INT';
        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("adaugat");
        });
    }
    deleteAllUsers() {
        var sql = 'DELETE FROM users WHERE id>0';
        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("delete all users");
        });
    }
    deleteAllTokens() {
        var sql = 'DELETE FROM tokensLogin WHERE id>0';
        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("delete all tokens");
        });
    }
}


module.exports.MySQLAccountManager = MySQLAccountManager
