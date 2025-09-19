export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase"],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  nitro: {
    compatibilityDate: "2025-09-19", // ⚡ Ajoute cette ligne
  },
})
