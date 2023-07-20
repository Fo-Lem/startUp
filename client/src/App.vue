<template>
    <div class="row" :class="[isAuth ? 'row-profile' : '', 'row']">
        <nav v-if="!isAuth && !codePopupOpen">
            <router-link class="router-link" to="/signIn">Вход</router-link>
            <router-link class="router-link" to="/login">Регистрация</router-link>
        </nav>
        <router-view
            :user="user"
            :isAuth="isAuth"
            @isAuth="authorization"
            @codePopupOpen="codePopupOpen = !codePopupOpen"
        />
    </div>
</template>
<script>
import { check } from "./http/userApi";

export default {
    data() {
        return {
            isAuth: false,
            codePopupOpen: false,
            user: {},
        };
    },
    methods: {
        authorization() {
            this.isAuth = true;
            check()
                .then((data) => {
                    this.user = {
                        id: data.id,
                        name: data.name,
                        surname: data.surname,
                        email: data.email,
                        avatar: data.avatar,
                    };
                    this.$router.push({ name: "profile" });
                })
                .catch((error) => {
                    this.isAuth = false;
                    this.$router.push({ name: "authorizationForm" });
                    console.log(error.response.data);
                });
        },
    },

    created() {
        this.authorization();
    },
};
</script>
<style lang="scss">
* {
    color: #686868;
    font-family: Roboto;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
<style scoped lang="scss">
.row {
    margin: 100px auto;
    padding: 50px;
    width: 1040px;
    min-height: 824px;
    flex-shrink: 0;
    border-radius: 30px;
    background: #fff;
    box-shadow: 0px 10px 25px 0px rgba(92, 99, 105, 0.2);
    transition: height 1s;

    &-profile {
        height: auto;
        min-height: auto;
    }

    nav {
        font-size: 30px;
        display: flex;
        gap: 50px;
        margin-bottom: 70px;

        .router-link {
            color: #2c3e50;
            text-decoration: none;
            color: #686868;

            &:hover {
                color: #4786ff;
            }

            &-active {
                color: #4786ff;
                text-decoration: underline;
            }
        }
    }
}
</style>
