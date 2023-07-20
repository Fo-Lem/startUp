<template lang="">
    <div>
    <error-popup
            v-if="errors.status"
            :description="errorDescription"
            @closeErrorPopup="errors.status = false"
        />
    <form @submit.prevent="updateUser" @reset="reset">
        <div class="form-rows">
            <drop-zone
                @uploadPhoto="uploadPhoto"
                :user="user"
                :photo="updateUserData.newPhoto"
            />
            <div class="inputs">
                <input-profile
                    :inputName="'name'"
                    :inputType="'name'"
                    :autocomplete="'off'"
                    v-model:inputValue="updateUserData.newName"
                    :inputPlaceholder="user.name"
                />
                <input-profile
                    :inputName="'email'"
                    :inputType="'email'"
                    :autocomplete="'off'"
                    v-model:inputValue="updateUserData.newEmail"
                    :inputPlaceholder="user.email"
                />
                <input-profile
                    :inputName="'password1'"
                    :inputType="'password'"
                    :autocomplete="'off'"
                    v-model:inputValue="updateUserData.newPassword1"
                    :inputPlaceholder="'Пароль'"
                />
                <input-profile
                    :inputName="'password2'"
                    :inputType="'password'"
                    :autocomplete="'off'"
                    v-model:inputValue="updateUserData.newPassword2"
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
</div>
</template>
<script>
import { update } from "@/http/userApi";
import ButtonForm from "./UI/buttonForm.vue";
import DropZone from "./UI/dropZone.vue";
import InputProfile from "./UI/inputProfile.vue";
import { fileValidator,emailValidator,passwordValidator } from "@/validator/validators";
import ErrorPopup from "./UI/errorPopup.vue";



export default {
    components: { InputProfile, DropZone, ButtonForm, ErrorPopup },
    data() {
        return {
            errors: {
                status: false,
                photo: { status: false, description: "" },
                email: { status: false, description: "" },
                password: { status: false, description: "" },
            },
            updateUserData: {
                newName: "",
                newEmail: "",
                newPassword1: "",
                newPassword2: "",
                newPhoto: "",
            },
        };
    },
    computed: {
        errorDescription: function () {
            for (const key in this.errors) {
                if (this.errors[key].status === true) {
                    return this.errors[key].description;
                }
            }
            return "";
        },
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
        async updateUser() {
            let res=true
            if(this.updateUserData.newEmail){
                res=emailValidator(this.updateUserData.newEmail)
                if(res.errorMessage){
                this.errors.status = true;
                this.errors.email.status = true;
                this.errors.email.description = res.errorMessage;
                return
                }
            }

            if(this.updateUserData.newPassword1&&this.updateUserData.newPassword2){
                res=passwordValidator(this.updateUserData.newPassword1, this.updateUserData.newPassword2)
                if(res.errorMessage){
                this.errors.status = true;
                this.errors.password.status = true;
                this.errors.password.description = res.errorMessage;
                return
                }
            }else{
                this.errors.status = true;
                this.errors.password.status = true;
                this.errors.password.description = "Повторите пароль";
                return  
            }
            console.log(res)
            if(this.updateUserData.newEmail||this.updateUserData.newPassword1){
                console.log(res)
            
                if (res===true) {
                    await update(
                        this.updateUserData.newName,
                        this.user.email,
                        this.updateUserData.newEmail,
                        this.updateUserData.newPassword1,
                        this.updateUserData.newPhoto[0],
                    ).then((res) => {
                        console.log(res)
                        this.$router.go(0)
                    }).catch((err) => {
                        console.log(err)
                    });

                } 
            }

        },
        uploadPhoto(photo) {
            if (fileValidator(photo[0])) {
                this.updateUserData.newPhoto = photo;
            } else {
                this.errors.status = true
                this.errors.photo.status = true
                this.errors.photo.description = "Формат файла не соответствует изображению"
            }



        },
        reset() {
            this.updateUserData = {
                newName: "",
                newEmail: "",
                newPassword1: "",
                newPassword2: "",
                newPhoto: "",
            };
        },
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
