<script setup lang="ts">
const { isSubmitting, error, submitRegistration } = useRegistration();

const packageOptions = [
  { id: 'supporter', name: 'მხარდამჭერი — 300₾/თვეში' },
  { id: 'friend', name: 'მეგობარი — 800₾/თვეში' },
  { id: 'partner', name: 'პარტნიორი — 1,500₾/თვეში' },
  { id: 'cofounder', name: 'თანადამფუძნებელი — 2,500₾/თვეში' },
];

const form = reactive({
  company_name: '',
  contact_person: '',
  phone: '',
  package: '' as 'supporter' | 'friend' | 'partner' | 'cofounder' | '',
});

const isSuccess = ref(false);

const handleSubmit = async () => {
  if (!form.company_name || !form.contact_person || !form.phone || !form.package) return;

  const success = await submitRegistration({
    company_name: form.company_name,
    contact_person: form.contact_person,
    phone: form.phone,
    package: form.package as 'supporter' | 'friend' | 'partner' | 'cofounder',
  });

  if (success) {
    isSuccess.value = true;
    form.company_name = '';
    form.contact_person = '';
    form.phone = '';
    form.package = '';
  }
};
</script>

<template>
  <section id="contact" class="py-24 bg-section-alt">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-12 fade-up">
        <div class="section-label" style="justify-content: center">კონტაქტი</div>
        <h2
          class="font-gilroy text-blue mb-4"
          style="font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.25">
          დაგვიკავშირდი
        </h2>
        <p class="text-gray-500 max-w-[600px] mx-auto leading-[1.8]">
          გაინტერესებს წევრობა? გაქვს შეკითხვა? გვწერე და დაგიკავშირდებით.
        </p>
      </div>

      <!-- Grid -->
      <div class="grid md:grid-cols-[1fr_1.2fr] gap-12 items-start fade-up" style="transition-delay: 0.15s">
        <!-- Left: Contact info + socials -->
        <div>
          <div class="flex flex-col gap-5">
            <!-- Email -->
            <div class="flex gap-4 items-center">
              <div
                class="w-12 h-12 min-w-[48px] bg-warm-light rounded-[14px] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#F5A623">
                  <path
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div>
                <strong class="block text-[0.85rem] text-blue font-gilroy">ელ. ფოსტა</strong>
                <span class="text-[0.9rem] text-gray-500">info@ertad.ge</span>
              </div>
            </div>

            <!-- Phone -->
            <div class="flex gap-4 items-center">
              <div
                class="w-12 h-12 min-w-[48px] bg-warm-light rounded-[14px] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#F5A623">
                  <path
                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <div>
                <strong class="block text-[0.85rem] text-blue font-gilroy">ტელეფონი</strong>
                <span class="text-[0.9rem] text-gray-500">598 588 433</span>
              </div>
            </div>
          </div>

          <!-- Social heading -->
          <p class="text-[0.85rem] font-semibold text-gray-400 mt-7 mb-3.5">გამოგვყევი</p>

          <!-- Social links -->
          <div class="flex gap-2.5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              class="w-[42px] h-[42px] bg-warm-light rounded-xl flex items-center justify-center hover:bg-primary transition-colors group">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                class="fill-blue group-hover:fill-white transition-colors">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok"
              class="w-[42px] h-[42px] bg-warm-light rounded-xl flex items-center justify-center hover:bg-primary transition-colors group">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                class="fill-blue group-hover:fill-white transition-colors">
                <path
                  d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              class="w-[42px] h-[42px] bg-warm-light rounded-xl flex items-center justify-center hover:bg-primary transition-colors group">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                class="fill-blue group-hover:fill-white transition-colors">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              class="w-[42px] h-[42px] bg-warm-light rounded-xl flex items-center justify-center hover:bg-primary transition-colors group">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                class="fill-blue group-hover:fill-white transition-colors">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Right: Form card -->
        <div class="bg-white rounded-[20px] p-9 border border-gray-200">
          <!-- Success state -->
          <div v-if="isSuccess" class="py-10 text-center">
            <div
              class="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-5">
              <svg
                class="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-gilroy font-bold text-blue mb-3">მადლობა!</h3>
            <p class="text-gray-500 text-sm">
              თქვენი განაცხადი მიღებულია. ჩვენ მალე დაგიკავშირდებით.
            </p>
            <button @click="isSuccess = false" class="btn-primary mt-6 text-sm">კარგი</button>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="handleSubmit">
            <!-- Error -->
            <div
              v-if="error"
              class="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {{ error }}
            </div>

            <!-- Row 1: company + contact person -->
            <div class="grid sm:grid-cols-2 gap-4 mb-[18px]">
              <div>
                <label class="block text-[0.8rem] font-semibold text-blue mb-1.5">
                  კომპანიის სახელი
                </label>
                <input
                  v-model="form.company_name"
                  type="text"
                  required
                  placeholder="მაგ. შპს საქართველო"
                  class="w-full px-4 py-3 bg-cream border border-gray-200 rounded-xl text-[0.9rem] text-blue placeholder-gray-400 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
              <div>
                <label class="block text-[0.8rem] font-semibold text-blue mb-1.5">
                  საკონტაქტო პირი
                </label>
                <input
                  v-model="form.contact_person"
                  type="text"
                  required
                  placeholder="სახელი და გვარი"
                  class="w-full px-4 py-3 bg-cream border border-gray-200 rounded-xl text-[0.9rem] text-blue placeholder-gray-400 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
            </div>

            <!-- Row 2: phone + package -->
            <div class="grid sm:grid-cols-2 gap-4 mb-[18px]">
              <div>
                <label class="block text-[0.8rem] font-semibold text-blue mb-1.5">
                  ტელეფონი
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  placeholder="+995 5XX XXX XXX"
                  class="w-full px-4 py-3 bg-cream border border-gray-200 rounded-xl text-[0.9rem] text-blue placeholder-gray-400 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
              <div>
                <label class="block text-[0.8rem] font-semibold text-blue mb-1.5">
                  რომელი პაკეტი გაინტერესებთ?
                </label>
                <select
                  v-model="form.package"
                  required
                  class="w-full px-4 py-3 bg-cream border border-gray-200 rounded-xl text-[0.9rem] text-blue outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer">
                  <option value="" disabled>აირჩიეთ პაკეტი</option>
                  <option v-for="pkg in packageOptions" :key="pkg.id" :value="pkg.id">
                    {{ pkg.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full btn-primary py-3.5 text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <svg
                v-if="isSubmitting"
                class="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4" />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>{{ isSubmitting ? 'იგზავნება...' : 'გაგზავნა' }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
