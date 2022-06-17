const { User } = require('../user/User');
const errorRequest = require('../requests/errorRequest');
const sqlInjection = require('./sqlInjection');

function callSignUpApi(req, res, mySQL) {
    try {
        if (req.method != 'POST' || req.headers.username == null || req.headers.password == null || req.headers.email == null) {
            errorRequest.err400(res);
        }
        else {

            //extragem datele utilizatorului
            var user = new User();
            user.username = req.headers.username;
            user.password = req.headers.password;
            user.nume = req.headers.nume;
            user.prenume = req.headers.prenume;
            user.email = req.headers.email;
            user.telefon = req.headers.telefon;

            //verificam ca datele sa nu contina caractere nepermise
            if (sqlInjection.protectionSignUp(user)) {

                //verificam sa nu existe deja un utilizator
                mySQL.checkForExistingUser(mySQL, user, (user, status) => {

                    //1- exista deja un utilizator cu acelasi nume sau email | 0 - nu
                    if (status == 1) {
                        errorRequest.err401(res);
                        console.log(`[SIGNUP] ${user.username} sau ${user.email} sunt deja inregistrate`);
                    }
                    else {
                        mySQL.signUp(user, (status, user) => {

                            //Inregistrarea a fost efectuata cu succes
                            console.log(`[SIGNUP] ${user.username}  ${user.email} a fost inregistrat`);
                            res.writeHead(200, { 'Content-Type': 'text/json' });
                            res.write('Inregistrat cu succes')
                            res.end();

                        })
                    }
                })

            }
            else {
                errorRequest.err400(res)
                console.log("[SIGNUP]caractere invalide");
            }
        }
    } catch (err) {
        console.log(err);

    }
}


module.exports.callSignUpApi = callSignUpApi;