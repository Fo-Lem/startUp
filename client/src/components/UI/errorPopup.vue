<template lang="">
    <div class="errorPopup">
        <div class="circle">!</div>
        <p class="description">Ошибка! {{ description }}</p>
        <svg
            @click="$emit('closeErrorPopup')"
            class="XMarc"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            ></path>
        </svg>
    </div>
</template>
<script>
export default {
    name: "error-popup",
    props: {
        description: {
            type: String,
            require: true,
        },
        isActive: {
            type: Boolean,
            require: true,
        },
    },
};
</script>
<style scoped lang="scss">
.errorPopup {
    display: flex;
    gap: 30px;
    padding: 30px;
    position: absolute;
    right: 0;
    bottom: 100px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    width: 585px;
    height: 120px;
    border: 2px solid #686868;
    background-color: #fff;

    .circle {
        padding: 5px;
        font-size: 40px;
        text-align: center;
        font-weight: 700;
        border: 2px solid #cb5e5e;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        color: #cb5e5e;
    }

    .description {
        max-width: 400px;
        font-size: 24px;
    }

    .XMarc {
        position: absolute;
        right: 20px;
        width: 25px;
        height: 25px;

        &:hover {
            fill: #cb5e5e;
            cursor: pointer;
        }
    }
}
</style>
