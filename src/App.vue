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

const server_status = ref("");
//TODO: implement periodic fetching of server health status from backend
function fetchServerHealth() {
  invoke("fetch_server_health")
    .then((status) => {
      server_status.value = status;
    })
    .catch((error) => {
      server_status.value = "Error fetching server health:" + error;
      console.error("Error fetching server health:", error);
    });
}

onMounted(() => {
  // Set up periodic fetching every 0.5 seconds
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
      <div class="server-health">
        <p>Server Health: {{ server_status }}</p>
      </div>


  </main>
</template>

<style>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: #0f0f0f;
  background-color: #f6f6f6;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

/* Prevent page-level scrolling and avoid box-sizing overflow */
html, body, #app {
  height: 100%;
  margin: 0;
  overflow: hidden; /* disable scrolling */
}

*, *::before, *::after {
  box-sizing: border-box;
}

main {
  /* main covers full viewport height */
  height: 100vh;
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #f6f6f6;
    background-color: #2f2f2f;
  }

  a:hover {
    color: #24c8db;
  }

  button:active {
    background-color: #0f0f0f69;
  }
}

.container {
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

h1 {
  text-align: center;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  color: #ffffff;
  background-color: #0f0f0f98;
  cursor: pointer;
}

button:hover {
  border-color: #396cd8;
}
button:active {
  border-color: #396cd8;
  background-color: #e8e8e8;
}

#grid-container {
  display: grid;
  /* Make the left column auto-sized (nav) and the right column take remaining space */
  grid-template-columns: auto 1fr;
  /* remove the gap so the borders can meet flush */
  gap: 0;
  height: 100%;
}

#navbar {
  /* Make pretty border */
  /* left-side nav: draw left/ top/ bottom borders and round outer (left) corners */
  border-top: #2d5868 2px solid;
  border-left: #2d5868 2px solid;
  border-bottom: #2d5868 2px solid;
  border-radius: 10px 0 0 0;

  /* let the grid column determine width instead of forcing 25% */
  width: auto;
  padding: 10px;
  text-align: left;
}

#navbar button {
  width: 100%;
  margin-top: 2pt;
  margin-bottom: 2pt;
}

#nav-bottom {
  position: bottom;
}

.swap-container {
  /* Make pretty border */
  border: #2d5868 2px solid;  
  /* round only the outer (right) corners so adjacent edges meet flush */
  border-radius: 0 10px 0 0;
  padding: 10px;
  text-align: left;
}

.camera_control {
  text-align: center;
}

.server-health {
  background-color: #202020;
  font-size: 14px;
  text-align: right;
  border-bottom: #2d5868 2px solid;
  border-right: #2d5868 2px solid;
  border-left: #2d5868 2px solid;
  border-radius: 0 0 10px 10px;
  padding-right: 2%;
  padding-left: 2%;
}

</style>
