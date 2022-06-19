var mysql = require('mysql')
const { DateSimplified } = require('../plugins/dateProccesing')
const { FisaService } = require('../fisaService/fisaService')

class MySQLActualizariFisaService {
    constructor() {
        this.con = mysql.createConnection({
            host: "35.223.121.14",
            user: "administrator",
            password: "ParolapentruTW",
            database: "twproject"
        });
    }

    insertActualizare(actualizareFsaService, callback) {
        try {
            var curentDateString = new DateSimplified();
            actualizareFsaService.setCreationDate(curentDateString.getCurrentString());
            var sql = ` \
        INSERT INTO detaliiFisaService ( \
            id_fisa,id_user,titlu ,descriere ,status,dataActualizarii) \
          VALUES \
          (${actualizareFsaService.id_fisa},${actualizareFsaService.id_user},'${actualizareFsaService.titlu}','${actualizareFsaService.descriere}','${actualizareFsaService.status}','${actualizareFsaService.dataActualizarii}')`;


            this.con.query(sql, function (err, result) {

                if (err) {
                    console.log(err);
                    callback(-1)

                    throw 'err';
                } else {

                    console.log(`[ActualizareFisaService] A fost adaugata o actualizare pentru fisa id: ${actualizareFsaService.id_fisa}`);
                    callback(1)
                }
            });
        } catch (e) {
            console.log(e);
            callBackAfterRegisterFisaService(-1)
        }
    }

    getActualizariForDocumentID(id_fisa, callbackGetDocuments){
  
            this.con.query(`SELECT id_fisa,id_user,titlu ,descriere ,status,dataActualizarii FROM detaliiFisaService WHERE id_fisa=${id_fisa} `, function (err, result, fields) {
                if (err) 
                {   
                    callback(0,'')
                    throw err;
                }
                var resultString = JSON.stringify(result)
                var resultJson = JSON.parse(resultString)
                
                
                callbackGetDocuments(1, resultJson)
            });
        
    }

    createTable() {
        var sql = " \
      CREATE TABLE `detaliiFisaService` ( \
    	`id` INT NOT NULL AUTO_INCREMENT,\
    	`id_fisa` INT,\
        `id_user` INT,\
    	`titlu` VARCHAR(255),\
        `descriere` VARCHAR(255),\
        `status` VARCHAR(255),\
        `dataActualizarii` VARCHAR(255),\
    	PRIMARY KEY (`id`)\
    ) ";
        this.con.query(sql, function (err, result) {
            if (err)
                console.log(err);
            console.log("created");
            console.log(result);
        });
    }

}

module.exports.MySQLActualizariFisaService = MySQLActualizariFisaService