var mysql = require('mysql')
class MySQLStocuri {

    constructor() {
        this.con = mysql.createConnection({
            host: "35.223.121.14",
            user: "administrator",
            password: "ParolapentruTW",
            database: "twproject"
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



module.exports.MySQLStocuri=MySQLStocuri