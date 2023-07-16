<template lang="">
    
    <error-popup v-if="errors.status"
    :description="errorDescription"
    @closeErrorPopup="errors.status=false"/>

    <form id="formRegistration" @submit.prevent="reg" action="">
          
        <input-form
        v-if="!regCode.isOpenPopup"
        :inputName="'name'"
        :inputType="'text'"
        v-model:inputValue="name"
        :inputPlaceholder="'Имя'"
        :error="errors.name.status"/>

        <input-form
        v-if="!regCode.isOpenPopup"
        :inputName="'email'"
        :inputType="'email'"
        v-model:inputValue="email"
        :inputPlaceholder="'Email'"
        :error="errors.email.status"/>

        <input-form 
        v-if="!regCode.isOpenPopup"
        :inputName="'password1'"
        :inputType="'password'"
        :autocomplete="'off'"
        v-model:inputValue="password1"
        :inputPlaceholder="'Пароль'"
        :error="errors.password.status"/>

        <input-form 
        v-if="!regCode.isOpenPopup"
        :inputName="'password2'"
        :inputType="'password'"
        :autocomplete="'off'"
        v-model:inputValue="password2"
        :inputPlaceholder="'Подтверждение пароля'"
        :error="errors.password.status"/>

        <button-form 
        v-if="!regCode.isOpenPopup"
        v-bind:buttonValue="'Зарегестрироваться'"/>

        <code-popup v-if="regCode.isOpenPopup"
        :email="email"
        @updateCode="(data)=>{regCode.data=data}"/>


    </form>
</template>
<script>
import inputForm from './UI/inputForm'
import buttonForm from './UI/buttonForm'
import { registration } from '@/http/userApi'
import ErrorPopup from './UI/errorPopup'
import codePopup from './codePopup'


export default {
    components: { inputForm, buttonForm, ErrorPopup,codePopup },
    data() {
        return {
            name: '',
            email: '',
            password1: '',
            password2: '',
            regCode: {isOpenPopup:false,data:''},
            errors:{
                status:false,
                name:{status:false,description:''},
                email:{status:false,description:''},
                password:{status:false,description:''},
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
    emits:['codePopupOpen'],
    methods: {
        async reg() {
            let res
            if (this.name==""){
                this.errors.status=true
                this.errors.name.status=true
                this.errors.name.description="Не заполнено поле \"Имя\""
                return
            }
            this.errors.name.status=false
            if (this.emailValidator(this.email)) {
                if (this.passwordValidator(this.password1, this.password2)) {
                    if (this.codeValidator(this.regCode.data)) {
                        res = await registration(this.name, this.email, this.password1,this.regCode.data)
                        if(res.errorMessage){
                        this.errors.status=true
                        this.errors.email.status=true
                        this.errors.email.description=res.errorMessage
                        return res
                    }
                        this.errors.status=false
                        this.$router.push({ path: 'profile' })
                        return res
                    }
                    res = await registration(this.name, this.email, this.password1)
                    if(res.errorMessage){
                        this.errors.status=true
                        this.errors.email.status=true
                        this.errors.email.description=res.errorMessage
                        return res
                    }
                    this.$emit('codePopupOpen')
                    this.regCode.isOpenPopup = true
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
                return false;
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