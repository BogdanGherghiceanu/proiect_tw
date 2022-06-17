const utils = require("../Utils/utils");

const userProfileController = (req, res) => {
    // console.log(req.headers.cookie);
    res.writeHead(200, { "Content-Type": "text/html" });
    utils.getFile("../pages/userProfile.html", res);
};

module.exports = userProfileController;