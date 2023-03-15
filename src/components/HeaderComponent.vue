<template>
  <header id="header-tag">
    <div id="header">
      <ul id="header-logos">
        <li><img src="@/assets/resources/riot-logo.png" alt="RiotGames logo" id="riot-logo" draggable="false"></li>
        <li><div id="header-separation"></div></li>
        <li><img src="@/assets/resources/valorant-logo.png" alt="Valorant logo" id="valorant-logo" draggable="false"></li>
      </ul>

      <ul id="header-list">
        <li><a href="/stats" class="header-link">STATS</a></li>
        <li><a href="/agents" class="header-link">AGENTS</a></li>
        <li><a href="/maps" class="header-link">MAPS</a></li>
        <li><a href="/weapons" class="header-link">WEAPONS</a></li>
      </ul>

      <div id="menu-container">
        <ion-icon name="add-outline" id="menu" v-on:click="openBurgerMenu()"></ion-icon>
      </div>

      <div id="btn-container">
        <button id="header-btn">
          <div>
            <span></span>
            <a href="https://playvalorant.com/">Visit Valorant website</a>
          </div>
        </button>
      </div>
    </div>

    <ul id="header-list-burger">
      <li><a href="/stats" class="header-link-burger">STATS</a></li>
      <li><a href="/agents" class="header-link-burger">AGENTS</a></li>
      <li><a href="/maps" class="header-link-burger">MAPS</a></li>
      <li><a href="/weapons" class="header-link-burger">WEAPONS</a></li>
    </ul>
  </header>
</template>

<script>
/**
 * @author Keinz & Vaidio
 * @project valostats-website
 * @date 25/06/2022
 */

require("../assets/css/header.css");
import "../assets/css/header.css";

export default {
  name: "HeaderComponent",

  methods: {
    openBurgerMenu() {
      let header = document.getElementById('header-tag');

      if (header.classList.contains('menu-active')) {
        header.classList.remove('menu-active');
      } else {
        header.classList.add('menu-active');
      }
    }
  }
}
</script>