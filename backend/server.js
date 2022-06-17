
var httpModule = require('http');
const { callLoginApi } = require('./accountManager/loginAPI');
const { callSignUpApi } = require('./accountManager/signupAPI');
const { MySQLAccountManager } = require('./database/MysqlAccountManager');
const { MySQLFisaService } = require('./database/MysqlFisaService');
const config = require('./plugins/config');
const { splitPath } = require('./plugins/UrlSplitter');
const callbacks = require('./requests/callbacks');
const errorRequest = require('./requests/errorRequest');
const login = require('./accountManager/sqlInjection');
const { User } = require('./user/User');
const { FisaServiceAPI } = require('./fisaService/fisaService');
const { fromClientToAngajat, fromAngajatToClient, getListaClienti, deleteUserById } = require('./accountManager/levelOfAccesControl');
require('./user/User');




//tabelele users, tokensLogin
var mySQLAccountManager = new MySQLAccountManager()
var mySQLFisaService = new MySQLFisaService()
var fisaServiceAPI = new FisaServiceAPI()

// server router
var server = httpModule.createServer((req, res) => {
    var path = splitPath(req.url)
    let data = '';
    // req.on('data', chunk => {
    //     data += chunk;
    // })
    // req.on('end', () => {
    //     console.log((data)); // 'Buy the milk'
    //     res.end();
    // })

    console.log(data);

    switch (path.path1) {
        // /login
        case 'login':
            // GET, headers={username: username, password: password}
            // trimitem detalii despre utilizator si un token(campul password) pentru viitoare requesturi
            //raspuns : 200 succes, 400 bad request(contine caractere nepermise sau nu sunt completate toate campurile), 
            //          401 Parola/username gresit.

            callLoginApi(req, res, mySQLAccountManager)
            break;


        // /signUp
        case 'signup':
            //POST, headers = {username, password, nume, prenume, email, telefon} string toate
            //raspuns : 200 succes, 400 bad request(contine caractere nepermise sau nu sunt completate toate campurile), 
            //          401 exista deja un utilizator cu acelasi nume sau email.

            callSignUpApi(req, res, mySQLAccountManager)
            break;

        case 'fisaService':
            if (path.path2 == null) {
                errorRequest.err400(res);
                console.log(`[400] ${req.url} pagina nu a fost gasita`);
            } else {
                switch (path.path2) {

                    // /fisaService/inregistrare
                    // POST, headers = {token, tip_vehicul,marca,model,titlu,descriere,}
                    // 200 succes, 400 bad request(contine caractere nepermise sau nu sunt completate toate campurile), 
                    //401 nu aveti acces (token invalid).

                    case 'inregistrare':
                        fisaServiceAPI.inregistrareAPI(req, res, mySQLFisaService, mySQLAccountManager);
                        break;

                    // fisaService/inregistrare
                    // GET, headers = {token, documentId}
                    // 200 succes, 400 bad request(contine caractere nepermise sau nu sunt completate toate campurile), 
                    //401 nu aveti acces (token invalid).
                    case 'getById':
                        fisaServiceAPI.getById(req, res, mySQLFisaService, mySQLAccountManager);
                        break;

                    // fisaService/inregistrare
                    // GET, headers = {token, documentId}
                    // 200 succes, 400 bad request(contine caractere nepermise sau nu sunt completate toate campurile), 
                    //401 nu aveti acces (token invalid).    
                    case 'getAllDocuments':
                        fisaServiceAPI.getAllDocuments(req, res, mySQLFisaService, mySQLAccountManager);
                        break;

                    case 'deleteDocument':
                        fisaServiceAPI.deleteDocument(req, res, mySQLFisaService, mySQLAccountManager);
                        break;
                    default:
                        errorRequest.err400(res);
                        console.log(`[400] ${req.url} pagina nu a fost gasita`);
                        break;
                }

            }
            break;

        
        case 'administrator':
            switch (path.path2) {
                // Upgrade de la client la angajat 
                //doar administratorul(grad 0) poate folosi acest api
                // PUT, headers = {token, userid}(id-ul userul caruia i se face upgrade)
                // 200 succes, 400 bad request(contine caractere nepermise sau nu sunt completate toate campurile), 
                //401 nu aveti acces (token invalid).    
                case 'fromClientToAngajat':
                    fromClientToAngajat(req, res, mySQLAccountManager)
                    break;

                //PUT token,userid
                case 'fromAngajatToClient':
                    fromAngajatToClient(req, res, mySQLAccountManager)
                    break;

                //GET token
                case 'listaClienti':
                    getListaClienti(req, res, mySQLAccountManager)
                    break;

                //DELETE token, userid
                case 'deleteUserById':
                    deleteUserById(req, res, mySQLAccountManager)
                    break;
                default:
                    errorRequest.err400(res);
                    console.log(`[400] ${req.url} pagina nu a fost gasita`);
                    break;
            }

            break;


        default:
            errorRequest.err400(res);
            console.log(`[400] ${req.url} pagina nu a fost gasita`);
            break;

    }

});

server.listen(config.PORT);
console.log(`Serverul ruleaza la ${config.URL}:${config.PORT}`);