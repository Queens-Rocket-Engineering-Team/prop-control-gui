<script setup>
import { ref, onMounted } from "vue";
import { invoke } from "@tauri-apps/api/core";

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
  <div id="server-bar">
      <div id="server-select">
        <form @submit.prevent="submitIP(ip_address)">
          Server IP: 
          <input type="text" v-model="ip_address">
          <input type="submit" value="Connect">
        </form>
      </div>
      <div id="server-health">
        <p>Server Health: {{ server_status }}</p>
      </div>
    </div>
</template>