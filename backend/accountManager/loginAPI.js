const { User } = require('../user/User');
const errorRequest = require('../requests/errorRequest');
const sqlInjection = require('./sqlInjection');

function callLoginApi(req, res, mySQL) {
    try {

        //verificam metoda si sa fie completate headerele
        if (req.method != 'POST' || req.headers.username == null || req.headers.password == null) {
            errorRequest.err400(res);
        } else {
            //extragem datele din Headers
            var user = new User();
            user.username = req.headers.username;
            user.password = req.headers.password
        
            //verificam ca datele sa nu contina caractere nepermise
            if (sqlInjection.protectionSignIn(user)) {

                //verificam datele in baza de date
                mySQL.login(user.username, user.password, (found, userReturn) => {
                    switch (found) {
                        //nu a fost gasit
                        case 0:
                            console.log(`[LOGIN]${user.username} nu a fost gasit sau a introdus o parola gresita`)
                            errorRequest.err401(res)
                            break;
                        //a fost gasit userul si generam un token pe care il trimitem userului
                        case 1:
                            console.log(`[LOGIN] ${user.username} a fost gasit`)
                            mySQL.signInGetToken(user, (token) => {
                                userReturn.password = token
                                res.writeHead(200, { 'Content-Type': 'text/json' });
                                res.write(JSON.stringify(userReturn))
                                res.end();
                            })
                            break;
                        default:
                            errorRequest.err401(res);
                            break;
                    }
                })
            }
            else {
                //datele contin caractere nepermise
                console.log(`[LOGIN]${user.username} sau parola contin caractere invalide`);
                errorRequest.err400(res);
            }
        }
    }
    catch (err) {
        console.log(err);
        errorRequest.err400(res);
    }
}

module.exports.callLoginApi=callLoginApi;