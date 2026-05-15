<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <section class="hero page-section">
    <div class="container hero-grid">
      <div class="stack">
        <span class="badge">Formations IA pour entrepreneurs</span>
        <h1>Créez, pilotez et vendez vos formations IA avec MS IA Academy.</h1>
        <p>
          Une plateforme claire pour présenter les programmes, connecter les administrateurs
          et gérer les contenus depuis un back office sécurisé.
        </p>
        <div class="actions">
          <NuxtLink class="btn" to="/formations">Découvrir les formations</NuxtLink>
          <NuxtLink class="btn secondary" :to="user ? '/admin' : '/auth'">
            {{ user ? "Ouvrir le back office" : "Se connecter" }}
          </NuxtLink>
        </div>
      </div>
      <div class="card hero-card">
        <h2>Back office prêt</h2>
        <ul>
          <li>Connexion Supabase</li>
          <li>Création et édition des formations</li>
          <li>Publication / dépublication</li>
          <li>Suppression sécurisée</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background:
    radial-gradient(circle at 20% 20%, rgb(124 58 237 / 18%), transparent 30%),
    radial-gradient(circle at 80% 10%, rgb(236 72 153 / 16%), transparent 28%);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  align-items: center;
  gap: 2rem;
}

h1 {
  margin: 0;
  font-size: clamp(2.3rem, 6vw, 5rem);
  line-height: 0.95;
  letter-spacing: -0.07em;
}

p {
  max-width: 680px;
  color: var(--color-muted);
  font-size: 1.15rem;
  line-height: 1.7;
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-card ul {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
  color: var(--color-muted);
  line-height: 1.9;
}

@media (max-width: 860px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}
</style>
