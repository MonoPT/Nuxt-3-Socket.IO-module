import { defineNuxtPlugin } from '#app'
import socket from 'socket.io-client'

export default defineNuxtPlugin((nuxtApp) => {
  const io = socket("/")

  return {
    provide: {
      io
    }
  }
})
