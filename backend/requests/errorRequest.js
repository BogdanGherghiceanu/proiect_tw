function err404(res) {
    res.writeHead(404, "Resurce Not Found");
    res.end('404: Resurce Not Found');

}

function err400(res) {
    res.writeHead(400, "Bad Request");
    res.end('400: Bad Request');

}

function err500(res) {
    res.writeHead(500, "Internal Server Error");
    res.end('500: Internal Server Error');

}

function err401(res) {
    res.writeHead(401, "Unauthorized");
    res.end('401 :Unauthorized');

}

<<<<<<< HEAD
module.exports.err400=err400;
module.exports.err401=err401;
module.exports.err404=err404;
module.exports.err500=err500;
=======
module.exports.err400 = err400;
module.exports.err401 = err401;
module.exports.err404 = err404;
module.exports.err500 = err500;
>>>>>>> 16d55bd61a6b804e58c1406005b7f9aa7e3c710e
