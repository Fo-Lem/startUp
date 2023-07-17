<template lang="">
    <form @reset="reset">
        <div class="form-rows">
            <drop-zone
                @uploadPhoto="uploadPhoto"
                :user="user"
                :photo="updateUser.newPhoto"
            />
            <div class="inputs">
                <input-profile
                    :inputName="'name'"
                    :inputType="'name'"
                    :autocomplete="'off'"
                    v-model:inputValue="updateUser.newName"
                    :inputPlaceholder="user.name"
                />
                <input-profile
                    :inputName="'email'"
                    :inputType="'email'"
                    :autocomplete="'off'"
                    v-model:inputValue="updateUser.newEmail"
                    :inputPlaceholder="user.email"
                />
                <input-profile
                    :inputName="'password1'"
                    :inputType="'password'"
                    :autocomplete="'off'"
                    v-model:inputValue="updateUser.newPassword1"
                    :inputPlaceholder="'Пароль'"
                />
                <input-profile
                    :inputName="'password2'"
                    :inputType="'password'"
                    :autocomplete="'off'"
                    v-model:inputValue="updateUser.newPassword2"
                    :inputPlaceholder="'Повтор пароля'"
                />
            </div>
        </div>
        <div class="buttons">
            <button-form
                v-bind:buttonType="'submit'"
                v-bind:buttonValue="'Сохранить'"
            />

            <button-form
                v-bind:buttonType="'reset'"
                v-bind:buttonValue="'Отмена'"
            />
        </div>
    </form>
</template>
<script>
import ButtonForm from "./UI/buttonForm.vue";
import DropZone from "./UI/dropZone.vue";
import InputProfile from "./UI/inputProfile.vue";

export default {
    components: { InputProfile, DropZone, ButtonForm },
    data() {
        return {
            updateUser: {
                newName: "",
                newEmail: "",
                newPassword1: "",
                newPassword2: "",
                newPhoto: "",
            },
        };
    },
    props: {
        user: {
            type: Object,
        },
        isAuth: {
            type: Boolean,
        },
    },
    methods: {
        uploadPhoto(photo) {
            this.updateUser.newPhoto = photo;
        },
        reset() {
            this.updateUser = {
                newName: "",
                newEmail: "",
                newPassword1: "",
                newPassword2: "",
                newPhoto: "",
            };
        },
    },
    beforeMount() {
        if (!this.isAuth) {
            this.$router.push({ path: "signIn" });
        }
    },
};
</script>
<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    gap: 50px;
    .form-rows {
        display: flex;
        gap: 50px;
        .inputs {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }
    .buttons {
        display: flex;
        gap: 50px;
        padding: 0 160px;
        input {
            &:nth-child(1) {
                width: 340px;
                padding: 20px 20px;
            }
            &:nth-child(2) {
                width: 230px;
                padding: 20px 20px;
            }
        }
    }
}
</style>
