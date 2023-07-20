const db = require("../db");
const jwt_decode = require("jwt-decode");
const ApiError = require("../error/ApiError");
const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth_codes = {};

const generatejwt = (id, name, email, avatar) => {
    console.log(id, name, email);
    return jwt.sign({ id, name, email, avatar }, process.env.SECRET_KEY, {
        expiresIn: "30m",
    });
};

const createCode = (email) => {
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
};

class UserController {
    async registration(req, res, next) {
        const { name, email, password, auth_code } = req.body;
        if (!email || !password) {
            res.status(400).json({
                errorMessage: "Некоректный Email или password",
            });
            return next(ApiError.bedRequest("Некоректный Email или password"));
        }
        const candidate = await User.findOne({ where: { email } });

        if (candidate) {
            res.status(400).json({
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
            res.status(200).json({
                errorMessage: "Неверный код",
            });
            return;
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
        });
        const token = generatejwt(
            newUser.id,
            newUser.name,
            newUser.email,
            newUser.avatar
        );
        res.json({ token });
    }
    async authorization(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(200).json({
                errorMessage: "Некоректный Email или password",
            });
            return next(ApiError.bedRequest("Некоректный Email или password"));
        }
        const user = await User.findOne({ where: { email } });

        if (!user) {
            res.status(401).json({ errorMessage: "Пользователь не найден" });
            return next(ApiError.bedRequest("Пользователь не найден"));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            res.status(401).json({ errorMessage: "Указан неверный пароль" });
            return next(ApiError.bedRequest("Указан неверный пароль"));
        }
        const token = generatejwt(user.id, user.name, user.email,user.avatar);
        res.json({ token });
    }

    async check(req, res, next) {
        const email=req.user.email
        const user = await User.findOne({ where: { email } })
        if (!user) {
            res.status(401).json({ errorMessage: "Пользователь не найден" });
            return next(ApiError.bedRequest("Пользователь не найден"));
        }
        const token = generatejwt(
            user.id,
            user.name,
            user.email,
            user.avatar
        );
        
        return res.json({ token });
    }

    async update(req, res, next) {
        let { name,
            email,
            newEmail,
            newPassword } = req.body;
        let avatar
        console.log(name,
            email,
            newEmail,
            newPassword);

        var decoded = jwt_decode(req.headers.authorization.split(" ")[1]);

        let user = await User.findOne({ where: { email } });

        if (!user) {
            return next(ApiError.bedRequest("Пользователь не найден"));
        }
        if (user.id != decoded.id) {
            return next(ApiError.bedRequest("Не верный пользователь"));
        }
        
        if (req.files) {
            req.files.file.mv("public/userAvatars/" + user.id + ".jpg");
            avatar=user.id
        }

        if (newPassword) {
            newPassword = await bcrypt.hash(newPassword, 5);
        } else {
            newPassword = user.password;
        }

        if (newEmail) {
            email = newEmail;
        }
        if (!name) {
            name = user.name;
        }

        const newUser = await User.update(
            { email, password: newPassword, name, avatar },
            { returning: true, where: { id: user.id } }
        );
        if(newUser){
            user = newUser[1][0];
        }
        
        const token = generatejwt(user.id, user.name, user.email, user.avatar);
        return res.json({ token });
    }
    async delete(req, res, next) {
        const id = req.params.id;
        const isDelete = await User.destroy({ where: { id: id } });
        if (isDelete) {
            return res.status(200).json({
                message: `Пользователь ${id} удален`,
            });
        }
        return res.status(400).json({
            errorMessage: `Непредвиденная ошибка`,
        });
    }
}
module.exports = new UserController();
