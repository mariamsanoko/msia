<script setup lang="ts">
definePageMeta({ middleware: "auth" })
</script>

<template>
  <section class="page-section">
    <div class="container stack">
      <h1>Upload</h1>
      <FileUploader />
    </div>
  </section>
</template>
