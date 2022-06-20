const sqlInjection = require('./../accountManager/sqlInjection');

const errorRequest = require('./../requests/errorRequest');
class ActualizareFisaService {

    constructor() {
        this.id = ''
        this.id_fisa = ''
        this.id_user = ''
        this.titlu = ''
        this.descriere = ''
        this.status = ''
        this.dataActualizarii = ''
    }

    setData(id_fisa, id_user, titlu, descriere, status) {
        this.id_fisa = id_fisa
        this.id_user = id_user
        this.titlu = titlu
        this.descriere = descriere
        this.status = status
    }
    setCreationDate(date) {
        this.dataActualizarii = date
    }
    setId(id) {
        this.id = id
    }

}

class ActualizareFisaServiceAPI {

    inregistrareAPI(req, res, mySQLActualizareFisaService, mySQLAccountManager,mySQLFisaService) {
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
                        var actualizareFisaService = new ActualizareFisaService();
                        actualizareFisaService.setData(req.headers.id_fisa, req.headers.id_user, req.headers.titlu, req.headers.descriere, req.headers.status);
                      
                        //verificam antisqlinjection
                        if (sqlInjection.protectionActualizareFisaService(actualizareFisaService)) {
                        
                            //inregistram fisa service
                            mySQLActualizareFisaService.insertActualizare(actualizareFisaService, (result) => {
                                if (result == 1) {

                                    mySQLFisaService.updateStatus(req.headers.status, req.headers.id_fisa, (result2) => {
                                        
                                        res.writeHead(200);
                                        res.write('fisa a fost inregistrata')
                                        res.end();
                                    })
                                   
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
          
      
            errorRequest.err400(res);
            console.log(`[FisaService]Fisa nu a putut fii creata, nu au fost completate toate campurile`);
        }
    }
    // getActualizariByDocumentID(req, res, mySQLActualizareFisaService, mySQLAccountManager){
    getById(req, res, mySQLActualizareFisaService, mySQLAccountManager) {
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
                        mySQLActualizareFisaService.getActualizariForDocumentID(documentid, (found, fisaService) => {
                            
                            switch (found) {
                                case 1:
                                    console.log('[Actualizari]au fost trimise');
                                    res.writeHead(200, 'text/json');
                                    res.write(JSON.stringify(fisaService));
                                    res.end();
                                    break;

                                default:
                                    errorRequest.err400(res)
                                    break;
                            }
                        })
                    }
                })
            }

        }
        catch (e) {
            console.log(e);
            errorRequest.err400(res);
            console.log(`[FisaService]GetDocumentById Nu au fost completate toate campurile`);
        }


    }
}


module.exports.ActualizareFisaService = ActualizareFisaService;
module.exports.ActualizareFisaServiceAPI = ActualizareFisaServiceAPI