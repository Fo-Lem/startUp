<template lang="">
    <form action="">
        <input-form
        :inputName="'email'"
        :inputType="'email'"
        v-model:inputValue="email"
        :inputPlaceholder="'Email'"/>

        <input-form
        :inputName="'password1'"
        :inputType="'password'"
        :autocomplete="'current-password'"
        v-model:inputValue="password1"
        :inputPlaceholder="'Пароль'"/>

        <button-form
        v-bind:buttonValue="'Войти'"/>



    </form>
</template>
<script>
import inputForm from './UI/inputForm'
import buttonForm from './UI/buttonForm'
export default {
    components: { inputForm,buttonForm },
    data() {
        return {
            email:'',
            password1:''
            

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