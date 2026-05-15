<script setup lang="ts">
import type { Formation } from "~/composables/useFormations"

defineProps<{ formation: Formation }>()
</script>

<template>
  <article class="formation-card card">
    <div class="formation-card__header">
      <span class="badge">{{ formation.level || "Tous niveaux" }}</span>
      <span class="duration">{{ formation.duration || "À la demande" }}</span>
    </div>
    <h3>{{ formation.title }}</h3>
    <p>{{ formation.description || "Description bientôt disponible." }}</p>
    <NuxtLink class="btn secondary" :to="`/formations/${formation.id}`">Voir la formation</NuxtLink>
  </article>
</template>

<style scoped>
.formation-card {
  display: grid;
  gap: 1rem;
}

.formation-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.formation-card h3,
.formation-card p {
  margin: 0;
}

.formation-card h3 {
  font-size: 1.35rem;
}

.formation-card p,
.duration {
  color: var(--color-muted);
}
</style>
