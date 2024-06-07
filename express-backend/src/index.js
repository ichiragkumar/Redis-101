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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const clinet = (0, redis_1.createClient)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Every thing is fine ");
});
app.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { problemId, userId, code, language } = yield req.body;
    try {
        // push this to database using prisma or mongoose
        clinet.lPush("submissions", JSON.stringify({ problemId, userId, code, language }));
        res.status(201).json({ msg: "submission recieve" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "serve error" });
    }
}));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield clinet.connect();
            console.log("connected to Redis");
            app.listen(3000, () => {
                console.log(`server is running at 3000`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
startServer();
