<template>
  <!-- <form @submit.prevent="handleSubmit">
      <h1> {{ title }} </h1>
      <custom-input
          v-for="(input, i) in inputs"
          :key="i"
          v-model="input.value"
          :label="input.label"
          :type="input.type"
      />
      <button> Log in </button>
  </form> -->
  <p>This is the Login page.</p>
  <br> <br>
  <div class="col-md-6 offset-md-3">
    <div>
    <h3>Login</h3>
  </div>
  <box>
    <form>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" />
      </div>
      <div class="my-3">
        <button type="submit" class="btn btn-primary">
          Login
        </button>
      </div>
    </form>
  </box>
  </div>
</template>
