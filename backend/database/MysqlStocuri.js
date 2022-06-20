var mysql = require('mysql')
const { DateSimplified } = require('../plugins/dateProccesing')
const { FisaService } = require('../fisaService/fisaService')
class MySQLStocuri {

    constructor() {
        this.con = mysql.createConnection({
            host: "35.223.121.14",
            user: "administrator",
            password: "ParolapentruTW",
            database: "twproject"
        });
    }

    comandaFurnizorinregistrare(comandaFurnizor, callback) {

        try {
            var curentDateString = new DateSimplified();
        
            var sql = ` \
                INSERT INTO comandaFurnizor ( \
                    numeFurnizor, detalii, dataComanda) \
                  VALUES \
                  ('${comandaFurnizor.numeFurnizor}','${comandaFurnizor.detalii}','${comandaFurnizor.dataComanda}')`;


            this.con.query(sql, function (err, result) {

                if (err) {
                    console.log(err);
                    callback(-1)

                    throw 'err';
                } else {

                    console.log(`[comandaFurnizor] Furnizor: ${comandaFurnizor.numeFurnizor} a fost inregistrat `);
                    callback(1)
                }
            });
        } catch (e) {
            console.log(e);
            callback(-1)
        }


    }


    comandaFurnizorgetById(document_id, callbackGetById) {
        this.con.query(`SELECT * FROM comandaFurnizor WHERE id = ${document_id}`, function (err, result, fields) {
            if (err) throw err;

            var resultString = JSON.stringify(result)
            var resultJson = JSON.parse(resultString)

            var comandaFurnizor = new ComandaFurnizor();
            var found = 0
            try {
                comandaFurnizor.dataComanda = resultJson[0].dataComanda
                comandaFurnizor.detalii = resultJson[0].detalii
                comandaFurnizor.numeFurnizor = resultJson[0].numeFurnizor

                found = 1
            } catch {
                console.log("[comandaFurnizor] inexistenta");
            }
            callbackGetById(found, fisaService)
        });
    }

    comandaFurnizorgetAllDocuments(callbackGetDocuments) {
        var found = 1
        this.con.query(`SELECT * FROM comandaFurnizor `, function (err, result, fields) {

            if (err) {
                found = 0
                throw err;

            }
            var resultString = JSON.stringify(result)
            var resultJson = JSON.parse(resultString)
            callbackGetDocuments(found, resultJson)
        });
    }
    //stocuri

    adaugareStocuri(stocuri, callback) {

        try {


            var sql = ` \
                INSERT INTO stocuri ( \
                    cantitate_ramasa,unitatemasura,  descriere,nume,pret) \
                  VALUES \
                  (${stocuri.cantitate_ramasa},'${stocuri.unitatemasura}','${stocuri.descriere}','${stocuri.nume}',${stocuri.pret})`;


            this.con.query(sql, function (err, result) {

                if (err) {
                    console.log(err);
                    callback(-1)

                    throw 'err';
                } else {

                    console.log(`[stoc] stoc: ${stocuri.nume} a fost inregistrat `);
                    callback(1)
                }
            });
        } catch (e) {
            console.log(e);
            callback(-1)
        }


    }


    stocgetById(stoc_id, callbackGetById) {
        this.con.query(`SELECT * FROM stocuri WHERE id = ${stoc_id}`, function (err, result, fields) {
            if (err) throw err;

            var resultString = JSON.stringify(result)
            var resultJson = JSON.parse(resultString)

            var comandaFurnizor = new ComandaFurnizor();
            var found = 0
            try {
                comandaFurnizor.dataComanda = resultJson[0].dataComanda
                comandaFurnizor.detalii = resultJson[0].detalii
                comandaFurnizor.numeFurnizor = resultJson[0].numeFurnizor

                found = 1
            } catch {
                console.log("[stocuri] inexistenta");
            }
            callbackGetById(found, fisaService)
        });
    }

    stocGetALL(callbackGetDocuments) {
        var found = 1
        this.con.query(`SELECT * FROM stocuri `, function (err, result, fields) {

            if (err) {
                found = 0
                throw err;

            }
            var resultString = JSON.stringify(result)
            var resultJson = JSON.parse(resultString)
            callbackGetDocuments(found, resultJson)
        });
    }
    createTablecomandaFurnizor() {
        var sql = " \
      CREATE TABLE `comandaFurnizor` ( \
    	`id` INT NOT NULL AUTO_INCREMENT,\
    	`numeFurnizor` VARCHAR(255),\
        `detalii` VARCHAR(255),\
    	PRIMARY KEY (`id`)\
    ) ";
        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("created");
            console.log(result);
        });
    }

    createTableStocuri() {
        var sql = " \
      CREATE TABLE `stocuri` ( \
    	`cod_produs` INT NOT NULL AUTO_INCREMENT,\
    	`nume` VARCHAR(255),\
        `descriere` VARCHAR(255),\
        `cantitate_ramasa` INT,\
        `unitatemasura` VARCHAR(255),\
        `pret` INT,\
    	PRIMARY KEY (`cod_produs`)\
    ) ";
        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("created");
            console.log(result);
        });
    }

    createTable() {
        var sql = " \
      CREATE TABLE `miscariStocuri` ( \
    	`id` INT NOT NULL AUTO_INCREMENT,\
        `cod_produs` INT,\
    	`cantitate` INT,\
        `data` VARCHAR(255),\
        `cantitate_ramasa` INT,\
        `documentid` VARCHAR(255),\
        `documentType` VARCHAR(255),\
        `pret` INT,\
    	PRIMARY KEY (`id`)\
    ) ";
        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("created");
            console.log(result);
        });
    }

}



module.exports.MySQLStocuri = MySQLStocuri