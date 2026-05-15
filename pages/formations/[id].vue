<script setup lang="ts">
const route = useRoute()
const { getFormation } = useFormations()

const { data: formation, pending, error } = await useAsyncData(
  `formation-${route.params.id}`,
  () => getFormation(route.params.id as string),
)
</script>

<template>
  <section class="page-section">
    <div class="container">
      <NuxtLink class="back-link" to="/formations">← Retour aux formations</NuxtLink>

      <p v-if="pending" class="alert">Chargement...</p>
      <p v-else-if="error || !formation" class="alert error">Formation introuvable.</p>
      <article v-else class="card detail-card">
        <span class="badge">{{ formation.level || "Tous niveaux" }}</span>
        <h1>{{ formation.title }}</h1>
        <p class="description">{{ formation.description || "Description bientôt disponible." }}</p>
        <dl>
          <div>
            <dt>Durée</dt>
            <dd>{{ formation.duration || "À la demande" }}</dd>
          </div>
          <div>
            <dt>Statut</dt>
            <dd>{{ formation.is_published ? "Publiée" : "Non publiée" }}</dd>
          </div>
        </dl>
      </article>
    </div>
  </section>
</template>

<style scoped>
.back-link {
  display: inline-flex;
  margin-bottom: 1rem;
  color: var(--color-primary-dark);
  font-weight: 700;
}

.detail-card {
  display: grid;
  gap: 1rem;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 4rem);
  letter-spacing: -0.06em;
}

.description {
  color: var(--color-muted);
  font-size: 1.1rem;
  line-height: 1.8;
}

dl {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 0;
}

dt {
  color: var(--color-muted);
  font-weight: 700;
}

dd {
  margin: 0.25rem 0 0;
  font-weight: 800;
}
</style>
