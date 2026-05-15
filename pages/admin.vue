<script setup lang="ts">
import type { Formation, FormationInput } from "~/composables/useFormations"

definePageMeta({
  layout: "admin",
  middleware: "auth",
})

const { listFormations, createFormation, updateFormation, deleteFormation } = useFormations()
const { data: formations, pending, error, refresh } = await useAsyncData(
  "admin-formations",
  () => listFormations(),
)

const emptyForm = (): FormationInput => ({
  title: "",
  description: "",
  level: "Débutant",
  duration: "",
  is_published: false,
})

const form = reactive<FormationInput>(emptyForm())
const editingId = ref<Formation["id"] | null>(null)
const saving = ref(false)
const deletingId = ref<Formation["id"] | null>(null)
const message = ref("")
const formError = ref("")

const publishedCount = computed(() => formations.value?.filter((formation) => formation.is_published).length || 0)

function resetForm() {
  Object.assign(form, emptyForm())
  editingId.value = null
  formError.value = ""
}

function editFormation(formation: Formation) {
  editingId.value = formation.id
  Object.assign(form, {
    title: formation.title,
    description: formation.description || "",
    level: formation.level || "Débutant",
    duration: formation.duration || "",
    is_published: formation.is_published,
  })
  formError.value = ""
  message.value = ""
}

async function saveFormation() {
  if (!form.title.trim()) {
    formError.value = "Le titre est obligatoire."
    return
  }

  saving.value = true
  formError.value = ""
  message.value = ""

  try {
    if (editingId.value) {
      await updateFormation(editingId.value, form)
      message.value = "Formation mise à jour."
    } else {
      await createFormation(form)
      message.value = "Formation créée."
    }

    resetForm()
    await refresh()
  } catch (error) {
    formError.value = error instanceof Error ? error.message : "Impossible d'enregistrer la formation."
  } finally {
    saving.value = false
  }
}

async function removeFormation(formation: Formation) {
  if (!window.confirm(`Supprimer définitivement la formation « ${formation.title} » ?`)) {
    return
  }

  deletingId.value = formation.id
  message.value = ""
  formError.value = ""

  try {
    await deleteFormation(formation.id)
    if (editingId.value === formation.id) resetForm()
    message.value = "Formation supprimée."
    await refresh()
  } catch (error) {
    formError.value = error instanceof Error ? error.message : "Impossible de supprimer la formation."
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <section class="admin-page stack">
    <div class="admin-heading">
      <div>
        <span class="badge">Back office</span>
        <h1>Gestion des formations</h1>
      </div>
      <button class="btn secondary" type="button" @click="refresh">Actualiser</button>
    </div>

    <div class="stats-grid">
      <div class="card stat-card">
        <span>Total</span>
        <strong>{{ formations?.length || 0 }}</strong>
      </div>
      <div class="card stat-card">
        <span>Publiées</span>
        <strong>{{ publishedCount }}</strong>
      </div>
      <div class="card stat-card">
        <span>Brouillons</span>
        <strong>{{ (formations?.length || 0) - publishedCount }}</strong>
      </div>
    </div>

    <div class="admin-grid">
      <form class="card form-grid" @submit.prevent="saveFormation">
        <div class="form-header">
          <h2>{{ editingId ? "Modifier la formation" : "Créer une formation" }}</h2>
          <button v-if="editingId" class="btn ghost" type="button" @click="resetForm">Annuler</button>
        </div>

        <p v-if="message" class="alert success">{{ message }}</p>
        <p v-if="formError" class="alert error">{{ formError }}</p>

        <label class="field">
          <span>Titre *</span>
          <input v-model="form.title" type="text" placeholder="Ex. Automatiser son marketing avec l'IA" required>
        </label>

        <label class="field">
          <span>Description</span>
          <textarea v-model="form.description" placeholder="Objectifs, bénéfices et contenu de la formation" />
        </label>

        <div class="two-columns">
          <label class="field">
            <span>Niveau</span>
            <select v-model="form.level">
              <option>Débutant</option>
              <option>Intermédiaire</option>
              <option>Avancé</option>
              <option>Tous niveaux</option>
            </select>
          </label>

          <label class="field">
            <span>Durée</span>
            <input v-model="form.duration" type="text" placeholder="Ex. 6 semaines">
          </label>
        </div>

        <label class="switch-row">
          <input v-model="form.is_published" type="checkbox">
          <span>Publier cette formation sur le site</span>
        </label>

        <button class="btn" type="submit" :disabled="saving">
          {{ saving ? "Enregistrement..." : editingId ? "Mettre à jour" : "Créer" }}
        </button>
      </form>

      <div class="card formations-panel">
        <div class="form-header">
          <h2>Catalogue</h2>
          <NuxtLink class="btn secondary" to="/formations">Voir en ligne</NuxtLink>
        </div>

        <p v-if="pending" class="alert">Chargement...</p>
        <p v-else-if="error" class="alert error">
          Impossible de charger Supabase. Vérifiez les variables d'environnement et la table `formations`.
        </p>
        <p v-else-if="!formations?.length" class="alert">Aucune formation. Créez la première avec le formulaire.</p>

        <div v-else class="formation-list">
          <article v-for="formation in formations" :key="formation.id" class="formation-row">
            <div>
              <div class="row-title">
                <h3>{{ formation.title }}</h3>
                <span class="badge">{{ formation.is_published ? "Publiée" : "Brouillon" }}</span>
              </div>
              <p>{{ formation.description || "Sans description." }}</p>
              <small>{{ formation.level || "Tous niveaux" }} · {{ formation.duration || "Durée libre" }}</small>
            </div>
            <div class="row-actions">
              <button class="btn secondary" type="button" @click="editFormation(formation)">Modifier</button>
              <button
                class="btn danger"
                type="button"
                :disabled="deletingId === formation.id"
                @click="removeFormation(formation)"
              >
                {{ deletingId === formation.id ? "Suppression..." : "Supprimer" }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.admin-page {
  max-width: 1240px;
  margin: 0 auto;
}

.admin-heading,
.form-header,
.row-title,
.row-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

h1,
h2,
h3 {
  margin: 0;
}

h1 {
  margin-top: 0.5rem;
  font-size: clamp(2rem, 4vw, 3.5rem);
  letter-spacing: -0.06em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.stat-card {
  display: grid;
  gap: 0.4rem;
}

.stat-card span {
  color: var(--color-muted);
  font-weight: 700;
}

.stat-card strong {
  font-size: 2rem;
}

.admin-grid {
  display: grid;
  grid-template-columns: minmax(320px, 430px) 1fr;
  gap: 1rem;
  align-items: start;
}

.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.switch-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
}

.switch-row input {
  width: 18px;
  height: 18px;
}

.formations-panel {
  display: grid;
  gap: 1rem;
}

.formation-list {
  display: grid;
  gap: 0.85rem;
}

.formation-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 18px;
}

.formation-row p {
  color: var(--color-muted);
  margin: 0.5rem 0;
}

.formation-row small {
  color: var(--color-muted);
  font-weight: 700;
}

.row-actions {
  justify-content: flex-end;
  flex-wrap: wrap;
}

@media (max-width: 1080px) {
  .admin-grid,
  .formation-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .stats-grid,
  .two-columns {
    grid-template-columns: 1fr;
  }

  .admin-heading,
  .form-header,
  .row-title,
  .row-actions {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
