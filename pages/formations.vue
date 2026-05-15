<script setup lang="ts">
const { listFormations } = useFormations()
const { data: formations, pending, error, refresh } = await useAsyncData(
  "published-formations",
  () => listFormations({ onlyPublished: true }),
)
</script>

<template>
  <section class="page-section">
    <div class="container stack">
      <div class="page-heading">
        <div>
          <span class="badge">Catalogue</span>
          <h1>Formations disponibles</h1>
        </div>
        <button class="btn secondary" type="button" @click="refresh">Actualiser</button>
      </div>

      <p v-if="pending" class="alert">Chargement des formations...</p>
      <p v-else-if="error" class="alert error">
        Impossible de charger les formations. Vérifiez la table Supabase `formations`.
      </p>
      <div v-else-if="formations?.length" class="formations-grid">
        <FormationCard v-for="formation in formations" :key="formation.id" :formation="formation" />
      </div>
      <p v-else class="alert">Aucune formation publiée pour le moment.</p>
    </div>
  </section>
</template>

<style scoped>
.page-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

h1 {
  margin: 0.6rem 0 0;
  font-size: clamp(2rem, 5vw, 4rem);
  letter-spacing: -0.06em;
}

.formations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}
</style>
