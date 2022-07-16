import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import { Server } from 'socket.io'
import errorOut from './runtime/errorOut'

export interface ModuleOptions {
  socketFunctions: (io) => void
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-internal-Socket',
    configKey: 'socketIO'
  },
  defaults: {
    socketFunctions: null
  },
  async setup (options, nuxt) {
    if(!options.socketFunctions) {
      errorOut("Please provide socket function")
      await nuxt.close();
      throw new Error ("Please provide socket function");
    }

    nuxt.hook("listen", (server) => {
      const io = new Server(server);
      options.socketFunctions(io);
    })



    
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin({
      src: resolve(runtimeDir, 'plugin'),
      mode: "client"
    })
    
  }
})
