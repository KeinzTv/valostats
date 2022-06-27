<template>
  <main>
    <p>p</p>
  </main>
</template>

<script>
/**
 * @author Keinz & Vaidio
 * @project valostats-website
 * @date 25/06/2022
 */

export default {
  name: "MainComponent",

  mounted() {
    document.querySelectorAll(".header-link")[0].classList.add("active");
    document.querySelectorAll('.header-link-burger')[0].classList.add("active");
  }
}
</script>