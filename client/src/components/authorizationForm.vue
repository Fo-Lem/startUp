<template lang="">
    <error-popup v-if="errors.status"
    :description="errorDescription"
    @closeErrorPopup="errors.status=false"/>
    <form id="formAuthorization" @submit.prevent="auth" action="">
        <h1>Войдите в систему</h1>
        <input-form
        :inputName="'email'"
        :inputType="'email'"
        v-model:inputValue="email"
        :inputPlaceholder="'Email'"
        :error="errors.email.status"/>

        <input-form
        :inputName="'password1'"
        :inputType="'password'"
        :autocomplete="'current-password'"
        v-model:inputValue="password1"
        :inputPlaceholder="'Пароль'"
        :error="errors.password.status"/>

        <button-form
        v-bind:buttonValue="'Войти'"/>



    </form>
</template>
<script>
import inputForm from './UI/inputForm'
import buttonForm from './UI/buttonForm'
import { login } from '@/http/userApi'
import ErrorPopup from './UI/errorPopup'
export default {
    components: { inputForm, buttonForm, ErrorPopup },
    data() {
        return {
            email: '',
            password1: '',
            errors: {
                status: false,
                email: { status: false, description: '' },
                password: { status: false, description: '' },
            }


        }
    },
    computed:{
        errorDescription:function(){
            for (const key in this.errors) {
                if(this.errors[key].status===true){
                    return this.errors[key].description
                }   
            }
            return ''

        }
    },
    methods: {
        async auth() {
            let res
            if (this.emailValidator(this.email)) {
                if (this.passwordValidator(this.password1)) {
                    res = await login(this.email, this.password1)
                    if (res.errorMessage=="Указан неверный пароль") {
                        this.errors.status = true
                        this.errors.password.status = true
                        this.errors.password.description = res.errorMessage
                        return res
                    }
                    
                }
            }



        }, passwordValidator(pas1) {
            if (
                pas1 != ""
            ) {
                return true;
            }
            this.errors.status = true
            this.errors.password.status = true
            this.errors.password.description = "Не заполнено поле \"Пароль\""
            return false;
        },

        emailValidator(email) {
            if (email != "") {
                this.errors.email.status = false
                return true
            }
            this.errors.status = true
            this.errors.email.status = true
            this.errors.email.description = "Не заполнено поле \"email\""
            console.log(email)
            return false
        }
    },

}
</script>
<style scoped lang="scss">
form {
    margin: 0 auto;
    margin-top: 120px;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 40px;

    h1 {
        font-size: 50px;
        color: #4786FF;
        text-align: center;
        width: 100%;


    }
}
</style>