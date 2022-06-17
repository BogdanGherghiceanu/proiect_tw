const { setUncaughtExceptionCaptureCallback } = require("process");
const config = require("../plugins/config")


//verificam daca datele contin doar caracterele permise
function protectionSignIn(user) {
    if (verificaUsername(user.username) && verificaParola(user.password)) {
        return 1
    }
    else {
        return 0
    }
}

function protectionSignUp(user) {
    if (verificaUsername(user.username) &&
        verificaParola(user.password) &&
        verificaText(user.nume) &&
        verificaText(user.prenume)) {
        //verificam telefon
        var numerePermise = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
        for (const chr of user.telefon) {
            if (numerePermise.includes(chr.charCodeAt()) == false) {
                return 0;
            }
        }
        var caracterePermiseEmail = caracterePermise
        caracterePermiseEmail.push(64) // character @
        caracterePermiseEmail.push(46) // character .

        //verificam email
        for (const chr of user.email) {
            if (caracterePermiseEmail.includes(chr.charCodeAt()) == false) {
                return 0
            }
        }
        return 1
    } else {
        return 0
    }
}

function protectionFisaService(fisaService) {
    if (verificaText(fisaService.tip_vehicul) &&
        verificaText(fisaService.marca) &&
        verificaText(fisaService.model) 
        ) {

        return 1;
    } else {
        
        return 0;
    }

}

function verificaToken(token) {
    if (verificaUsername(token)) {
        return 1;
    }
    else {
        return 0;
    }
}
//contine toate caractere de la a-z A-Z 0-9
var caracterePermise = [
    97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107,
    108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
    119, 120, 121, 122, 65, 66, 67, 68, 69, 70, 71,
    72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
    83, 84, 85, 86, 87, 88, 89, 90, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57
]
//vericam daca username si parola folosesc doar caracterele permise [0-9], [a-z], [A-Z] si cele din fisierul de configurare
function verificaUsername(username) {
    var caracterePermiseCopy = caracterePermise;
    var caractereSpecialePermise = config.caracterePermiseUsername
    for (const chr in caractereSpecialePermise) {
        const asciiCodeofChar = chr.charCodeAt()
        caracterePermiseCopy.push(asciiCodeofChar)
    }
    for (const chr of username) {
        if (caracterePermiseCopy.includes(chr.charCodeAt()) == false)
            return 0;
    }
    return 1;
}

function verificaParola(parola) {
    var caracterePermiseCopy = caracterePermise;
    var caractereSpecialePermise = config.caracterePermiseParola
    var i = 0
    while (i < caractereSpecialePermise.length) {


        const asciiCodeofChar = caractereSpecialePermise[i].charCodeAt()
        caracterePermiseCopy.push(asciiCodeofChar)
        i = i + 1
    }

    for (const chr of parola) {
        if (caracterePermiseCopy.includes(chr.charCodeAt()) == false)
            return 0;
    }
    return 1;
}

function verificaText(text) {

    var caracterePermiseCopy = caracterePermise;
    var caractereSpecialePermise = config.caracterePermiseText
    for (const chr in caractereSpecialePermise) {
        const asciiCodeofChar = chr.charCodeAt()
        caracterePermiseCopy.push(asciiCodeofChar)
    }
    for (const chr of text) {
        if (caracterePermiseCopy.includes(chr.charCodeAt()) == false)
            return 0;
    }
    return 1;
}

function genereazaaZ09() {


    var caracterePermise = [];
    //a-z
    var startLoop = 'a'.charCodeAt();
    var stopLoop = 'z'.charCodeAt();
    while (startLoop <= stopLoop) {
        caracterePermise.push(startLoop)
        startLoop += 1;
    }
    //A-Z
    var startLoop = 'A'.charCodeAt();
    var stopLoop = 'Z'.charCodeAt();
    while (startLoop <= stopLoop) {
        caracterePermise.push(startLoop)
        startLoop += 1;
    }
    //0-9
    var startLoop = '0'.charCodeAt();
    var stopLoop = '9'.charCodeAt();
    while (startLoop <= stopLoop) {
        caracterePermise.push(startLoop)
        startLoop += 1;
    }
}



// module.exports.login = login;
module.exports.protectionSignIn = protectionSignIn;
module.exports.protectionSignUp = protectionSignUp;
module.exports.protectionFisaService = protectionFisaService;
module.exports.verificaToken = verificaToken;