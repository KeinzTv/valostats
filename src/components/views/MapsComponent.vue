<template>
  <main>
    <video autoplay muted loop id="background-video">
      <source src="https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt29d7c4f6bc077e9e/5eb26f54402b8b4d13a56656/agent-background-generic.mp4" type="video/mp4">
    </video>
    <div id="lds-ripple-map"><div></div><div></div></div>
    <p id="maps-title">MAPS</p>
    <input type="text" placeholder="Search for a map" id="maps-input" autocomplete="off" v-on:keyup="search()">
    <ul id="map-list">
      <li v-for="item in maps" :key="item">
        <a href="#">
          <div id="maps-container">
            <p id="map-name">{{ item.displayName }}</p>
            <p id="map-subtitle">MAP</p>
            <img :src="item.preview" id="map-image" alt="map preview" draggable="false" v-on:load="this.loaded()">
            <div id="maps-bottom">
              <p id="more-text">View more</p>
              <ion-icon name="arrow-forward-outline" id="arrow-icon"></ion-icon>
            </div>
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
import config from "../../assets/config/config.json";

require("../../assets/css/maps.css");
import "../../assets/css/maps.css";

export default {
  name: "MapsComponent",

  data() {
    return {
      maps: null,
    }
  },

  methods: {
    sleep(ms) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < ms);
    },

    search() {
      let searchValue = document.getElementById('maps-input').value.toUpperCase();
      let mapCards = document.querySelectorAll('#maps-container');

      if (searchValue !== "") {
        mapCards.forEach((card) => {
          if (!card.firstChild.innerText.toUpperCase().startsWith(searchValue)) {
            card.style.display = "none";
          } else {
            card.style.display = "block";
          }
        });
      } else {
        mapCards.forEach((card) => {
          card.style.display = "block";
        })
      }
    },

    loading() {
      document.getElementById('lds-ripple-map').style.display = "inline-block";
      document.getElementById('map-list').style.display = "none";
    },

    loaded() {
      document.getElementById('lds-ripple-map').style.display = "none";
      document.getElementById('map-list').style.display = "flex";
    }
  },

  mounted() {
    this.loading();

    document.querySelectorAll(".header-link")[2].classList.add("active");
    document.querySelectorAll('.header-link-burger')[2].classList.add("active");

    axios.get(config.api_url + "maps")
        .then((res) => {
          this.maps = res.data.maps;
        })
        .catch((err) => {
          console.log(err);
        });
  }
}
</script>