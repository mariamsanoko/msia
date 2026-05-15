<template>
  <nav class="inline-nav" aria-label="Navigation rapide">
    <NuxtLink to="/formations">Formations</NuxtLink>
    <NuxtLink to="/admin">Back office</NuxtLink>
  </nav>
</template>

<style scoped>
.inline-nav {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.inline-nav a {
  color: var(--color-primary-dark);
  font-weight: 700;
}
</style>
