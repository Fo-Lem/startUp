<template lang="">
    <error-popup v-if="errors.status"
    :description="errorDescription"/>

    <form id="formRegistration" @submit.prevent="reg" action="">
          
        <input-form
        :inputName="'name'"
        :inputType="'text'"
        v-model:inputValue="name"
        :inputPlaceholder="'Имя'"
        :error="errors.name.status"/>

        <input-form
        :inputName="'email'"
        :inputType="'email'"
        v-model:inputValue="email"
        :inputPlaceholder="'Email'"
        :error="errors.email.status"/>

        <input-form 
        :inputName="'password1'"
        :inputType="'password'"
        :autocomplete="'off'"
        v-model:inputValue="password1"
        :inputPlaceholder="'Пароль'"
        :error="errors.password.status"/>

        <input-form 
        :inputName="'password2'"
        :inputType="'password'"
        :autocomplete="'off'"
        v-model:inputValue="password2"
        :inputPlaceholder="'Подтверждение пароля'"
        :error="errors.password.status"/>

        <button-form
        v-bind:buttonValue="'Зарегестрироваться'"/>



    </form>
</template>
<script>
import inputForm from './UI/inputForm'
import buttonForm from './UI/buttonForm'
import { registration } from '@/http/userApi'
import ErrorPopup from './UI/errorPopup'

export default {
    components: { inputForm, buttonForm, ErrorPopup },
    data() {
        return {
            name: '',
            email: '',
            password1: '',
            password2: '',
            regCode: '',
            openPopupCode: false,
            errors:{
                status:false,
                name:{status:false,description:'1'},
                email:{status:false,description:'1'},
                password:{status:false,description:'1'},
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
        reg() {
            if (this.name==""){
                this.errors.status=true
                this.errors.name.status=true
                this.errors.name.description="Не заполнено поле \"Имя\""
                return
            }
            this.errors.name.status=false
            if (this.emailValidator(this.email)) {
                if (this.passwordValidator(this.password1, this.password2)) {
                    if (this.codeValidator(this.regCode)) {
                        registration(this.name, this.email, this.password1)
                        this.errors.status=false
                        return
                    }
                    this.openPopupCode = true
                }
            }



        },

        passwordValidator(pas1, pas2) {
            if (
                pas1 != "" &&
                pas2 != "" 
            ) {
                if(pas1 === pas2){
                    return true;
                }
                this.errors.status=true
                this.errors.password.status=true
                this.errors.password.description="Пароли не совпадают"
                
            }
            this.errors.status=true
            this.errors.password.status=true
            this.errors.password.description="Не заполнено поле \"Пароль\" или \"Подтверждение пароля\""
            return false;
        },

        emailValidator(email) {
            if (email!="") {
                this.errors.email.status=false
                return true
            }
            this.errors.status=true
            this.errors.email.status=true
            this.errors.email.description="Не заполнено поле \"email\""
            console.log(email)
            return false
        },
        codeValidator(regCode) {
            return regCode ? true : false

        }
    },

}
</script>
<style scoped lang="scss">
form {
    margin: 0 auto;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 40px;
}
</style>