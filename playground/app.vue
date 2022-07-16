<template>
  <div>
    <div>Current Room: {{currentRoom}}</div><br><br>
    <button @click="sendMessage">Send message</button><br>

    <div><b>Messages:</b> 
      <span v-for="msg in receivedMsg.reverse()"><br> {{msg}}</span>
    </div>
  
    <br><br>
    <h2>Select rooms</h2>
    <button @click="joinRoom('Default')">Default</button><button @click="joinRoom('room')">Room</button><button @click="joinRoom('redRoom')">redRoom</button>
  </div>
</template>

<script setup lang="ts">
  const { $io } = useNuxtApp();

  const receivedMsg = ref([])
  const currentRoom = ref("Default")

  const sendMessage = () => {
    $io.emit('message', {
      message: "hello from nuxt.js"
    });
  }

  const joinRoom = (roomName: string) => {
    $io.emit('joinRoom', roomName);
  }

  onMounted(() => {
    $io.on('receivedMessage', (message) => { ///await for received messages
      receivedMsg.value.push(message);
    })

    $io.on('joinedRoom', (newRoom) => { ///await for received messages
      currentRoom.value = newRoom
    })
  })
</script>
