<template>
  <HeaderComponent/>
  <RouterView/>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";

export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>