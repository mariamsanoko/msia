<script setup lang="ts">
const user = useSupabaseUser()
const { signIn, signUp, loading, errorMessage } = useAuth()
const email = ref("")
const password = ref("")
const mode = ref<"login" | "signup">("login")
const successMessage = ref("")

watchEffect(() => {
  if (user.value) {
    navigateTo("/admin")
  }
})

async function submit() {
  successMessage.value = ""
  if (!email.value || !password.value) return

  const ok = mode.value === "login"
    ? await signIn(email.value, password.value)
    : await signUp(email.value, password.value)

  if (ok && mode.value === "signup") {
    successMessage.value = "Compte créé. Vérifiez vos emails si Supabase demande une confirmation."
  }
}
</script>

<template>
  <section class="page-section">
    <div class="container auth-grid">
      <div class="stack">
        <span class="badge">Espace administrateur</span>
        <h1>Connexion au back office</h1>
        <p>Connectez-vous pour gérer les formations visibles sur le site.</p>
      </div>

      <form class="card form-grid" @submit.prevent="submit">
        <div class="tabs" role="tablist" aria-label="Mode d'authentification">
          <button type="button" :class="{ active: mode === 'login' }" @click="mode = 'login'">Connexion</button>
          <button type="button" :class="{ active: mode === 'signup' }" @click="mode = 'signup'">Créer un compte</button>
        </div>

        <p v-if="errorMessage" class="alert error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="alert success">{{ successMessage }}</p>

        <label class="field">
          <span>Email</span>
          <input v-model="email" type="email" autocomplete="email" required>
        </label>

        <label class="field">
          <span>Mot de passe</span>
          <input v-model="password" type="password" autocomplete="current-password" minlength="6" required>
        </label>

        <button class="btn" type="submit" :disabled="loading">
          {{ loading ? "Chargement..." : mode === "login" ? "Se connecter" : "Créer le compte" }}
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.auth-grid {
  display: grid;
  grid-template-columns: 1fr minmax(300px, 460px);
  gap: 2rem;
  align-items: start;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 4rem);
  letter-spacing: -0.06em;
}

p {
  color: var(--color-muted);
}

.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0.25rem;
  border-radius: 999px;
  background: #f1f5f9;
}

.tabs button {
  border: 0;
  border-radius: 999px;
  padding: 0.7rem;
  background: transparent;
  color: var(--color-muted);
  font-weight: 700;
}

.tabs button.active {
  background: white;
  color: var(--color-primary-dark);
  box-shadow: 0 8px 20px rgb(15 23 42 / 8%);
}

@media (max-width: 860px) {
  .auth-grid {
    grid-template-columns: 1fr;
  }
}
</style>
