const homeController = require("../Controller/homeController");
const userProfileController = require("../Controller/userProfileController");
const login = require("../Controller/loginController");

const {getFile} = require("../Utils/utils");

let routes = {
    GET: {},
    POST: {},
};

route_get = (url, action, middleware) => {
    routes["GET"][url] = action;
}

route_post = (url, action, middleware) => {
    routes["POST"][url] = action;
};

//GET routes
route_get("/", homeController);
route_get("/pages/index.html", homeController);
route_get("/pages/userProfile.html", userProfileController);

//POST routes
route_post("/api/login", login.loginController);
route_post("/pages/userProfile.html", userProfileController);


//STATIC FILES
//CSS
route_get("/pages/style/nav.css", (req, res) => getFile("../pages/style/nav.css", res));
route_get("/pages/style/homepage.css", (req, res) => getFile("../pages/style/homepage.css", res));
route_get("/pages/style/userProfile.css", (req, res) => getFile("../pages/style/userProfile.css", res));

//JS
route_get("/pages/js/homePage.js", (req, res) => getFile("../pages/js/homePage.js", res));
route_get("/pages/js/login.js", (req, res) => getFile("../pages/js/login.js", res));
route_get("/pages/js/userProfile.js", (req, res) => getFile("../pages/js/userProfile.js", res));

//IMAGES
route_get("/pages/resources/index/1.png", (req, res) => getFile("../pages/resources/index/1.png", res));
route_get("/pages/resources/index/2.png", (req, res) => getFile("../pages/resources/index/2.png", res));
route_get("/pages/resources/index/3.png", (req, res) => getFile("../pages/resources/index/3.png", res));
route_get("/pages/resources/userProfile/bike_icon.png", (req, res) => getFile("../pages/resources/userProfile/bike_icon.png", res));
route_get("/pages/resources/userProfile/calendar_icon.png", (req, res) => getFile("../pages/resources/userProfile/calendar_icon.png", res));
route_get("/pages/resources/navbar/tyre.png", (req, res) => getFile("../pages/resources/navbar/tyre.png", res));

const url_param_check = (url) => {
    let id = "";
    Object.keys(routes["GET"]).forEach((e) => {
        if (url.includes(e) && e.length > 2) {
            id = url.replace(`${e}`, "");
            url = e;
        }
    });
    //slice the '/'
    return {url, id: id.slice(1)};
};

exports.handle = (req, res) => {
    try {
        const url_param = url_param_check(req.url);

        if (url_param.id) req.url = url_param.url;

        if (routes[req.method][req.url]) {
            routes[req.method][req.url](req, res, url_param.id);
        } else {
            res.writeHead(404, { "Content-type": "text/plain" });
            res.end("<h1>Nu am gasit pagina </h1>");
        }
    } catch (ex) {
        console.log("error: " + ex);
    }
};