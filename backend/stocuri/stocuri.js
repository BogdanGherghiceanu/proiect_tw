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

    constructor() {

    }

    inregistrareAPI(req, res, mySQLStocuri) {
        try {
            //verificam metoda de apelare
            if (req.method != 'POST' || req.headers.dataComanda == null || req.headers.detalii == null || req.headers.numeFurnizor == null) {
                throw 'bad request'
            }
            //extragem datele 
            var comandaFurnizor = new ComandaFurnizor()
            comandaFurnizor.dataComanda = req.headers.dataComanda
            comandaFurnizor.detalii = req.headers.detalii
            comandaFurnizor.numeFurnizor = req.headers.numeFurnizor
            mySQLStocuri.inregistrare(comandaFurnizor, (result) => {
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
            console.log('[comanda furnizor]nu a putut fii creata, nu au fost completate toate campurile');

            errorRequest.err400(res);

        }
    }

    getById(req, res, mySQLStocuri) {
        //daca utilizatorul este angajat poate vizualiza toate fisele
        //                      -client poate vizualiza doar fisele sale

        try {
            //verificam metoda de apelare
            if (req.method != 'GET' || req.headers.comandaid == null) {
                throw 'bad request'
            }


            mySQLStocuri.getByIdAngajat(req.headers.comandaid, (found, fisaService) => {
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


    getAllDocuments(req, res, mySQLStocuri) {
        //daca utilizatorul este angajat poate vizualiza toate fisele
        //                      -client poate vizualiza doar fisele sale

        try {
            //verificam metoda de apelare
            if (req.method != 'GET' || req.headers.comandaid == null) {
                throw 'bad request'
            }


            mySQLStocuri.getById(req.headers.comandaid, (found, fisaService) => {
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


}