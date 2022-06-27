<template>
  <HeaderComponent/>
  <RouterView/>
  <FooterComponent/>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";

export default {
  name: 'App',
  components: {
    FooterComponent,
    HeaderComponent
  }
}
</script>