<template lang="">
    <div>
        <input
            :class="['input-form', inputValue ? 'input-form-data' : '']"
            :autocomplete="autocomplete"
            :type="inputType"
            :placeholder="inputPlaceholder"
            :name="inputName"
            :value="inputValue"
            :id="inputName"
            :disabled="isDisabled"
            @blur="
                () => {
                    isDisabled = inputValue != '' ? false : true;
                }
            "
            @input="updateInput($event)"
        />
        <label @click="isDisabled = false" class="label-form" :for="inputName">
            <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                ></path>
            </svg>
        </label>
    </div>
</template>
<script>
export default {
    name: "input-profile",
    data() {
        return {
            isDisabled: true,
        };
    },

    props: {
        autocomplete: {
            type: String,
            default: "on",
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
        error: {
            type: Boolean,
        },
    },
    methods: {
        updateInput(event) {
            this.$emit("update:inputValue", event.target.value);
        },
    },

    emits: ["update:inputValue"],
};
</script>
<style scoped lang="scss">
div {
    position: relative;
    display: flex;
    gap: 10px;
    width: 480px;

    .label-form {
        position: absolute;
        width: 40px;
        height: 40px;
        top: 15px;
        right: 20px;

        svg {
            stroke: #4786ff;

            &:hover {
                stroke: #ffffff;
            }
        }
    }

    .input-form {
        white-space: nowrap;
        overflow: hidden;

        text-overflow: ellipsis;
        color: black;
        font-size: 32px;
        width: 100%;
        background-color: #c8dbff;
        border-radius: 10px;
        border: 2px solid #c8dbff;
        padding: 15px 70px 15px 50px;

        &:focus-within {
            outline: #4786ff auto 1px;
            background-color: #ffffff;
            caret-color: #4786ff;

            &::placeholder {
                color: #ffffff;
            }
        }

        &::placeholder {
            color: #4786ff;
        }

        &-data {
            background-color: #ffffff;
        }
    }
}
</style>
