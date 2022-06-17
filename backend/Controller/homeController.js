const utils = require("../Utils/utils");

const homeController = (req, res) => {
    // console.log(req.headers.cookie);
    res.writeHead(200, { "Content-Type": "text/html" });
    utils.getFile("../pages/index.html", res);
};

module.exports = homeController;