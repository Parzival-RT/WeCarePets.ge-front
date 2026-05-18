// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      apiBaseUrl: "http://localhost:8000",
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css"],
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    configPath: "tailwind.config.js",
  },
  app: {
    head: {
      htmlAttrs: { lang: "ka" },
      title: "ერთად ცხოველებისთვის | WeCarePets.ge",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          key: "og:title",
          property: "og:title",
          content: "ერთად ცხოველებისთვის | WeCarePets.ge",
        },
        {
          name: "description",
          content:
            "ჩვენ ერთად ვზრუნავთ ცხოველებზე - დაეხმარე უპატრონო ცხოველებს",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:site_name",
          content: "https://we-care-pets-ge-front.vercel.app/",
        },
        { property: "og:locale", content: "ka_GE" },
        {
          key: "og:url",
          property: "og:url",
          content: "https://we-care-pets-ge-front.vercel.app/",
        },
        {
          key: "og:image",
          property: "og:image",
          content:
            "https://we-care-pets-ge-front.vercel.app/_vercel/image?url=%2Fimages%2Fhero_bg.jpg&w=1536&q=100",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          key: "twitter:title",
          name: "twitter:title",
          content: "ერთად ცხოველებისთვის | WeCarePets.ge",
        },
        {
          key: "twitter:description",
          name: "twitter:description",
          content: "ერთად ცხოველებისთვის | WeCarePets.ge",
        },
        {
          key: "twitter:image",
          name: "twitter:image",
          content:
            "https://we-care-pets-ge-front.vercel.app/_vercel/image?url=%2Fimages%2Fhero_bg.jpg&w=1536&q=100",
        },

        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
        },
      ],
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        // { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;500;600;700;800&display=swap' }
      ],
    },
  },
});
