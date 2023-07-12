<template lang="">
    <div>
        <label v-if="isActive" class="label-form" :for="inputName">{{
            inputPlaceholder
        }}</label>
        <input
            class="input-form"
            :autocomplete="autocomplete"
            :type="inputType"
            :placeholder="inputPlaceholder"
            :name="inputName"
            :value="inputValue"
            :id="inputName"
            @input="updateInput($event)"
            
        />
    </div>
</template>
<script>
export default {
    name: "input-form",
    
    props: {
        autocomplete: {
            type: String,
            default:'on'
            // require: true,
        },
        inputName: {
            type: String,
            // require: true,
        },
        inputType: {
            type: String,
            // require: true,
        },
        inputValue: {
            type: String,
            // require: true,
        },
        inputPlaceholder: {
            type: String,
            // require: true,
        },
    },
    methods:{
        updateInput(event){
            
            this.$emit('update:inputValue', event.target.value)
            
        }
        },
        computed:{
            isActive:function (){
               return this.inputValue.length>0?true:false
            }
        },
    
    emits:['update:inputValue']
};
</script>
<style scoped lang="scss">
div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    .label-form {
            margin-left: 32px;
            font-size: 24px;
            font-weight: 400;
    }

    .input-form {
        color:#424242;
        font-size: 24px;
        font-weight: 400;
        background-color: #fff;
        border-radius: 10px;
        border: 2px solid #686868;
        padding: 25px 30px;
        &:focus-visible{
            outline: #CB5E5E auto 1px;
        }
    }
}
</style>
