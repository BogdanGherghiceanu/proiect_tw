const fs = require('fs');

//Citim fisierul cu configurari
let config = {
    "url": "http://127.0.0.1",
    "port": "300"
}
try {

    let rawJson = fs.readFileSync('./config.json');
    config = JSON.parse(rawJson);
} catch (e) {
    console.log(e);
    console.error("[ERROR] Fisierului config.json nu a putut fii deschis, exportam valorile default");
} finally {
    //Exportam datele
    module.exports.URL = config.url;
    module.exports.PORT = config.port;
    module.exports.caracterePermiseUsername = config.caracterePermiseUsername;
    module.exports.caracterePermiseParola = config.caracterePermiseParola;
    module.exports.caracterePermiseText = config.caracterePermiseText;
}