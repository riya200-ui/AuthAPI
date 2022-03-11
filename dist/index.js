"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var routes_1 = __importDefault(require("./src/routes"));
var helmet_1 = __importDefault(require("helmet"));
(function () {
    var _a, _b;
    var app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use((0, helmet_1.default)());
    app.use("/", routes_1.default);
    app.get("/", function (_req, res) {
        res.send(" <div><h1>God bless humanity!</h1></div>  ");
    });
    app.post("/", function (_req, res) {
        res.send(" <div><h1>God bless humanity!</h1></div>  ");
    });
    var URI = (_a = process.env.MONGODB_URL) !== null && _a !== void 0 ? _a : "";
    mongoose_1.default.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }, function (err) {
        if (err)
            throw err;
        console.log("connected to db");
    });
    var PORT = (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 5000;
    app.listen(PORT, function () {
        console.log("server is running on port:".concat(PORT));
    });
})();
//# sourceMappingURL=index.js.map