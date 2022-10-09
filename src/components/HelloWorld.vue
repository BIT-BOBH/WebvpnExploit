<script setup>
import { ref } from 'vue'
import webassembly from '../webassembly'
defineProps({
  msg: String
})

const count = ref(0)
let CallFib = ()=>{
  let res = webassembly.Fib(6);
  alert("Fib(6) is " + res);
}

const CommitHash = import.meta.env.VITE_COMMIT_HASH || "No commit hash";
const AppName = import.meta.env.VITE_APP_NAME || "No App Name";
const API_URL = import.meta.env.VITE_API_URL || "error!";
const BUILD_MODE = import.meta.env.VITE_BUILD_MODE;
const BuildTime = import.meta.env.VITE_BUILD_TIME;
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <button type="button" @click="CallFib()">Call fib() from wasm!</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <p>
    AppName: {{ AppName }}
    <br/>
    BuildTime: {{ BuildTime }}
    <br/>
    CommitHash: {{ CommitHash }}
    <br/>
    API_URL: {{ API_URL }}
    <br/>
    BUILD_MODE: {{ BUILD_MODE }}
  </p>
  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
