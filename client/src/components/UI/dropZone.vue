<template>
    <div class="photo-profile">
        <input
            @change="uploadPhoto"
            @dragenter="isDrag = true"
            @dragleave="isDrag = false"
            :class="[
                isDrag ? 'photo-profile-input-drop' : '',
                'photo-profile-input',
            ]"
            id="fileUpload"
            name="fileUpload"
            type="file"
        />

        <div for="fileUpload" class="photo-profile-container">
            <label
                :class="[
                    isDrag ? 'photo-profile-lable-drop' : '',
                    'photo-profile-lable',
                ]"
                for="fileUpload"
                >Добавить фотографию</label
            >
            <img class="photo-profile-img" :src="getSrc(photo)" />
        </div>

        <p class="photo-profile-name">{{ user.name }}</p>
    </div>
</template>

<script>
export default {
    name: "drop-zone",
    data() {
        return {
            isDrag: false,
        };
    },
    props: {
        photo: {
            require: true,
        },
        user: {
            require: true,
        },
    },
    methods: {
        uploadPhoto(currentTarget) {
            if (currentTarget.target.files) {
                this.$emit("uploadPhoto", currentTarget.target.files);
            }
            this.isDrag = false;
        },
        getSrc(photo) {
            if (this.user.id) {
                return photo == ""
                    ? `http://localhost:8080/public/userAvatars/${this.user.avatar}.jpg`
                    : URL.createObjectURL(photo[0]);
            }
        },
    },
};
</script>
<style scoped lang="scss">
.photo-profile {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
    width: 410px;
    height: 340px;
    background: #c8dbff;
    border-radius: 30px;

    &-input {
        opacity: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        &-drop {
            z-index: 1001;
        }
    }

    &-img {
        margin: 0 auto;
        border-radius: 85px;
        height: 170px;
        width: 170px;
        object-position: center;
        object-fit: cover;
    }

    &-name {
        color: #4786ff;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 40px;
        text-align: center;
    }
    &-container {
        position: relative;
        margin: 0 auto;
        height: 170px;
        width: 170px;
    }
    &-lable {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.6);
        margin: 0 auto;
        font-size: 12px;
        font-weight: 500;
        border-radius: 85px;
        height: 170px;
        width: 170px;
        cursor: pointer;

        &-drop {
            opacity: 1;
        }
        &:hover {
            opacity: 1;
        }
    }
}
</style>
