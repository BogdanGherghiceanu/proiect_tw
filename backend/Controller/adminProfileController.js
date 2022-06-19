const utils = require("../Utils/utils");

const adminProfileController = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    utils.getFile("../pages/adminProfile.html", res);
};

module.exports = adminProfileController;