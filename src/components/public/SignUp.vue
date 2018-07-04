<template>
  <div class="box">
    <div class="companyName">Good Citizen Network</div>
    <div class="inputs">
      <div class="field">
        <label for="">Email</label>
        <input
          v-model="email"
          type="text"
          placeholder="Email">
      </div>
      <div class="field">
        <label for="">First Name</label>
        <input
          v-model="firstName"
          type="text"
          placeholder="Good">
      </div>
      <div class="field">
        <label for="">Last Name</label>
        <input
          v-model="lastName"
          type="text"
          placeholder="Citizen">
      </div>
      <div class="field">
        <input
          v-model="password"
          type="password"
          placeholder="Password">
      </div>
    </div>
    <div>
      <button @click="create">
        Sign Up
      </button>
    </div>
    <div class="linkBlock">
      <router-link
        class="link"
        to="login"
      >
        Already have an account? Login
      </router-link>
    </div>
  </div>
</template>

<script>
// import { GC_USER_ID, GC_AUTH_TOKEN } from '../../constants/settings'
// import { CREATE_USER_MUTATION, SIGNIN_USER_MUTATION } from '../../constants/graphql'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['authenticated'])
  },
  methods: {
    create () {
      this.$store.dispatch('createUser',
        {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password
        }
      )
    },
    ...mapActions(['logout'])
  }
  // methods: {
  //   handleAuthenticate () {
  //     const { name, email, password } = this.$data
  //     if (this.login) {
  //       this.$apollo.mutate({
  //         mutation: SIGNIN_USER_MUTATION,
  //         variables: {
  //           email,
  //           password
  //         }
  //       }).then((result) => {
  //         const id = result.data.signinUser.user.id
  //         const token = result.data.signinUser.token
  //         this.saveUserData(id, token)
  //       }).catch((error) => {
  //         alert(error)
  //       })
  //     } else {
  //       this.$apollo.mutate({
  //         mutation: CREATE_USER_MUTATION,
  //         variables: {
  //           name,
  //           email,
  //           password
  //         }
  //       }).then((result) => {
  //         const id = result.data.signinUser.user.id
  //         const token = result.data.signinUser.token
  //         this.saveUserData(id, token)
  //       }).catch((error) => {
  //         alert(error)
  //       })
  //     }
  //     this.$router.push({path: '/'})
  //   },
  //   saveUserData (id, token) {
  //     localStorage.setItem(GC_USER_ID, id)
  //     localStorage.setItem(GC_AUTH_TOKEN, token)
  //     this.$root.$data.userId = localStorage.getItem(GC_USER_ID)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.box {
  width: 25vw;
  // height: 40vh;
  margin: auto;
  margin-top: 15vh;
  padding: 2vh;
  //display: flex;
  // align-items: center;
  //justify-content: center;
  text-align: center;
}
.companyName {
  margin-top: 10vh;
  color: var(--text-color1);
  font-size: 4vh;
}
.inputs {
  // margin-top: 5vh;
}
.field {
  width: 100%;
  margin-top: 3vh;
  // display: flex;
  // justify-content: center;
  // border: 1px solid black;
}
label {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
input {
  width: 100%;
  font-size: 2vh;
  // margin-top: 5vh;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: .25vh solid lightgray;
}
button {
  width: 100%;
  margin-top: 5vh;
  background-color: #efba34;
  border-radius: 3vh;
}
.linkBlock {
  margin-top: 3vh;
  .link {
    color: var(--text-color1);
  }
}
</style>
