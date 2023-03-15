<template>
  <video autoplay muted loop id="background-video">
    <source src="https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt29d7c4f6bc077e9e/5eb26f54402b8b4d13a56656/agent-background-generic.mp4" type="video/mp4">
  </video>
  <p id="maps-title">STATS</p>
  <div id="inputs-container">
    <input type="text" placeholder="Enter your nickname" id="stats-input" maxlength="24">
    <span id="between-input">#</span>
    <input type="text" placeholder="Tag" id="tag-input">
  </div>
  <p class="stats-subtitles">PROFILE INFORMATION</p>
  <ul id="stats-list">
    <li>
      <div id="stats-presentation">
        <img src="@/assets/resources/rank.png" id="rank-img" alt="rank" draggable="false">
        <div id="stats-bottom">
          <p id="stats-type">RANK</p>
        </div>
      </div>
    </li>
    <li>
      <div id="stats-presentation">
        <img src="@/assets/resources/elo.png" id="elo-img" alt="elo" draggable="false">
        <div id="stats-bottom">
          <p id="stats-type">ELO</p>
        </div>
      </div>
    </li>
    <li>
      <div id="stats-presentation">
        <img src="@/assets/resources/level.png" id="level-img" alt="level" draggable="false">
        <div id="stats-bottom">
          <p id="stats-type">LEVEL</p>
        </div>
      </div>
    </li>
    <li>
      <div id="stats-presentation">
        <img src="@/assets/resources/replay.png" id="games-img" alt="replay" draggable="false">
        <div id="games-bottom">
          <p id="stats-type">MATCHS</p>
        </div>
      </div>
    </li>
  </ul>
  <ul id="stats-list2">
    <li>
      <div id="stats-presentation">
        <img src="@/assets/resources/progress.png" id="rank-img" alt="progress" draggable="false">
        <div id="stats-bottom">
          <p id="stats-type">PROGRESS</p>
        </div>
      </div>
    </li>
    <li>
      <div id="stats-presentation">
        <img src="@/assets/resources/elo.png" id="elo-img" alt="mmr" draggable="false">
        <div id="stats-bottom">
          <p id="stats-type">MMR</p>
        </div>
      </div>
    </li>
    <li>
      <div id="stats-presentation">
        <img src="@/assets/resources/details.png" id="details-img" alt="details" draggable="false">
        <div id="stats-bottom">
          <p id="stats-type">DETAILS</p>
        </div>
      </div>
    </li>
    <li>
      <div id="stats-presentation">
        <img src="@/assets/resources/more.png" id="more-img" alt="more" draggable="false">
        <div id="games-bottom">
          <p id="stats-type">MORE</p>
        </div>
      </div>
    </li>
  </ul>
  <p class="stats-subtitles">LEADERBOARDS</p>
  <div id="leaderboard-switcher">
    <ul id="region-list">
      <span id="selector"></span>
      <li class="region-text" v-on:click="switchRegion('eu')">EU</li>
      <li class="region-text" v-on:click="switchRegion('na')">NA</li>
      <li class="region-text" v-on:click="switchRegion('ap')">AP</li>
      <li class="region-text" v-on:click="switchRegion('kr')">KR</li>
    </ul>
  </div>
  <ul id="leaderboard-list">
    <li>
      <div id="stats-leaderboard">
        <ul>
          <li><div id="lds-ripple-stats"><div></div><div></div></div></li>
          <li v-for="player in leaderboardsList" :key="player" id="leaderboard-text"><span v-if="player.gameName !== ''">{{ player.leaderboardRank }} <span style="color: var(--red-color)">•</span> {{ player.gameName }}#{{ player.tagLine }}</span><span v-if="player.gameName === ''">{{ player.leaderboardRank }} <span style="color: var(--red-color)">•</span> [ Anonymous player ]</span></li>
        </ul>
      </div>
    </li>
  </ul>
  <p class="stats-subtitles">MATCH HISTORY</p>
  <ul id="improve-list">
    <li class="improve-game win">
      <ul>
        <li><img id="game-agent" src="https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayiconsmall.png" alt="agent"></li>
        <li><img src="@/assets/resources/spike-icon.png" id="spike-icon" alt="spike"></li>
        <li id="kd-text">KDA</li>
        <li id="kd-value">33/2/10</li>
        <li>
          <ul>
            <li>VICTORY</li>
            <li>13-10</li>
          </ul>
        </li>
      </ul>
    </li>

    <li class="improve-game win">
      <ul>
        <li><img id="game-agent" src="https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/displayiconsmall.png" alt="agent"></li>
        <li><img src="@/assets/resources/spike-icon.png" id="spike-icon" alt="spike"></li>
        <li id="kd-text">KDA</li>
        <li id="kd-value">20/6/4</li>
        <li>
          <ul>
            <li>VICTORY</li>
            <li>13-4</li>
          </ul>
        </li>
      </ul>
    </li>

    <li class="improve-game lose">
      <ul>
        <li><img id="game-agent" src="https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayiconsmall.png" alt="agent"></li>
        <li><img src="@/assets/resources/spike-icon.png" id="spike-icon" alt="spike"></li>
        <li id="kd-text">KDA</li>
        <li id="kd-value">9/12/6</li>
        <li>
          <ul>
            <li>DEFEAT</li>
            <li>8-13</li>
          </ul>
        </li>
      </ul>
    </li>
 </ul>

