<script setup lang="ts">
const user = useSupabaseUser()
const { signOut, loading } = useAuth()
</script>

<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <NuxtLink to="/" class="admin-brand">MS IA Academy</NuxtLink>
      <p v-if="user" class="admin-user">{{ user.email }}</p>
      <nav class="admin-menu" aria-label="Navigation back office">
        <NuxtLink to="/admin">Tableau de bord</NuxtLink>
        <NuxtLink to="/formations">Voir le site</NuxtLink>
      </nav>
      <button class="btn ghost" :disabled="loading" @click="signOut">Déconnexion</button>
    </aside>

    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 280px 1fr;
  background: #f1f5f9;
}

.admin-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.5rem;
  border-right: 1px solid var(--color-border);
  background: #111827;
  color: white;
}

.admin-brand {
  font-size: 1.25rem;
  font-weight: 900;
}

.admin-user {
  margin: 0;
  color: #cbd5e1;
  word-break: break-word;
}

.admin-menu {
  display: grid;
  gap: 0.5rem;
}

.admin-menu a {
  border-radius: 14px;
  padding: 0.85rem 1rem;
  color: #e5e7eb;
  font-weight: 700;
}

.admin-menu a.router-link-active {
  background: rgb(255 255 255 / 12%);
  color: white;
}

.admin-main {
  padding: 2rem;
}

@media (max-width: 860px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }

  .admin-sidebar {
    position: static;
    height: auto;
  }
}
</style>
