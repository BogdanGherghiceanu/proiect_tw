const errorRequest = require('./../requests/errorRequest');
const sqlInjection = require('./../accountManager/sqlInjection');
function fromClientToAngajat(req, res, mySQLAccountManager) {
    try {
        //verificam metoda de apelare
        if (req.method != 'PUT' || req.headers.token == null || req.headers.userid == null) {
            throw 'bad request'
        }
       
        var token = req.headers.token
        var userIdForUpgrade = req.headers.userid
        if (sqlInjection.verificaToken(token)) {
            //obtinem id-ul userului pe baza tokenului
            mySQLAccountManager.getIdFromToken(token, (userid) => {
                //nu este un token valid
                if (userid == -1) {
                    errorRequest.err401(res)
                    console.log('[Administrator]Acces neautorizat')
                }
                else {
                    mySQLAccountManager.getLevelOfAccesFromId(userid, (levelOfAcces) => {
                        if (levelOfAcces == 0) {
                           
                            mySQLAccountManager.fromClientToAngajat(userIdForUpgrade, (raspuns) => {
                                
                                switch (raspuns) {
                                    case 1:
                                        res.writeHead(200, 'text/json');
                                        res.write('userul este acum angajat');
                                        res.end();
                                        break;

                                    default:
                                        errorRequest.err400(res)
                                        break;
                                }
                            })
                        } else {
                            //nu are acces, doar administratorul poate crea noi angajati
                            errorRequest.err400(res)
                        }
                    })
                }
            })
        }
    } catch (e) {
        console.log(e);
        errorRequest.err400(res);
        console.log(`[Administrator]from client to angajat nu au fost completate toate campurile`);
    }

}


function fromAngajatToClient(req, res, mySQLAccountManager) {
    try {
        //verificam metoda de apelare
        if (req.method != 'PUT' || req.headers.token == null || req.headers.userid == null) {
            throw 'bad request'
        }
       
        var token = req.headers.token
        var userIdForUpgrade = req.headers.userid
        if (sqlInjection.verificaToken(token)) {
            //obtinem id-ul userului pe baza tokenului
            mySQLAccountManager.getIdFromToken(token, (userid) => {
                //nu este un token valid
                if (userid == -1) {
                    errorRequest.err401(res)
                    console.log('[Administrator]Acces neautorizat')
                }
                else {
                    mySQLAccountManager.getLevelOfAccesFromId(userid, (levelOfAcces) => {
                        if (levelOfAcces == 0) {
                           
                            mySQLAccountManager.fromAngajatToClient(userIdForUpgrade, (raspuns) => {
                                
                                switch (raspuns) {
                                    case 1:
                                        res.writeHead(200, 'text/json');
                                        res.write('userul este acum client');
                                        res.end();
                                        break;

                                    default:
                                        errorRequest.err400(res)
                                        break;
                                }
                            })
                        } else {
                            //nu are acces, doar administratorul poate crea noi angajati
                            errorRequest.err400(res)
                        }
                    })
                }
            })
        }
    } catch (e) {
        console.log(e);
        errorRequest.err400(res);
        console.log(`[Administrator]from client to angajat nu au fost completate toate campurile`);
    }

}



function getListaClienti(req, res, mySQLAccountManager) {
    try {
        //verificam metoda de apelare
        if (req.method != 'GET' || req.headers.token == null) {
            throw 'bad request'
        }
       
        var token = req.headers.token
       
        if (sqlInjection.verificaToken(token)) {
            //obtinem id-ul userului pe baza tokenului
            mySQLAccountManager.getIdFromToken(token, (userid) => {
                //nu este un token valid
                if (userid == -1) {
                    errorRequest.err401(res)
                    console.log('[Administrator]Acces neautorizat')
                }
                else {
                    mySQLAccountManager.getLevelOfAccesFromId(userid, (levelOfAcces) => {
                        if (levelOfAcces == 0) {
                           
                            mySQLAccountManager.getAllUsers( (raspuns,listaClienti) => {
                                
                                switch (raspuns) {
                                    case 1:
                                        res.writeHead(200, 'text/json');
                                        res.write(JSON.stringify(listaClienti));
                                        res.end();
                                        break;

                                    default:
                                        errorRequest.err400(res)
                                        break;
                                }
                            })
                        } else {
                            //nu are acces, doar administratorul poate crea noi angajati
                            errorRequest.err400(res)
                        }
                    })
                }
            })
        }
    } catch (e) {
        console.log(e);
        errorRequest.err400(res);
        console.log(`[Administrator]from client to angajat nu au fost completate toate campurile`);
    }

}

function deleteUserById(req, res, mySQLAccountManager) {
    try {
        //verificam metoda de apelare

        if (req.method != 'DELETE' || req.headers.token == null || req.headers.deleteuserid==null) {
            
            throw 'bad request'
        }
       
        var token = req.headers.token
        var useridforDelete = req.headers.deleteuserid
        if (sqlInjection.verificaToken(token)) {
            //obtinem id-ul userului pe baza tokenului
            mySQLAccountManager.getIdFromToken(token, (userid) => {
                //nu este un token valid
                if (userid == -1) {
                    errorRequest.err401(res)
                    console.log('[Administrator]Acces neautorizat')
                }
                else {
                    mySQLAccountManager.getLevelOfAccesFromId(userid, (levelOfAcces) => {
                        if (levelOfAcces == 0) {
                           
                            mySQLAccountManager.deleteUserById( useridforDelete, (raspuns) => {
                                
                                switch (raspuns) {
                                    case 1:
                                        res.writeHead(200, 'text/json');
                                        res.write('utilizator sters');
                                        res.end();
                                        break;

                                    default:
                                        errorRequest.err400(res)
                                        break;
                                }
                            })
                        } else {
                            //nu are acces, doar administratorul poate crea noi angajati
                            errorRequest.err400(res)
                        }
                    })
                }
            })
        }
    } catch (e) {
        console.log(e);
        errorRequest.err400(res);
        console.log(`[Administrator]deleteuserbyid nu au fost completate toate campurile`);
    }

}
module.exports.fromClientToAngajat = fromClientToAngajat;
module.exports.fromAngajatToClient =fromAngajatToClient
module.exports.getListaClienti =getListaClienti
module.exports.deleteUserById=deleteUserById