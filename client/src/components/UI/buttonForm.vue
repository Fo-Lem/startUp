<template lang="">
    <input :class="[
        buttonType=='reset' ? 'button-form-reset' : '',
        'button-form',
    ]"  :type="buttonType" :value="buttonValue" />
</template>
<script>
export default {
    name: "button-form",

    props: {
        buttonValue: {
            type: String,
        },
        buttonType: {
            type: String,
            require: true,
        },
    },
};
</script>
<style scoped lang="scss">
.button-form {
    color: #fff;
    font-size: 24px;
    font-weight: 400;
    background-color: #4786ff;
    border-radius: 10px;
    border: 2px solid #4786ff;
    padding: 25px 30px;
    width: 100%;
    &-reset{
        background-color: #FFFFFF;
        color: #4786ff;  
    }

    &:hover {
        cursor: pointer;
        background-color: #fff;
        color: #4786ff;
    }
}
</style>
