<template>
  <body>
      <div class="background">
      </div>
      <form @submit.prevent="handleLogin(this.email, this.password)">
          <h3>Log in Here</h3>

          <label for="email">Email</label>
          <input type="email" placeholder="Email" v-model="email">

          <label for="password">Password</label>
          <input type="password" placeholder="Password" v-model="password">

          <button>Log In</button>

          <br> <br>
          <p v-if=loginError>Invalid email or password. Please try again.</p>
      </form>
  </body>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      password: '',
      token: '',
      loginError: null
    }
  },
  methods: {
    handleLogin (email, password) {
      return fetch('https://6r2vsddzt9.execute-api.ap-southeast-1.amazonaws.com/api/login', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(res => {
          if (res.status !== 200) {
            this.loginError = 'error'
          } else {
            (res.json())
              .then(json => { this.token = json.token })
              .then(console.log(this.token))
              .then(this.loginError = null)
          }
        })
    }
  }
}

</script>

<style scoped>
  p{
    color: red;
    text-align: center;
    font-size: small;
  }
</style>
