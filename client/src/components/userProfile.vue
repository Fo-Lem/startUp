<template lang="">
    <div>
        <input-profile 
        :inputName="'name'"
        :inputType="'name'"
        :autocomplete="'off'"
        v-model:inputValue="updateUser.newName"
        :inputPlaceholder="user.name"/>
    </div>
</template>
<script>
import InputProfile from './UI/inputProfile.vue';


export default {
    data() {
        return {
            updateUser:{
                newName:'',

            }
        }
    },
    props: {
        user: {
            type: Object
        }
    },
    components: { InputProfile },
    beforeMount() {

    }

}
</script>
<style scoped lang="scss"></style>