<template>
  <div>
    <button @click="sendMessage">Send message</button>
    {{receivedMsg}}
  </div>
</template>

<script setup>
  const { $io } = useNuxtApp();

  const receivedMsg = ref("")

  const sendMessage = () => {
    $io.emit('message', {
      message: "hello from nuxt.js"
    });
  }

  onMounted(() => {
    $io.on('receivedMessage', (message) => {
      receivedMsg.value = message
    })
  })
</script>
