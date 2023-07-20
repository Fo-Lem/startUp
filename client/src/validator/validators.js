export const passwordValidator = (pass1, pass2) => {
    //минимальная длинна 6
    if (pass1 == "") {
        return { status: false, errorMessage: `Поле "Пароль" пустое` };
    }
    //проверка на идентичность
    if (pass1 !== pass2) {
        return { status: false, errorMessage: "Пароли не совпадают" };
    }

    //минимальная длинна 6
    if (pass1.length < 6) {
        return { status: false, errorMessage: "Пароль слишком короткий" };
    }

    //первый символ не цифра
    const beginWithoutDigit = /^\D.*$/;
    if (!beginWithoutDigit.test(pass1)) {
        return {
            status: false,
            errorMessage: "Пароль должен начинаться с буквы",
        };
    }

    //без спец символов
    const withoutSpecialChars = /^[^-() /<>]*$/;
    if (!withoutSpecialChars.test(pass1)) {
        return { status: false, errorMessage: "Пароль содержит спец символы" };
    }

    //содержит буквы
    const containsLetters = /^.*[a-zA-Z]+.*$/;
    if (!containsLetters.test(pass1)) {
        return { status: false, errorMessage: "Пароль должен содержать буквы" };
    }

    return true;
};
export const emailValidator = (email) => {
    const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (!EMAIL_REGEXP.test(email)) {
        return { status: false, errorMessage: "Некоректный email" };
    }
    return true;
};
export const codeValidator = (code) => {
    const CODE_REGEXP = /^[a-zA-Z0-9]+$/;
    if (!CODE_REGEXP.test(code)) {
        return { status: false, errorMessage: "Некоректный код" };
    }
    return true;
};

export const fileValidator = (file) => {
    const list = ["jpg", "jpeg", "png"];
    const photo = file.name.split(".").splice(-1, 1)[0].trim();
    for (let i = 0; i < list.length; i++) {
        if (list[i] == photo) {
            return true;
        }
    }
    return false;
};
