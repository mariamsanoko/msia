<template>
  <footer class="site-footer">
    <div class="container footer-content">
      <p>© {{ new Date().getFullYear() }} MS IA Academy. Tous droits réservés.</p>
      <NuxtLink to="/admin">Back office</NuxtLink>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--color-border);
  background: white;
}

.footer-content {
  min-height: 92px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: var(--color-muted);
}

.footer-content a {
  color: var(--color-primary-dark);
  font-weight: 700;
}
</style>
