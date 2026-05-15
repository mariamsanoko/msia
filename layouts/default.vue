<script setup lang="ts">
const user = useSupabaseUser()
const { signOut, loading } = useAuth()
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="container nav-bar">
        <NuxtLink to="/" class="brand" aria-label="MS IA Academy - Accueil">
          <span class="brand-mark">MS</span>
          <span>MS IA Academy</span>
        </NuxtLink>

        <nav class="nav-links" aria-label="Navigation principale">
          <NuxtLink to="/formations">Formations</NuxtLink>
          <NuxtLink v-if="user" to="/admin">Back office</NuxtLink>
          <NuxtLink v-if="!user" to="/auth" class="btn secondary">Connexion</NuxtLink>
          <button v-else class="btn ghost" :disabled="loading" @click="signOut">
            Déconnexion
          </button>
        </nav>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.site-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--color-border);
  background: rgb(255 255 255 / 92%);
  backdrop-filter: blur(18px);
}

.nav-bar {
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand,
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.brand {
  font-weight: 900;
  letter-spacing: -0.03em;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  color: white;
}

.nav-links a:not(.btn) {
  color: var(--color-muted);
  font-weight: 700;
}

.nav-links a.router-link-active:not(.btn) {
  color: var(--color-primary-dark);
}

main {
  flex: 1;
}

@media (max-width: 720px) {
  .nav-bar,
  .nav-links {
    align-items: flex-start;
    flex-direction: column;
  }

  .nav-bar {
    padding: 1rem 0;
  }
}
</style>
