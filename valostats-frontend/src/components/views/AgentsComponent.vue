<template>
  <main>
    <video autoplay muted loop id="background-video">
      <source src="https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt29d7c4f6bc077e9e/5eb26f54402b8b4d13a56656/agent-background-generic.mp4" type="video/mp4">
    </video>
    <div id="lds-ripple-map"><div></div><div></div></div>
    <p id="maps-title">AGENTS</p>
    <input type="text" placeholder="Search for an agent" id="agent-input" v-on:keyup="search()">
    <ul id="agent-list">
      <li v-for="agent in agents" :key="agent">
        <a href="#">
          <div id="agents-container">
            <p id="agents-name">{{ agent.displayName }}</p>
            <p id="agents-subtitle">{{ agent.role }}</p>
            <img :src="agent.preview" id="agent-image" alt="agent" draggable="false" v-on:load="this.loaded()">

            <ul id="icons-list">
              <li v-for="abilities in agent.abilities" :key="abilities">
                <img :src="abilities.displayIcon" alt="ability" draggable="false" id="abilities-icon">
              </li>
            </ul>

            <div id="agents-bottom">
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
 * @date 26/06/2022
 */

import axios from "axios";

require("../../assets/css/agents.css");
import "../../assets/css/agents.css";
import config from "@/assets/config/config.json";

export default {
  name: "AgentsComponent",

  data() {
    return {
      agents: null,
    }
  },

  methods: {
    search() {
      let searchValue = document.getElementById('agent-input').value.toUpperCase();
      let agentCards = document.querySelectorAll('#agents-container');

      if (searchValue !== "") {
        agentCards.forEach((card) => {
          if (!card.firstChild.innerText.toUpperCase().includes(searchValue)) {
            card.style.display = "none";
          } else {
            card.style.display = "block";
          }
        });
      } else {
        agentCards.forEach((card) => {
          card.style.display = "block";
        })
      }
    },
    loading() {
      document.getElementById('lds-ripple-map').style.display = "inline-block";
      document.getElementById('agent-list').style.display = "none";
    },

    loaded() {
      document.getElementById('lds-ripple-map').style.display = "none";
      document.getElementById('agent-list').style.display = "flex";
    }
  },

  mounted() {
    this.loading();

    document.querySelectorAll('.header-link')[1].classList.add("active");
    document.querySelectorAll('.header-link-burger')[1].classList.add("active");

    axios.get(config.api_url + "agents")
        .then((res) => {
          this.agents = res.data.agents;
        })
        .catch((err) => {
          console.log(err);
        });
  }
}
</script>