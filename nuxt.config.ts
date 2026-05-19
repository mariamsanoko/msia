export default defineNuxtConfig({
  compatibilityDate: "2025-09-19",
  devtools: { enabled: false },
  modules: ["@nuxtjs/supabase"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY || process.env.NUXT_PUBLIC_SUPABASE_KEY,
    },
  },
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.SUPABASE_KEY || process.env.NUXT_PUBLIC_SUPABASE_KEY,
  },
})
