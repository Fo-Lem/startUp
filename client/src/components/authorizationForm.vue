<template lang="">
    <div>
        <error-popup
            v-if="errors.status"
            :description="errorDescription"
            @closeErrorPopup="errors.status = false"
        />
        <form id="formAuthorization" @submit.prevent="auth" action="">
            <h1>Войдите в систему</h1>
            <input-form
                :inputName="'email'"
                :inputType="'email'"
                v-model:inputValue="email"
                :inputPlaceholder="'Email'"
                :error="errors.email.status"
            />

            <input-form
                :inputName="'password1'"
                :inputType="'password'"
                :autocomplete="'current-password'"
                v-model:inputValue="password1"
                :inputPlaceholder="'Пароль'"
                :error="errors.password.status"
            />

            <button-form
                v-bind:buttonValue="'Войти'"
                v-bind:buttonType="'submit'"
            />
        </form>
    </div>
</template>
<script>
import inputForm from "./UI/inputForm";
import buttonForm from "./UI/buttonForm";
import { login } from "@/http/userApi";
import ErrorPopup from "./UI/errorPopup";
import { emailValidator, passwordValidator } from "@/validator/validators";
export default {
    components: { inputForm, buttonForm, ErrorPopup },
    emits: ["codePopupOpen", "isAuth"],
    data() {
        return {
            email: "",
            password1: "",
            errors: {
                status: false,
                email: { status: false, description: "" },
                password: { status: false, description: "" },
            },
        };
    },
    computed: {
        errorDescription: function () {
            for (const key in this.errors) {
                if (this.errors[key].status === true) {
                    return this.errors[key].description;
                }
            }
            return "";
        },
    },
    methods: {
        noErrors() {
            this.errors.status = false;
            this.errors.email.status = false;
            this.errors.password.status = false;
        },
        async auth() {
            let res
            res = emailValidator(this.email)
            if (res === true) {
                res = passwordValidator(this.password1, this.password1)

                if (res === true) {
                    await login(this.email, this.password1)
                        .then(() => {
                            this.$emit("isAuth");
                        })
                        .catch((req) => {
                            const error = req.response.data.errorMessage;
                            switch (error) {
                                case "Указан неверный пароль":
                                    this.noErrors()
                                    this.errors.status = true;
                                    this.errors.password.status = true;
                                    this.errors.password.description = error;
                                    return;
                                case "Пользователь не найден":
                                    this.noErrors()
                                    this.errors.status = true;
                                    this.errors.email.status = true;
                                    this.errors.email.description = error;

                                    return;
                            }
                        });
                } else {
                    this.errors.status = true;
                    this.errors.password.status = true;
                    this.errors.password.description = res.errorMessage;
                }
            } else {
                this.errors.status = true;
                this.errors.email.status = true;
                this.errors.email.description = res.errorMessage;
            }
        },
    },
};
</script>
<style scoped lang="scss">
form {
    margin: 0 auto;
    margin-top: 160px;
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 40px;

    h1 {
        font-size: 50px;
        color: #4786ff;
        text-align: center;
        width: 100%;
        margin-bottom: 20px;
    }

    input {
        margin-top: 50px;
        margin-bottom: 35px;
    }
}
</style>
