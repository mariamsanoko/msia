<script setup lang="ts">
const fileName = ref("")
const message = ref("")

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  fileName.value = input.files?.[0]?.name || ""
  message.value = fileName.value
    ? `Fichier sélectionné : ${fileName.value}`
    : "Aucun fichier sélectionné."
}
</script>

<template>
  <div class="card uploader">
    <label class="field">
      <span>Ajouter un support de formation</span>
      <input type="file" @change="onFileChange">
    </label>
    <p v-if="message" class="alert success">{{ message }}</p>
    <p class="hint">Le branchement vers le stockage Supabase pourra être ajouté ici.</p>
  </div>
</template>

<style scoped>
.uploader {
  display: grid;
  gap: 1rem;
}

.hint {
  margin: 0;
  color: var(--color-muted);
}
</style>
