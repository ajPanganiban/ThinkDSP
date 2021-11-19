<template>
  <TabMenu :model="items" />
  <router-view/>
</template>

<script>

export default {
  data () {
    return {
      items: [
        { label: 'Home', icon: 'pi pi-fw pi-home', to: '/' },
        { label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login' },
        { label: 'Data', icon: 'pi pi-fw pi-save', to: '/data' },
        { label: 'Settings', icon: 'pi pi-fw pi-cog', to: '/settings' }
      ]
    }
  }
}
</script>
