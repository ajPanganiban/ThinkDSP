<template>
  <router-view/>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { label: 'Home', icon: 'pi pi-fw pi-home', to: '/' },
        { label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login' }
      ]
    }
  }
}
</script>
