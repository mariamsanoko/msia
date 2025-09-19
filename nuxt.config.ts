export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase"],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  }
})
