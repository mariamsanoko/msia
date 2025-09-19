<script setup>
const user = useSupabaseUser()
</script>

<template>
  <div>
    <h1>🚀 MS IA Academmy</h1>
    <p v-if="user">Bonjour, {{ user.email }}</p>
    <p v-else>Bienvenue, connecte-toi pour accéder aux formations</p>

    <nav>
      <ul>
        <li><NuxtLink to="/auth">Auth</NuxtLink></li>
        <li v-if="user"><NuxtLink to="/formations">Formations</NuxtLink></li>
        <li v-if="user"><NuxtLink to="/upload">Upload</NuxtLink></li>
        <li v-if="user"><NuxtLink to="/admin">Admin</NuxtLink></li>
      </ul>
    </nav>
  </div>
</template>
