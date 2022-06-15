const { sendResponse } = require('../Utils/utils')
const { User } = require('../user/User');
const { MySQLGoogle } = require('../database/mysqlGoogle');
const errorRequest = require('../requests/errorRequest');
const login = require('../user/login');

var mySQLGoogle = new MySQLGoogle()

exports.loginController = (req, res) => {
    console.log("Ajung aici la login")

    let queryData = ""
    req.on('data', data => queryData += data)
    req.on('end', () => {

        req_user = JSON.parse(queryData)
        console.log(req_user)

        if (req_user.email.length === 0 || req_user.password.length === 0) {
            sendResponse(res, { code: 400, error: true, msg: `Completeaza toate campurile.` })
        }

        var db_user = new User();
        db_user.username = req_user.email;
        db_user.password = req_user.password

        login.login(mySQLGoogle, db_user.username, db_user.password, (found, userReturn) => {
            switch (found) {
                case -1:
                    console.log(`[LOGIN]${db_user.username} sau parola contin caractere invalide`);
                    errorRequest.err400(res)
                    break;
                case 0:
                    console.log(`[LOGIN]${db_user.username} nu a fost gasit sau a introdus o parola gresita`)
                    errorRequest.err401(res)
                    break;
                case 1:
                    console.log(`[LOGIN] ${db_user.username} a fost gasit`)
                    sendResponse(res, { code: 200, error: false, msg: "Success"})
                    break;
            }
        })
    })
}