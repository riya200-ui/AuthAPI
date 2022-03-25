"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = exports.createActivationToken = exports.userControl = exports.UserControl = void 0;
require("dotenv/config");
var User_1 = __importDefault(require("../models/User"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var SendMail_1 = require("./SendMail");
var UserControl = (function () {
    function UserControl() {
    }
    UserControl.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, email, password, user, passwordHashed, otp, nodeMail, where, newUser, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                        if (!name_1 || !email || !password) {
                            return [2, res.status(400).json({
                                    message: "Please fill in all fields correctly!",
                                    error: true,
                                })];
                        }
                        if (!validateEmail(email)) {
                            return [2, res
                                    .status(400)
                                    .json({ message: "email is invalid!", error: true })];
                        }
                        return [4, User_1.default.findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (user) {
                            return [2, res.status(400).json({
                                    message: "This email has already registered in our database",
                                    error: true,
                                    body: req.body,
                                })];
                        }
                        if (password.length < 6) {
                            return [2, res.status(400).json({
                                    message: "password must be at least 6 characters",
                                    error: true,
                                })];
                        }
                        return [4, bcrypt_1.default.hash(password, 12)];
                    case 2:
                        passwordHashed = _b.sent();
                        otp = Math.floor(100000 + Math.random() * 900000);
                        nodeMail = new SendMail_1.NodeMail();
                        return [4, nodeMail.sendEmail(otp, email)];
                    case 3:
                        _b.sent();
                        where = { email: email };
                        return [4, User_1.default.updateOne(where, { otp: otp })];
                    case 4:
                        _b.sent();
                        newUser = new User_1.default({
                            name: name_1,
                            email: email,
                            password: passwordHashed,
                            otp: otp,
                            otpVerified: false,
                        });
                        return [4, newUser.save()];
                    case 5:
                        _b.sent();
                        return [2, res.status(200).json({
                                message: "successfully registered!",
                                registered: true,
                                data: newUser,
                            })];
                    case 6:
                        error_1 = _b.sent();
                        return [2, res.status(500).json({ message: error_1.message })];
                    case 7: return [2];
                }
            });
        });
    };
    UserControl.prototype.emailVerificataion = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, otp, user, query, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.body, email = _a.email, otp = _a.otp;
                        if (!email || !otp) {
                            return [2, res.status(400).json({
                                    message: "Please fill in all fields correctly!",
                                    error: true,
                                })];
                        }
                        if (!validateEmail(email)) {
                            return [2, res
                                    .status(400)
                                    .json({ message: "email is invalid!", error: true })];
                        }
                        return [4, User_1.default.findOne({ email: email, otp: otp })];
                    case 1:
                        user = _b.sent();
                        if (!user) return [3, 3];
                        query = { email: email };
                        return [4, User_1.default.updateOne(query, { otpVerified: true, otp: 0 })];
                    case 2:
                        _b.sent();
                        return [2, res.status(200).json({
                                message: "otp is verified!",
                                activated: true,
                            })];
                    case 3: return [2, res.status(200).json({
                            message: "We are sorry, OTP not matched",
                        })];
                    case 4: return [3, 6];
                    case 5:
                        error_2 = _b.sent();
                        return [2, res.status(500).json({
                                message: "user is not exists', ".concat(error_2.message),
                            })];
                    case 6: return [2];
                }
            });
        });
    };
    UserControl.prototype.signin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password_1, userByEmail, hashedPassword_1, isPassword, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password_1 = _a.password;
                        console.log("email, password", req.body);
                        if (!(email && password_1))
                            return [2, res.status(200).json({
                                    success: false,
                                    message: "Please enter both email and password",
                                })];
                        return [4, User_1.default.findOne({ email: email, otpVerified: true })];
                    case 1:
                        userByEmail = _b.sent();
                        if (!userByEmail) {
                            return [2, res
                                    .status(400)
                                    .json({ message: "This email  , otpverified does not exist in our database!" })];
                        }
                        hashedPassword_1 = userByEmail.password;
                        return [4, new Promise(function (resolve, reject) {
                                bcrypt_1.default.compare(password_1, hashedPassword_1, function (err, isMatched) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else if (isMatched) {
                                        resolve(isMatched);
                                    }
                                    else {
                                        resolve(isMatched);
                                    }
                                });
                            })];
                    case 2:
                        isPassword = _b.sent();
                        if (isPassword) {
                            return [2, res.status(200).json({ message: "signin successed!" })];
                        }
                        else {
                            return [2, res.status(400).json({ message: "Password doesn't match!" })];
                        }
                        return [3, 4];
                    case 3:
                        error_3 = _b.sent();
                        return [2, res.status(500).json({ message: error_3.message })];
                    case 4: return [2];
                }
            });
        });
    };
    ;
    UserControl.prototype.signout = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password_2, userByEmail, hashedPassword_2, isPassword, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password_2 = _a.password;
                        console.log("email, password", req.body);
                        if (!(email && password_2))
                            return [2, res.status(200).json({
                                    success: false,
                                    message: "Please enter both email and password",
                                })];
                        return [4, User_1.default.findOne({ email: email, otpVerified: true })];
                    case 1:
                        userByEmail = _b.sent();
                        if (!userByEmail) {
                            return [2, res
                                    .status(400)
                                    .json({ message: "This email  , otpverified does not exist in our database!" })];
                        }
                        hashedPassword_2 = userByEmail.password;
                        return [4, new Promise(function (resolve, reject) {
                                bcrypt_1.default.compare(password_2, hashedPassword_2, function (err, isMatched) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else if (isMatched) {
                                        resolve(isMatched);
                                    }
                                    else {
                                        resolve(isMatched);
                                    }
                                });
                            })];
                    case 2:
                        isPassword = _b.sent();
                        if (isPassword) {
                            return [2, res.status(200).json({ message: "signout successed!" })];
                        }
                        else {
                            return [2, res.status(400).json({ message: "Password doesn't match!" })];
                        }
                        return [3, 4];
                    case 3:
                        error_4 = _b.sent();
                        return [2, res.status(500).json({ message: error_4.message })];
                    case 4: return [2];
                }
            });
        });
    };
    ;
    UserControl.prototype.getRefreshToken = function (req, res) {
        var _a;
        try {
            var refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
            if (!refreshToken) {
                return res.status(400).json({ message: "please signin first!" });
            }
            var tokenAccess = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            if (!tokenAccess) {
                return res
                    .status(403)
                    .json({ message: "please signin first to get the token!" });
            }
            var user = tokenAccess;
            var access_token = createAccessToken({
                id: user.id,
            });
            return res.status(200).json({ access_token: access_token });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
    UserControl.prototype.forgotPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, forgotPasswordOTP, nodeMail, where, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        email = req.body.email;
                        return [4, User_1.default.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!!user) return [3, 2];
                        return [2, res.status(404).json({ message: "This email does not exist!" })];
                    case 2:
                        forgotPasswordOTP = Math.floor(100000 + Math.random() * 900000);
                        nodeMail = new SendMail_1.NodeMail();
                        return [4, nodeMail.sendEmail(forgotPasswordOTP, email)];
                    case 3:
                        _a.sent();
                        where = { email: email };
                        return [4, User_1.default.updateOne(where, { forgotPasswordOTP: forgotPasswordOTP })];
                    case 4:
                        _a.sent();
                        return [2, res.status(200).json({
                                message: "We have sent OTP on your registered email!",
                            })];
                    case 5: return [3, 7];
                    case 6:
                        e_1 = _a.sent();
                        return [2, res.status(500).json({ message: e_1.message })];
                    case 7: return [2];
                }
            });
        });
    };
    UserControl.prototype.forgotpasswordVerificataion = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, forgotPasswordOTP, email, user, where, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.body, forgotPasswordOTP = _a.forgotPasswordOTP, email = _a.email;
                        if (!forgotPasswordOTP) {
                            return [2, res.status(400).json({
                                    message: "Please fill in all fields correctly!",
                                    error: true,
                                })];
                        }
                        return [4, User_1.default.findOne({ forgotPasswordOTP: forgotPasswordOTP, email: email })];
                    case 1:
                        user = _b.sent();
                        if (!user) return [3, 3];
                        where = { email: email };
                        return [4, User_1.default.updateOne(where, { forgotPasswordOTP: 0 })];
                    case 2:
                        _b.sent();
                        return [2, res.status(200).json({
                                message: "forgotPassworOTP is verified!",
                                activated: true,
                            })];
                    case 3: return [2, res.status(200).json({
                            message: "We are sorry, forgotPassworOTP not matched",
                        })];
                    case 4: return [3, 6];
                    case 5:
                        error_5 = _b.sent();
                        return [2, res.status(500).json({
                                message: "user is not exists', ".concat(error_5.message),
                            })];
                    case 6: return [2];
                }
            });
        });
    };
    UserControl.prototype.resetPassword = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var newpassword, hashedPassword, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        newpassword = req.body.newpassword;
                        return [4, bcrypt_1.default.hash(newpassword, 12)];
                    case 1:
                        hashedPassword = _b.sent();
                        return [4, User_1.default.findOneAndUpdate({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }, {
                                password: hashedPassword,
                            })];
                    case 2:
                        _b.sent();
                        return [2, res
                                .status(200)
                                .json({ message: "your password successully changed!" })];
                    case 3:
                        error_6 = _b.sent();
                        return [2, res.status(500).json({ message: error_6.message })];
                    case 4: return [2];
                }
            });
        });
    };
    UserControl.prototype.changePassword = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, email, password, newpassword, user, hashedPassword, error_7;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        _b = req.body, email = _b.email, password = _b.password, newpassword = _b.newpassword;
                        if (!email || !password) {
                            return [2, res.status(400).json({
                                    message: "Please fill in all fields correctly!",
                                    error: true,
                                })];
                        }
                        if (!validateEmail(email)) {
                            return [2, res
                                    .status(400)
                                    .json({ message: "email is invalid!", error: true })];
                        }
                        return [4, User_1.default.findOne({ email: email, password: password })];
                    case 1:
                        user = _c.sent();
                        if (!user) return [3, 4];
                        return [4, bcrypt_1.default.hash(newpassword, 12)];
                    case 2:
                        hashedPassword = _c.sent();
                        return [4, User_1.default.findOneAndUpdate({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }, {
                                password: hashedPassword,
                            })];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [2, res
                            .status(200)
                            .json({ message: "your password successully changed!" })];
                    case 5:
                        error_7 = _c.sent();
                        return [2, res.status(500).json({ message: error_7.message })];
                    case 6: return [2];
                }
            });
        });
    };
    UserControl.prototype.getUserInformation = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var user, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).select("-password")];
                    case 1:
                        user = _b.sent();
                        console.log(user);
                        return [2, res.status(200).json({ message: "get user successful", user: user })];
                    case 2:
                        error_8 = _b.sent();
                        return [2, res.status(500).json({ message: error_8.message })];
                    case 3: return [2];
                }
            });
        });
    };
    UserControl.prototype.getAllUsersInformation = function (_req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, User_1.default.find().select("password")];
                    case 1:
                        users = _a.sent();
                        return [2, res
                                .status(200)
                                .json({ message: "get all users from database", users: users })];
                    case 2:
                        error_9 = _a.sent();
                        return [2, res.status(500).json({ message: error_9.message })];
                    case 3: return [2];
                }
            });
        });
    };
    UserControl.prototype.updateUser = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, name_2, email, error_10;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.body, name_2 = _b.name, email = _b.email;
                        return [4, User_1.default.findOneAndUpdate({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }, {
                                name: name_2,
                                email: email,
                            })];
                    case 1:
                        _c.sent();
                        return [2, res
                                .status(200)
                                .json({ message: "your profile updated successfully!" })];
                    case 2:
                        error_10 = _c.sent();
                        return [2, res.status(500).json({ message: error_10.message })];
                    case 3: return [2];
                }
            });
        });
    };
    UserControl.prototype.updateUserRole = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var role, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        role = req.body.role;
                        return [4, User_1.default.findOneAndUpdate({ _id: req.params.id }, {
                                role: role,
                            })];
                    case 1:
                        _a.sent();
                        return [2, res.status(200).json({ message: "updated successfully!" })];
                    case 2:
                        error_11 = _a.sent();
                        return [2, res.status(500).json({ message: error_11.message })];
                    case 3: return [2];
                }
            });
        });
    };
    UserControl.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, User_1.default.findByIdAndDelete(req.params.id)];
                    case 1:
                        _a.sent();
                        return [2, res
                                .status(200)
                                .json({ message: "your account deleted successfully!" })];
                    case 2:
                        error_12 = _a.sent();
                        return [2, res.status(500).json({ message: error_12.message })];
                    case 3: return [2];
                }
            });
        });
    };
    return UserControl;
}());
exports.UserControl = UserControl;
exports.userControl = new UserControl();
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function createActivationToken(payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "20m",
    });
}
exports.createActivationToken = createActivationToken;
function createAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
}
exports.createAccessToken = createAccessToken;
function createRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
}
exports.createRefreshToken = createRefreshToken;
//# sourceMappingURL=User.js.map