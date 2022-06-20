
const errorRequest = require('./../requests/errorRequest');
const sqlInjection = require('./../accountManager/sqlInjection');
const { defaultMaxListeners } = require('events');


class FisaService {

    constructor(id_client, tip_vehicul, marca, model, titlu, descriere,dataProgramare) {
        this.id_client = id_client;
        this.tip_vehicul = tip_vehicul;
        this.marca = marca;
        this.model = model;
        this.titlu = titlu;
        this.descriere = descriere;
        this.dataProgramare=dataProgramare
    }
    setCreationDate(date) {
        this.creation_date = date
    }
    setId(id) {
        this.id = id
    }

}


class FisaServiceAPI {
    constructor() {

    }

    inregistrareAPI(req, res, mySQLFisaService, mySQLAccountManager) {
        try {
            //verificam metoda de apelare
            if (req.method != 'POST' || req.headers.token == null) {
                throw 'bad request'
            }
            var token = req.headers.token
            if (sqlInjection.verificaToken(token)) {
                //obtinem id-ul userului pe baza tokenului
                mySQLAccountManager.getIdFromToken(token, (userid) => {
                    //nu este un token valid
                    if (userid == -1) {
                        errorRequest.err401(res)
                    }
                    else {

                        //extragem datele 
                        var fisaService = new FisaService(
                            userid,
                            req.headers.tip_vehicul,
                            req.headers.marca,
                            req.headers.model,
                            req.headers.titlu,
                            req.headers.descriere,
                            req.headers.dataProgramare
                        )
                    

                        //verificam antisqlinjection
                        if (sqlInjection.protectionFisaService(fisaService)) {

                            //inregistram fisa service
                            mySQLFisaService.inregistrare(fisaService, (result) => {
                                if (result == 1) {
                                    res.writeHead(200);
                                    res.write('fisa a fost inregistrata')
                                    res.end();
                                } else {
                                    if (result == -1) {
                                        errorRequest.err400(res);
                                    }
                                }
                            });
                        }
                        else {
                            throw '[FisaService]SqlInjection fail';
                        }
                    }
                })
            } else {
                throw '[FisaService]SqlInjection fail';
            }
        } catch (e) {
            console.log(e);
            errorRequest.err400(res);
            console.log(`[FisaService]Fisa nu a putut fii creata, nu au fost completate toate campurile`);
        }
    }

    modificareProgramare(req, res, mySQLFisaService, mySQLAccountManager) {
        try {
            //verificam metoda de apelare
            if (req.method != 'PUT' || req.headers.token == null) {
                throw 'bad request'
            }
            var token = req.headers.token
            if (sqlInjection.verificaToken(token)) {
                //obtinem id-ul userului pe baza tokenului
                mySQLAccountManager.getIdFromToken(token, (userid) => {
                    //nu este un token valid
                    if (userid == -1) {
                        errorRequest.err401(res)
                    }
                    else {

                        var documentID = req.headers.documentid;
                        var programareNoua=req.headers.programarenoua;
                           //inregistram fisa service
                            mySQLFisaService.modificaProgramareFisaService(documentID,programareNoua, (result) => {
                                if (result == 1) {
                                    res.writeHead(200);
                                    res.write('modificarea a fost inregistrata')
                                    res.end();
                                } else {
                                    if (result == -1) {
                                        errorRequest.err400(res);
                                    }
                                }
                            });
                        
                       
                    }
                })
            } else {
                throw '[Modificarea]SqlInjection fail';
            }
        } catch (e) {
            console.log(e);
            errorRequest.err400(res);
            console.log(`[ModificareFisa]Modificarea nu a putut fii inregistrata, nu au fost completate toate campurile`);
        }
    }

