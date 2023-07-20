<template lang="">
    <error-popup v-if="errors.status" :description="errorDescription" />

    <div class="explanation">
        <p>Подтверждение через почту</p>
        <p>Введите код, направленный на почту {{ email }}</p>
        <p>Письмо возможно попадает в спам</p>
    </div>

    <input-form
        class="inputCode"
        :inputName="'code'"
        :inputType="'text'"
        :autocomplete="'off'"
        v-model:inputValue="code"
        @input="updateInput()"
        :inputPlaceholder="'Код подтверждения с Email'"
        :error="errors.status"
    />

    <div class="container">
        <button-form
            class="buttonCode"
            v-bind:buttonValue="'Отправить'"
            v-bind:buttonType="'submit'"
        />

        <p v-if="time == 0" class="resend" @click="resend">
            Отправить повторно
        </p>
        <p v-else>
            Повторно через <span>{{ time }}s</span>
        </p>
    </div>
</template>
<script>
import inputForm from "./UI/inputForm";
import buttonForm from "./UI/buttonForm";
import ErrorPopup from "./UI/errorPopup";

import { registration } from "@/http/userApi";
export default {
    components: { inputForm, buttonForm, ErrorPopup },
    name: "code-popup",
    data() {
        return {
            code: "",
            time: 1,
            interval: "",
            
        };
    },
    props: {
        email: {
            require: true,
            type: String,
        },
        errors:{

        }
    },
    computed: {
        errorDescription: function () {
            
                if (this.errors.code.status === true) {
                    return this.errors.code.description;
                }
            
            return "";
        },
    },
    methods: {
        updateInput() {
            this.$emit("updateCode", this.code);
        },
        resend() {
            registration("abc", "darksunset2001@gmail.com1", "abc");
            this.time = 90;
        },
    },
    watch: {
        time: function (value, oldValue) {
            if (value <= 0) return;
            if (++value == oldValue || oldValue <= 0)
                setTimeout(() => --this.time, 1000);
        },
    },
    emits: ["updateCode", "submit"],

    mounted() {
        this.time--;
    },
};
</script>
<style scoped lang="scss">
.explanation {
    p {
        text-align: center;

        &:nth-child(1) {
            font-size: 50px;
            color: #4786ff;
            margin-bottom: 10px;
        }

        &:nth-child(2) {
            font-size: 35px;
            color: black;
        }

        &:nth-child(3) {
            font-size: 28px;
            color: #959595;
        }
    }
}

.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    p {
        text-align: center;
        font-size: 24px;

        span {
            color: #4786ff;
        }
    }

    .resend {
        text-decoration: underline;
        color: #4786ff;
        cursor: pointer;
    }
}

.inputCode {
    max-width: 600px;
    margin: 0 auto;
}

.buttonCode {
    max-width: 600px;
    margin: 0 auto;
}
</style>