</template>

<script>
/**
 * @author Keinz & Vaidio
 * @project valostats-website
 * @date 26/06/2022
 */

import axios from "axios";

require("../../assets/css/stats.css");
import "../../assets/css/stats.css";
import config from "@/assets/config/config.json";

export default {
  name: "StatsComponent",

  data() {
    return {
      leaderboardsList: null,
      region: "eu",
    }
  },

  methods: {
    switchRegion(region) {
      let selector = document.getElementById('selector').style;
      selector.transition = "0.25s ease-in-out";

      if (region === "eu") {
        selector.transform = "translateX(-74px)";
        this.region = region;

        if (sessionStorage.getItem("leaderboard/" + region) !== null && sessionStorage.getItem("leaderboard/" + region).split(',').length === 20) {
          let playerList = [];

          for (let player of sessionStorage.getItem("leaderboard/" + region).split(',')) {
            playerList.push({
              leaderboardRank : player.split('#')[0],
              gameName : player.split('#')[1],
              tagLine : player.split('#')[2]
            })
          }

          this.leaderboardsList = playerList;
        } else {
          this.reloadLeaderboard(region);
        }
      }

      if (region === "na") {
        selector.transform = "translateX(-25px)";
        this.region = region;

        if (sessionStorage.getItem("leaderboard/" + region) !== null && sessionStorage.getItem("leaderboard/" + region).split(',').length === 20) {
          let playerList = [];

          for (let player of sessionStorage.getItem("leaderboard/" + region).split(',')) {
            playerList.push({
              leaderboardRank : player.split('#')[0],
              gameName : player.split('#')[1],
              tagLine : player.split('#')[2]
            })
          }

          this.leaderboardsList = playerList;
        } else {
          this.reloadLeaderboard(region);
        }
      }

      if (region === "ap") {
        selector.transform = "translateX(25px)";
        this.region = region;

        if (sessionStorage.getItem("leaderboard/" + region) !== null && sessionStorage.getItem("leaderboard/" + region).split(',').length === 20) {
          let playerList = [];

          for (let player of sessionStorage.getItem("leaderboard/" + region).split(',')) {
            playerList.push({
              leaderboardRank : player.split('#')[0],
              gameName : player.split('#')[1],
              tagLine : player.split('#')[2]
            })
          }

          this.leaderboardsList = playerList;
        } else {
          this.reloadLeaderboard(region);
        }
      }

      if (region === "kr") {
        selector.transform = "translateX(74px)";
        this.region = region;

        if (sessionStorage.getItem("leaderboard/" + region) !== null && sessionStorage.getItem("leaderboard/" + region).split(',').length === 20) {
          let playerList = [];

          for (let player of sessionStorage.getItem("leaderboard/" + region).split(',')) {
            playerList.push({
              leaderboardRank : player.split('#')[0],
              gameName : player.split('#')[1],
              tagLine : player.split('#')[2]
            })
          }

          this.leaderboardsList = playerList;
        } else {
          this.reloadLeaderboard(region);
        }
      }
    },

    reloadLeaderboard(region) {
      this.loading();
      this.leaderboardsList = null;

      axios.get(config.api_url + "leaderboard/" + region + "/20")
          .then((res) => {
            if (res.status === 200) {
              this.leaderboardsList = res.data.data;

              this.loaded();
              this.saveLeaderboard(region);
            }
          })
          .catch((err) => {
            console.log(err);
          })
    },

    saveLeaderboard(region) {
      sessionStorage.removeItem("leaderboard/" + region);

      this.leaderboardsList.forEach((player) => {
        let oldSavedLeaderboard = sessionStorage.getItem("leaderboard/" + region);

        if (oldSavedLeaderboard !== null) {
          if (player.gameName !== "") {
            sessionStorage.setItem("leaderboard/" + region, oldSavedLeaderboard + "," + player.leaderboardRank + "#" + player.gameName + "#" + player.tagLine);
          } else {
            sessionStorage.setItem("leaderboard/" + region, oldSavedLeaderboard + "," + player.leaderboardRank + "#");
          }
        } else {
          if (player.gameName !== "") {
            sessionStorage.setItem("leaderboard/" + region, player.leaderboardRank + "#" + player.gameName + "#" + player.tagLine);
          } else {
            sessionStorage.setItem("leaderboard/" + region, player.leaderboardRank + "#");
          }
        }
      })
    },

    loading() {
      document.getElementById('lds-ripple-stats').style.display = "inline-block";
    },

    loaded() {
      document.getElementById('lds-ripple-stats').style.display = "none";
    }
  },

  mounted() {
    document.querySelectorAll(".header-link")[0].classList.add("active");
    document.querySelectorAll('.header-link-burger')[0].classList.add("active")

    const region = this.region;
    if (sessionStorage.getItem("leaderboard/" + region) !== null && sessionStorage.getItem("leaderboard/" + region).split(',').length === 20) {
      let playerList = [];

      for (let player of sessionStorage.getItem("leaderboard/" + region).split(',')) {
        playerList.push({
          leaderboardRank : player.split('#')[0],
          gameName : player.split('#')[1],
          tagLine : player.split('#')[2]
        })
      }

      this.leaderboardsList = playerList;
    } else {
      this.reloadLeaderboard(region);
    }
  }
}
</script>