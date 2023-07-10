const db = require("../db");
const ApiError = require("../error/ApiError");
const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth_codes = {};
const generatejwt = (id, email) => {
    console.log(email, id);
    return jwt.sign({ id, email }, process.env.SECRET_KEY, {
        expiresIn: "15m",
    });
};

function createCode(email) {
    const letters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let word = "";

    for (let i = 0; i < 15; i++) {
        word += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    auth_codes[email] = word;
    setTimeout(() => {
        let e = email;
        delete auth_codes[e];
        console.log(auth_codes);
    }, 180000);
    console.log(auth_codes);
    return word;
}

class UserController {
    async registration(req, res, next) {
        const { email, password, auth_code } = req.body;
        if (!email || !password) {
            res.status(400).json({
                errorMessage: "Некоректный Email или password",
            });
            return next(ApiError.bedRequest("Некоректный Email или password"));
        }
        const candidate = await User.findOne({ where: { email } });

        if (candidate) {
            res.json({
                errorMessage: "Пользователь с таким Email уже существует",
            });
            return next(
                ApiError.bedRequest("Пользователь с таким Email уже существует")
            );
        }
        if (!auth_code) {
            console.log("Код:", createCode(email));
            res.status(200).json({
                message: "Введите код",
            });
            return;
        }
        if (auth_codes[email] != auth_code) {
            res.status(400).json({
                message: "Неверный код",
            });
            return;
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const newUser = await User.create({ email, password: hashPassword });
        const token = generatejwt(newUser.id, newUser.email);
        res.json({ token });
    }
    async authorization(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                errorMessage: "Некоректный Email или password",
            });
            return next(ApiError.bedRequest("Некоректный Email или password"));
        }
        const user = await User.findOne({ where: { email } });

        if (!user) {
            res.json({ errorMessage: "Пользователь не найден" });
            return next(ApiError.bedRequest("Пользователь не найден"));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            res.json({ errorMessage: "Указан неверный пароль" });
            return next(ApiError.bedRequest("Указан неверный пароль"));
        }
        const token = generatejwt(user.id, user.email);
        res.json({ token });
    }

    async check(req, res, next) {
        const token = generatejwt(req.user.id, req.user.email);
        return res.json({ token });
    }

    async update(req, res, next) {
        const { email, password, oldpassword, name, surname } = req.body;
        console.log(email, password, oldpassword, name, surname);
        let user = await User.findOne({ where: { email } });
        if (req.files.avatar) {
            if (!user) {
                return next(ApiError.bedRequest("Пользователь не найден"));
            }
            req.files.avatar.mv("public/userAvatars/" + user.id + ".jpg");
        }
        if (oldpassword) {
            let comparePassword = bcrypt.compareSync(
                oldpassword,
                user.password
            );
            if (!comparePassword) {
                res.json({ errorMessage: "Указан неверный старый пароль" });
                return next(
                    ApiError.bedRequest("Указан неверный старый пароль")
                );
            }
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const newUser = await User.update(
            { email, password: hashPassword, name, surname },
            { returning: true, where: { id: user.id } }
        );
        user = newUser[1][0];
        const token = generatejwt(newUser[1][0].id, newUser[1][0].email);
        return res.json({ token, user });
    }
}
module.exports = new UserController();
