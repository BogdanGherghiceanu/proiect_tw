var mysql = require('mysql')
const { DateSimplified } = require('../plugins/dateProccesing')
const { FisaService } = require('../fisaService/fisaService')
class MySQLFisaService {

    constructor() {
        this.con = mysql.createConnection({
            host: "35.223.121.14",
            user: "administrator",
            password: "ParolapentruTW",
            database: "twproject"
        });
    }

    inregistrare(fisaService, callBackAfterRegisterFisaService) {
        try{
        var curentDateString = new DateSimplified();
        fisaService.setCreationDate(curentDateString.getCurrentString());
        var sql = ` \
            INSERT INTO fisaService ( \
                id_client,tip_vehicul,marca ,model ,titlu,descriere,dataProgramare,creation_date,status) \
              VALUES \
              (${fisaService.id_client},'${fisaService.tip_vehicul}','${fisaService.marca}','${fisaService.model}','${fisaService.titlu}','${fisaService.descriere}','${fisaService.dataProgramare}','${fisaService.creation_date}','inregistrata')`;

     
        this.con.query(sql, function (err, result) {

            if (err) {
                console.log(err);
                callBackAfterRegisterFisaService(-1)
             
                throw 'err';
            } else {
           
                console.log(`[FisaService] cliend id: ${fisaService.id_client} a creat o fisa service noua `);
                callBackAfterRegisterFisaService(1)
            }
        });
    }catch(e){
        console.log(e);
        callBackAfterRegisterFisaService(-1)
    }

    }

    getById(userid, document_id,callbackGetById){
        this.con.query(`SELECT id,id_client,tip_vehicul,marca ,model , titlu , descriere, creation_date,status FROM fisaService WHERE id = ${document_id} AND id_client = ${userid}`, function (err, result, fields) {
            if (err) throw err;

            var resultString = JSON.stringify(result)
            var resultJson = JSON.parse(resultString)

            var fisaService=new FisaService('','','','','','');
            var found = 0
            try {
                

                fisaService.id=resultJson[0].id;
                fisaService.id_client=resultJson[0].id_client;
                fisaService.tip_vehicul=resultJson[0].tip_vehicul;
                fisaService.marca=resultJson[0].marca;
                fisaService.model=resultJson[0].model;
                fisaService.titlu=resultJson[0].titlu;
                fisaService.descriere=resultJson[0].descriere;
                fisaService.setCreationDate(resultJson[0].creation_date);
                fisaService.dataProgramare=resultJson[0].dataProgramare;
                fisaService.status=resultJson[0].status;
                found=1
            } catch {
                console.log("[MySQLFisaService]fisa service inexistenta sau userul nu acces sa o vizualizeze");
            }
            callbackGetById(found, fisaService)
        });
    }
    updateStatus(status,document_id,callback){
        this.con.query(`UPDATE fisaService SET status = '${status}' WHERE id = ${document_id}`, function (err, result, fields) {
            if (err) throw err;
            if (result.affectedRows) {
                console.log(`[FisaService] statusul documentului id: ${document_id} a fost modificata`);
                callback(1)
            } else {

                console.log(`[FisaService] Documentul cu id: ${document_id} nu exista`);
                callback(0)
            }
        });
    }

    modificaProgramareFisaService(document_id,programareNoua, callback) {

        this.con.query(`UPDATE fisaService SET dataProgramare = '${programareNoua}' WHERE id = ${document_id}`, function (err, result, fields) {
            if (err) throw err;
            if (result.affectedRows) {
                console.log(`[FisaService] Programarea documentului id: ${document_id} a fost modificata`);
                callback(1)
            } else {

                console.log(`[FisaService] Documentul cu id: ${user_id} nu exista`);
                callback(0)
            }
        });
    }

    getByIdAngajat( document_id,callbackGetById){
        this.con.query(`SELECT id, id_client,tip_vehicul,marca ,model , titlu , descriere, creation_date,dataProgramare,status FROM fisaService WHERE id = ${document_id} `, function (err, result, fields) {
            if (err) throw err;

            var resultString = JSON.stringify(result)
            var resultJson = JSON.parse(resultString)

            var fisaService=new FisaService('','','','','','');
            var found = 0
            try {
                

                fisaService.id=resultJson[0].id;
                fisaService.id_client=resultJson[0].id_client;
                fisaService.tip_vehicul=resultJson[0].tip_vehicul;
                fisaService.marca=resultJson[0].marca;
                fisaService.model=resultJson[0].model;
                fisaService.titlu=resultJson[0].titlu;
                fisaService.descriere=resultJson[0].descriere;
                fisaService.dataProgramare=resultJson[0].dataProgramare;
                fisaService.setCreationDate(resultJson[0].creation_date);
                found=1
                fisaService.dataProgramare=resultJson[0].dataProgramare;
                fisaService.status=resultJson[0].status;
            } catch {
                console.log("[MySQLFisaService]fisa service inexistenta");
            }
            callbackGetById(found, fisaService)
        });
    }

    getAllDocumentsAngajat( callbackGetDocuments){
        this.con.query(`SELECT id,id_client,tip_vehicul,marca ,model , titlu , descriere, creation_date, status FROM fisaService `, function (err, result, fields) {
            if (err) throw err;

            var resultString = JSON.stringify(result)
            var resultJson = JSON.parse(resultString)
            
            
            callbackGetDocuments( resultJson)
        });
    }
    getAllDocumentsClient( user_id,callbackGetDocuments){
        this.con.query(`SELECT id,id_client,tip_vehicul,marca ,model , titlu , descriere, creation_date , statusFROM fisaService where id_client=${user_id}`, function (err, result, fields) {
            if (err) throw err;

            var resultString = JSON.stringify(result)
            var resultJson = JSON.parse(resultString)
            
            
            callbackGetDocuments( resultJson)
        });
    }

    deleteDocument(document_id,callBackDelete){
        this.con.query(`DELETE FROM fisaService WHERE id = ${document_id} `, function (err, result, fields) {
            if (err){ 
                callBackDelete(-1);
                throw err;
            }            
            callBackDelete(1)
        });
    }

    //temporary
    createTableFisaServiceDetails() {
        var sql = " \
      CREATE TABLE `fisaService` ( \
    	`id` INT NOT NULL AUTO_INCREMENT,\
    	`id_client` INT,\
    	`tip_vehicul` VARCHAR(255),\
        `marca` VARCHAR(255),\
        `model` VARCHAR(255),\
        `titlu` VARCHAR(255),\
        `descriere` VARCHAR(255),\
    	PRIMARY KEY (`id`)\
    ) ";
        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("created");
            console.log(result);
        });
    }

    describe() {

        var sql = "DESCRIBE fisaService";
        console.log(sql);
        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("created");
            console.log(result);
        });
    }

    alterTable() {
        var sql = 'ALTER TABLE fisaService ADD dataProgamare varchar(50)';
        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("adaugat");
        });
    }

    modifyname() {
        var sql = 'ALTER TABLE fisaService CHANGE COLUMN dataProgamare dataProgramare varchar(50);';
        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("adaugat");
        });
    }


}


// var test = new MySQLFisaService()
// test.modifyname();



module.exports.MySQLFisaService = MySQLFisaService