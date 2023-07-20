<template lang="">
    <div>
        <error-popup
            v-if="errors.status"
            :description="errorDescription"
            @closeErrorPopup="errors.status = false"
        />

        <form id="formRegistration" @submit.prevent="reg" action="">
            <input-form
                v-if="!regCode.isOpenPopup"
                :inputName="'name'"
                :inputType="'text'"
                v-model:inputValue="name"
                :inputPlaceholder="'Имя'"
                :error="errors.name.status"
            />

            <input-form
                v-if="!regCode.isOpenPopup"
                :inputName="'email'"
                :inputType="'email'"
                v-model:inputValue="email"
                :inputPlaceholder="'Email'"
                :error="errors.email.status"
            />

            <input-form
                v-if="!regCode.isOpenPopup"
                :inputName="'password1'"
                :inputType="'password'"
                :autocomplete="'off'"
                v-model:inputValue="password1"
                :inputPlaceholder="'Пароль'"
                :error="errors.password.status"
            />

            <input-form
                v-if="!regCode.isOpenPopup"
                :inputName="'password2'"
                :inputType="'password'"
                :autocomplete="'off'"
                v-model:inputValue="password2"
                :inputPlaceholder="'Подтверждение пароля'"
                :error="errors.password.status"
            />

            <button-form
                class="button"
                v-if="!regCode.isOpenPopup"
                v-bind:buttonValue="'Зарегестрироваться'"
                v-bind:buttonType="'submit'"
            />

            <code-popup
                v-if="regCode.isOpenPopup"
                :email="email"
                @updateCode="
                    (data) => {
                        regCode.data = data;
                    }
                "
                :errors="errors"
            />
        </form>
    </div>
</template>
<script>

import { emailValidator, passwordValidator, codeValidator } from "@/validator/validators";
import inputForm from "./UI/inputForm";
import buttonForm from "./UI/buttonForm";
import { registration } from "@/http/userApi";
import ErrorPopup from "./UI/errorPopup";
import codePopup from "./codePopup";

export default {
    components: { inputForm, buttonForm, ErrorPopup, codePopup },
    data() {
        return {
            name: "",
            email: "",
            password1: "",
            password2: "",
            regCode: { isOpenPopup: false, data: "" },
            errors: {
                status: false,
                name: { status: false, description: "" },
                email: { status: false, description: "" },
                password: { status: false, description: "" },
                code: { status: false, description: "" }
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
    emits: ["codePopupOpen", "isAuth"],
    methods: {
        async reg() {
            if (this.name == "") {
                this.errors.status = true;
                this.errors.name.status = true;
                this.errors.name.description = 'Не заполнено поле "Имя"';
                return;
            }
            this.errors.name.status = false;


            let res
            res = emailValidator(this.email)
            
            if (res === true) {
                res = passwordValidator(this.password1, this.password2)
                console.log(res)
                if (res === true) {
                    if (!this.regCode.isOpenPopup) {
                        await registration(this.name, this.email, this.password1)
                            .then(() => {
                                this.$emit("codePopupOpen");
                                this.errors.status = false;
                                this.regCode.isOpenPopup = true;
                                
                            })
                            .catch((req) => {
                                const error = req.response.data.errorMessage;
                                this.errors.status = true;
                                this.errors.email.status = true;
                                this.errors.email.description = error;
                            });
                            return
                    }
                    res = codeValidator(this.regCode.data)
                    if (res === true) {
                        await registration(
                            this.name,
                            this.email,
                            this.password1,
                            this.regCode.data
                        )
                            .then(() => {
                                this.errors.status = false;
                                this.$emit("isAuth");
                                return
                            })
                            .catch((req) => {
                                const error = req.response.data.errorMessage;
                                this.errors.status = true;
                                this.errors.code.status = true;
                                this.errors.code.description = error;
                            });
                        return;
                    } else {
                        const error = res.errorMessage;
                        console.log(error)
                        this.errors.status = true;
                        this.errors.code.status = true;
                        this.errors.code.description = error;
                    }
                    
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
    margin: 70px auto 0 auto;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 40px;

    .button {
        width: 100%;
        margin-top: 20px;
    }
}
</style>
