const fs = require('fs');
const path = require('path');

exports.getFile = (file, res) => {

    console.log("getFile: " + file);
    
    fs.readFile(`./${file}`, (error, data) => {
        if (error) {
            res.writeHead(404, { "Content-type": "text/plain" });
            res.end("There was an error serving content!");
        }
        

        switch (path.extname(file)) {
            case ".js":
                res.writeHead(200, { "Content-type": "text/javascript" })
                break
            case ".css":
                res.writeHead(200, { "Content-type": "text/css" })
                break
            case ".svg":
                res.writeHead(200, { "Content-type": "image/svg+xml" })
                break
        }

        res.end(data)
    })
}

exports.sendResponse = (res, data) => {
    if (data.error) {
        res.writeHead(data.code, { "Content-type": "application/json" })
        res.end(JSON.stringify({ data: data }))
    } else {
        res.writeHead(data.code, { "Content-type": "application/json" })
        res.end(JSON.stringify({ data: data }))
    }
}