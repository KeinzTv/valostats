<template>
  <main>
    <video autoplay muted loop id="background-video">
      <source src="https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt29d7c4f6bc077e9e/5eb26f54402b8b4d13a56656/agent-background-generic.mp4" type="video/mp4">
    </video>
    <div id="lds-ripple-map"><div></div><div></div></div>
    <p id="weapons-title">WEAPONS</p>
    <input type="text" placeholder="Search for a weapon" id="weapon-input" autocomplete="off" v-on:keyup="search()">
    <ul id="weapon-list">
      <li v-for="item in weaponsList" :key="item">
        <a href="#">
          <div id="weapon-container">
            <div id="weapon-redcard">
              <img v-if="item.displayName !== 'Classic'" :src="item.preview" id="weapon-img" alt="weapon" draggable="false" v-on:load="this.loaded()">
              <img v-if="item.displayName === 'Classic'" :src="item.preview" id="weapon-img" style="width: fit-content; height: 82px;" alt="weapon" draggable="false" v-on:load="this.loaded()">
              <div>
                <img v-if="item.displayName !== 'Classic'" src="@/assets/resources/coins.png" id="coins-icon" alt="coin" draggable="false">
                <p id="weapon-cost" v-if="item.cost !== 0">{{ item.cost }}</p>
              </div>
            </div>
            <p id="weapon-name">{{ item.displayName }}</p>
            <p id="weapon-type">{{ item.category }}</p>
          </div>
        </a>
      </li>
    </ul>
  </main>
</template>

<script>
/**
 * @author Keinz & Vaidio
 * @project valostats-website
 * @date 25/06/2022
 */

import axios from "axios";

require("../../assets/css/weapons.css");
import "../../assets/css/weapons.css";
import config from "@/assets/config/config.json";

export default {
  name: "WeaponComponent",

  data() {
    return {
      weaponsList: null,
    }
  },

  methods: {
    search() {
      let searchValue = document.getElementById('weapon-input').value.toUpperCase();
      let weaponCards = document.querySelectorAll('#weapon-container');

      if (searchValue !== "") {
        weaponCards.forEach((card) => {
          if (!card.children[1].innerText.toUpperCase().startsWith(searchValue)) {
            card.style.display = "none";
          } else {
            card.style.display = "block";
          }
        });
      } else {
        weaponCards.forEach((card) => {
          card.style.display = "block";
        })
      }
    },
    loading() {
      document.getElementById('lds-ripple-map').style.display = "inline-block";
      document.getElementById('weapon-list').style.display = "none";
    },

    loaded() {
      document.getElementById('lds-ripple-map').style.display = "none";
      document.getElementById('weapon-list').style.display = "flex";
    }
  },

  mounted() {
    this.loading()

    document.querySelectorAll(".header-link")[3].classList.add("active");
    document.querySelectorAll('.header-link-burger')[3].classList.add("active");

    axios.get(config.api_url + "weapons")
        .then((res) => {
          this.weaponsList = res.data.weapons;
        })
        .catch((err) => {
          console.log(err);
        });
  }
}
</script>