    getById(req, res, mySQLFisaService, mySQLAccountManager) {
        //daca utilizatorul este angajat poate vizualiza toate fisele
        //                      -client poate vizualiza doar fisele sale

        try {
            //verificam metoda de apelare
            if (req.method != 'GET' || req.headers.token == null || req.headers.documentid == null) {
                throw 'bad request'
            }

            var token = req.headers.token
            var documentid = req.headers.documentid
            if (sqlInjection.verificaToken(token)) {
                //obtinem id-ul userului pe baza tokenului
                mySQLAccountManager.getIdFromToken(token, (userid) => {
                    //nu este un token valid
                    if (userid == -1) {
                        errorRequest.err401(res)
                        console.log('[FisaService]Acces neautorizat')
                    }
                    else {
                        mySQLAccountManager.getLevelOfAccesFromId(userid, (levelOfAcces) => {
                            if (levelOfAcces < 2) {
                                mySQLFisaService.getByIdAngajat(documentid, (found, fisaService) => {
                                    switch (found) {
                                        case 1:
                                            res.writeHead(200, 'text/json');
                                            res.write(JSON.stringify(fisaService));
                                            res.end();
                                            break;

                                        default:
                                            errorRequest.err400(res)
                                            break;
                                    }
                                })
                            } else {

                                mySQLFisaService.getById(userid, documentid, (found, fisaService) => {
                                    switch (found) {
                                        case 1:
                                            res.writeHead(200, 'text/json');
                                            res.write(JSON.stringify(fisaService));
                                            res.end();
                                            break;

                                        default:
                                            errorRequest.err401(res)
                                            break;
                                    }
                                })
                            }
                        })
                    }
                })
            }
        } catch (e) {
            console.log(e);
            errorRequest.err400(res);
            console.log(`[FisaService]GetDocumentById Nu au fost completate toate campurile`);
        }

    }
    getAllDocuments(req, res, mySQLFisaService, mySQLAccountManager) {

        //daca utilizatorul este angajat poate vizualiza toate fisele
        //                      -client poate vizualiza doar fisele sale

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
                        console.log('[FisaService]Acces neautorizat')
                    }
                    else {
                        mySQLAccountManager.getLevelOfAccesFromId(userid, (levelOfAcces) => {
                            if (levelOfAcces < 2) {
                                mySQLFisaService.getAllDocumentsAngajat((fiseServiceJson) => {

                                    res.writeHead(200, 'text/json');
                                    res.write(JSON.stringify(fiseServiceJson));
                                    res.end();


                                })
                            } else {

                                mySQLFisaService.getAllDocumentsClient(userid, (fiseServiceJson) => {

                                    res.writeHead(200, 'text/json');
                                    res.write(JSON.stringify(fiseServiceJson));
                                    res.end();



                                })
                            }
                        })
                    }
                })
            }
        } catch (e) {
            console.log(e);
            errorRequest.err400(res);
            console.log(`[FisaService]GetDocumentById Nu au fost completate toate campurile`);
        }


    }
    //doar angajatii au acces si trebuie sa nu fie folosite stocuri sau servicii
    deleteDocument(req, res, mySQLFisaService, mySQLAccountManager) {
        try {
            //verificam metoda de apelare
            if (req.method != 'DELETE' || req.headers.token == null || req.headers.documentid == null) {
                throw 'bad request'
            }

            var token = req.headers.token
            var documentid = req.headers.documentid
            if (sqlInjection.verificaToken(token)) {
                //obtinem id-ul userului pe baza tokenului
                mySQLAccountManager.getIdFromToken(token, (userid) => {
                    //nu este un token valid
                    if (userid == -1) {
                        errorRequest.err401(res)
                        console.log('[FisaService]Acces neautorizat')
                    }
                    else {
                        mySQLAccountManager.getLevelOfAccesFromId(userid, (levelOfAcces) => {
                            if (levelOfAcces < 2) {
                                mySQLFisaService.deleteDocument(documentid, (raspuns) => {
                                    switch (raspuns) {
                                        case 1:
                                            res.writeHead(200, 'text/json');
                                            res.write('document sters');
                                            res.end();
                                            break;

                                        default:
                                            errorRequest.err400(res)
                                            break;
                                    }
                                })
                            } else {
                                //nu are acces, doar angajatii pot sterge fise de service
                                errorRequest.err400(res)
                            }
                        })
                    }
                })
            }
        } catch (e) {
            console.log(e);
            errorRequest.err400(res);
            console.log(`[FisaService]GetDocumentById Nu au fost completate toate campurile`);
        }



    }
}

module.exports.FisaServiceAPI = FisaServiceAPI;
module.exports.FisaService = FisaService;