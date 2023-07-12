<template lang="">
    <form action="">
        <input-form
        :inputName="'name'"
        :inputType="'text'"
        v-model:inputValue="name"
        :inputPlaceholder="'Имя'"/>

        <input-form
        :inputName="'email'"
        :inputType="'email'"
        v-model:inputValue="email"
        :inputPlaceholder="'Email'"/>

        <input-form
        :inputName="'password1'"
        :inputType="'password'"
        :autocomplete="'off'"
        v-model:inputValue="password1"
        :inputPlaceholder="'Пароль'"/>

        <input-form
        :inputName="'password2'"
        :inputType="'password'"
        :autocomplete="'off'"
        v-model:inputValue="password2"
        :inputPlaceholder="'Повторите пароль'"/>

        <button-form
        v-bind:buttonValue="'Зарегестрироваться'"/>



    </form>
</template>
<script>
import inputForm from './UI/inputForm'
import buttonForm from './UI/buttonForm'
export default {
    components: { inputForm,buttonForm },
    data() {
        return {
            name: '',
            email:'',
            password1:'',
            password2:''
            

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