<script setup lang="ts">
const currentYear = new Date().getFullYear();

const footerLinks = {
  main: [
    { label: "პაკეტები", href: "#packages" },
    { label: "როგორ მუშაობს", href: "#how-it-works" },
    { label: "ჩვენი შედეგები", href: "#results" },
    { label: "ცხოველების ისტორიები", href: "#stories" },
    { label: "Founders Club – პირველი 30", href: "#founders" },
  ],
  support: [
    { label: "დაეხმარე ცხოველებს", href: "#packages" },
    { label: "გახდი მოხალისე", href: "#volunteer" },
    { label: "ჩვენი გმირები (კომპანიები)", href: "#heroes-companies" },
    { label: "ჩვენი გმირები (ადამიანები)", href: "#heroes-people" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: "facebook", href: "https://facebook.com" },
  { name: "TikTok", icon: "tiktok", href: "https://tiktok.com" },
  { name: "Instagram", icon: "instagram", href: "https://instagram.com" },
  { name: "LinkedIn", icon: "linkedin", href: "https://linkedin.com" },
];

const scrollToSection = (href: string) => {
  if (href.startsWith("#")) {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};
</script>

<template>
  <footer class="bg-blue text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-10 lg:gap-8">

        <!-- Col 1: Brand -->
        <div class="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 sm:col-span-2 lg:col-span-1">
          <NuxtImg
            src="/images/footer_logo.svg"
            alt=""
            class="w-[130px] object-contain opacity-80" />
          <h3 class="font-gilroy text-white text-xl leading-snug">
            ერთად<br />
            <span class="text-primary">ცხოველებისთვის</span>
          </h3>
        </div>

        <!-- Col 2: Nav links -->
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
            ნავიგაცია
          </p>
          <ul class="space-y-2.5">
            <li v-for="link in footerLinks.main" :key="link.label">
              <button
                @click="scrollToSection(link.href)"
                class="text-sm text-white/50 hover:text-white transition-colors text-left">
                {{ link.label }}
              </button>
            </li>
          </ul>
        </div>

        <!-- Col 3: Support links -->
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
            მხარდაჭერა
          </p>
          <ul class="space-y-2.5">
            <li v-for="link in footerLinks.support" :key="link.label">
              <button
                @click="scrollToSection(link.href)"
                class="text-sm text-white/50 hover:text-white transition-colors text-left">
                {{ link.label }}
              </button>
            </li>
          </ul>
        </div>

        <!-- Col 4: Contact + socials -->
        <div class="flex flex-col gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
              კონტაქტი
            </p>
            <div class="space-y-2">
              <a
                href="mailto:info@ertad.ge"
                class="block text-sm text-white/50 hover:text-white transition-colors">
                info@ertad.ge
              </a>
              <a
                href="tel:+995598588433"
                class="block text-sm text-white/50 hover:text-white transition-colors">
                598 588 433
              </a>
            </div>
          </div>

          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
              გამოგვყევი
            </p>
            <div class="flex gap-2.5">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all duration-200"
                :aria-label="social.name">
                <svg
                  v-if="social.icon === 'facebook'"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <svg
                  v-if="social.icon === 'tiktok'"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
                <svg
                  v-if="social.icon === 'instagram'"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <svg
                  v-if="social.icon === 'linkedin'"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <div class="flex gap-6">
            <a href="#" class="hover:text-white transition-colors underline">
              წლიური ანგარიში {{ currentYear }}
            </a>
            <a href="#" class="hover:text-white transition-colors underline">
              წესდება
            </a>
          </div>
          <p>ყველა უფლება დაცულია {{ currentYear }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>
