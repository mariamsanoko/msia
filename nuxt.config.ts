export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase"],

  app: {
    baseURL: "/msia/", // ⚡ Obligatoire pour GitHub Pages
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  nitro: {
    compatibilityDate: "2025-09-19", // stabilité build
  },
})
