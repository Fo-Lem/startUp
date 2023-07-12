<template lang="">
    <div>
        <input class="button-form" type="submit" :value="buttonValue">
    </div>
</template>
<script>
export default {
    name: "button-form",

    props: {
        buttonValue: {
            type: String,
            // require: true,
        },
    }
}
</script>
<style scoped lang="scss">
div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    .button-form {
        color: #fff;
        font-size: 24px;
        font-weight: 400;
        background-color: #4786FF;
        border-radius: 10px;
        border: 2px solid #4786FF;
        padding: 25px 30px;

        &:hover {
            cursor: pointer;
            background-color: #fff;
            color: #4786FF;
        }
    }
}
</style>