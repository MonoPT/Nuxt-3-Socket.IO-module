import { defineNuxtConfig } from 'nuxt'
import socket from '..'
import socketFunction from './sockets/index'

export default defineNuxtConfig({
  modules: [
    socket
  ],
  socketIO: {
    socketFunctions: socketFunction
  }
})
