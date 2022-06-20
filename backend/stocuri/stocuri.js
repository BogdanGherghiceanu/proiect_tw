const errorRequest = require('../requests/errorRequest');
class ComandaFurnizor {

    constructor() {
        this.numeFurnizor = ''
        this.dataComanda = ''
        this.detalii = ''
    }

}

class Stocuri {
    constructor() {
        this.cod_produs = 0
        this.nume = ''
        this.descriere = ''
        this.cantitate_ramasa = ''
        this.unitatemasura = ''
        this.pret = ''
    }
}

class MiscariStocuri {
    constructor() {
        this.cod_produs = 0
        this.cantitate = ''
        this.detalii = ''
        this.pret = ''
        this.data = ''
        this.documentid = ''
        this.documentType = ''
    }
}

class StocuriAPI {



    comandaFurnizorinregistrareAPI(req, res, mySQLStocuri) {
        try {
            //verificam metoda de apelare
            if (req.method != 'POST' || req.headers.datacomanda == null || req.headers.detalii == null || req.headers.numefurnizor == null) {
                throw 'bad request'
            }
            //extragem datele 
            var comandaFurnizor = new ComandaFurnizor()
            comandaFurnizor.dataComanda = req.headers.datacomanda
            comandaFurnizor.detalii = req.headers.detalii
            comandaFurnizor.numeFurnizor = req.headers.numefurnizor
            mySQLStocuri.comandaFurnizorinregistrare(comandaFurnizor, (result) => {
                if (result == 1) {
                    res.writeHead(200);
                    res.write('comanda furnizor a fost inregistrata')
                    res.end();
                } else {
                    if (result == -1) {
                        errorRequest.err400(res);
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
            console.log('[comanda furnizor]nu a putut fii creata, nu au fost completate toate campurile');

            errorRequest.err400(res);

        }
    }


    comandaFurnizorinregistrareJSONAPI(req, res, mySQLStocuri) {
        try {
            //verificam metoda de apelare
            if (req.method != 'POST') {
                throw 'bad request'
            }
            //extragem datele 
            var data;
            req.on('data', load => {
                data += load;
            })
            req.on('end', () => {
                console.log((data)); 


                mySQLStocuri.comandaFurnizorinregistrareJSON(data, (result) => {
                    if (result == 1) {
                        res.writeHead(200);
                        res.write('JSON comanda furnizor a fost inregistrata')
                        res.end();
                    } else {
                        if (result == -1) {
                            errorRequest.err400(res);
                        }
                    }
                });
            })
        }
        catch (e) {
            console.log(e);
            console.log('[comanda furnizor]nu a putut fii creata, nu au fost completate toate campurile');

            errorRequest.err400(res);

        }
    }

    comandaFurnizorgetById(req, res, mySQLStocuri) {
        //daca utilizatorul este angajat poate vizualiza toate fisele
        //                      -client poate vizualiza doar fisele sale

        try {
            //verificam metoda de apelare
            if (req.method != 'GET' || req.headers.comandaid == null) {
                throw 'bad request'
            }


            mySQLStocuri.comandaFurnizorgetByIdAngajat(req.headers.comandaid, (found, fisaService) => {
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
        }
        catch (e) {
            console.log(e);
            errorRequest.err400(res);
            console.log(`[getComandaFurnizor] Nu au fost completate toate campurile`);
        }

    }


    comandaFurnizorgetAllDocuments(req, res, mySQLStocuri) {
        //daca utilizatorul este angajat poate vizualiza toate fisele
        //                      -client poate vizualiza doar fisele sale

        try {
            //verificam metoda de apelare
            if (req.method != 'GET') {
                throw 'bad request'
            }


            mySQLStocuri.comandaFurnizorgetAllDocuments((found, fisaService) => {
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
        }
        catch (e) {
            console.log(e);
            errorRequest.err400(res);
            console.log(`[getComandaFurnizor] Nu au fost completate toate campurile`);
        }

    }

    //stocuri


    adaugareStocuri(req, res, mySQLStocuri) {
        try {
            //verificam metoda de apelare
            if (req.method != 'POST' || req.headers.cantitate_ramasa == null || req.headers.unitatemasura == null || req.headers.descriere == null
                || req.headers.nume == null || req.headers.pret == null) {
                throw 'bad request'
            }
            //extragem datele 
            var stocuri = new Stocuri()
            stocuri.cantitate_ramasa = req.headers.cantitate_ramasa
            stocuri.unitatemasura = req.headers.unitatemasura
            stocuri.descriere = req.headers.descriere
            stocuri.nume = req.headers.nume
            stocuri.pret = req.headers.pret
            mySQLStocuri.adaugareStocuri(stocuri, (result) => {
                if (result == 1) {
                    res.writeHead(200);
                    res.write('a fost adaugat un produs nou in stoc')
                    res.end();
                } else {
                    if (result == -1) {
                        errorRequest.err400(res);
                    }
                }
            });
        }
        catch (e) {
            console.log('[stoc]nu a putut fii creata, nu au fost completate toate campurile');

            errorRequest.err400(res);

        }
    }

    stocgetById(req, res, mySQLStocuri) {
        //daca utilizatorul este angajat poate vizualiza toate fisele
        //                      -client poate vizualiza doar fisele sale

        try {
            //verificam metoda de apelare
            if (req.method != 'GET' || req.headers.stocid == null) {
                throw 'bad request'
            }


            mySQLStocuri.stocgetById(req.headers.stocid, (found, fisaService) => {
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
        }
        catch (e) {
            console.log(e);
            errorRequest.err400(res);
            console.log(`[stoc] Nu au fost completate toate campurile`);
        }

    }


    stocGetALL(req, res, mySQLStocuri) {
        //daca utilizatorul este angajat poate vizualiza toate fisele
        //                      -client poate vizualiza doar fisele sale

        try {
            //verificam metoda de apelare
            if (req.method != 'GET') {
                throw 'bad request'
            }


            mySQLStocuri.stocGetALL((found, fisaService) => {
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
        }
        catch (e) {
            console.log(e);
            errorRequest.err400(res);
            console.log(`[stoc] Nu au fost completate toate campurile`);
        }

    }

}


module.exports.StocuriAPI = StocuriAPI
