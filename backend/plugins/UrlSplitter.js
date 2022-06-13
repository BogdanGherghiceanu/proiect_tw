const path = {}
function splitPath(pathRaw) {


    var pathSplit = pathRaw.split("/");
    var i = 0;
    for (const element of pathSplit) {
        var elementString = `{"path${i}":"${element}"}`;
        var elementJson = JSON.parse(elementString);
        Object.assign(path, elementJson);
        i = i + 1;
    }
    var lengthString = `{"length":${i}}`;
    var lengthJson = JSON.parse(lengthString);
    Object.assign(path, lengthJson);
    return path;
}

module.exports.splitPath=splitPath;

