<script setup>
import { computed, onMounted, ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

//import the windows as they are defined in their own vue files
import welcome_panel from "./windows/welcome_panel.vue";
import camera_panel from "./windows/camera_panel.vue";
import graph_panel from "./windows/graph_panel.vue";
import control_panel from "./windows/control_panel.vue";
import debug_panel from "./windows/debug_panel.vue";
import flight_panel from "./windows/flight_panel.vue";


const window_content = ref(welcome_panel); //initializes the functional window content to the welcome panel.
//changes the content of the functional window to the inputted compnent
function setActive(component) {
  window_content.value = component;
}

//collapse or expand navbar on button press.
//TODO: Use jquery or something to make it prettier
function collapseNavbar() {
  const collapseDiv = document.getElementById("collapse");
  if (collapseDiv.style.display === "none" || collapseDiv.style.display === "") {
    collapseDiv.style.display = "block";
  } else {
    collapseDiv.style.display = "none";
  }
}

const ip_address = ref("");
const server_status = ref("");
async function fetchServerHealth() {
  invoke("fetch_server_health")
    .then((status) => {
      server_status.value = status;
    })
    .catch((error) => {
      server_status.value = "Error fetching server health:" + error;
      console.error("Error fetching server health:", error);
    });
}
//sends the entered ip address to the backend
async function submitIP(ip){
  invoke("submit_ip", {newIp: ip});
}

onMounted(() => {
  // Set up periodic health fetching every 0.5 seconds
  setInterval(fetchServerHealth, 500);
});

</script>

<template>
  <main class="container">
    <div id="grid-container">
        <div id="navbar" >
          <img src="./assets/dropdown.svg" width="30px" @click="collapseNavbar()" />
          <div id="collapse">
            <div id="nav-upper">
              <button @click="setActive(control_panel)">Control</button>
              <button @click="setActive(graph_panel)">Data</button>
              <button @click="setActive(camera_panel)">Camera View</button>
              <button @click="setActive(debug_panel)">Debug</button>
              <button @click="setActive(flight_panel)">Flight</button>
            </div>
            <div id="nav-lower">
              <button @click="setActive(welcome_panel)">Welcome</button>
            </div>
          </div>
        </div>
        <component :is="window_content" class="swap-container"></component>
      </div>
      <div id="server-bar">
        <div id="server-select">
          <form @submit.prevent="submitIP(ip_address)">
            Server IP: 
            <input type="text" v-model="ip_address">
            <input type="submit" value="Connect">
          </form>
          <p>{{ ip_address }}</p>
        </div>
        <div id="server-health">
          <p>Server Health: {{ server_status }}</p>
        </div>
      </div>


  </main>
</template>


