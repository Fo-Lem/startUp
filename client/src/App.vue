<template>
  <div class="row">
    <nav v-if="!isAuth">
      <router-link class="router-link" to="/signIn">Вход</router-link>
      <router-link class="router-link" to="/login">Регистрация</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
import { check } from './http/userApi'

export default {
  data() {
    return {
      isAuth: false,
    }
  },

  beforeMount() {

    check().then(data => {
      console.log(data)

    }).catch(error => {
      console.error(error.response.data);
    })


    if (this.isAuth == true) {
      this.$router.push({ path: 'profile' })
    }
  }
}




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
  margin: 0 auto;
  padding: 50px;
  width: 1040px;
  height: 824px;
  flex-shrink: 0;
  border-radius: 30px;
  background: #FFF;
  box-shadow: 0px 10px 25px 0px rgba(92, 99, 105, 0.20);

  nav {
    font-size: 30px;
    display: flex;
    gap: 50px;
    margin-bottom: 50px;

    .router-link {
      color: #2c3e50;
      text-decoration: none;
      color: #686868;

      &:hover {
        color: #4786FF;
      }

      &-active {
        color: #4786FF;
        text-decoration: underline;
      }
    }




  }
}
</style>
