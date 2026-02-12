<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  user?: any;
}>();

const emit = defineEmits<{
  close: [];
  saved: [];
}>();

const isSubmitting = ref(false);
const error = ref<string | null>(null);

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: 'moderator' as 'admin' | 'moderator',
});

const isEditing = computed(() => !!props.user);

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    error.value = null;

    if (props.user) {
      form.name = props.user.name || '';
      form.email = props.user.email || '';
      form.password = '';
      form.password_confirmation = '';
      form.role = props.user.role || 'moderator';
    } else {
      form.name = '';
      form.email = '';
      form.password = '';
      form.password_confirmation = '';
      form.role = 'moderator';
    }
  }
});

const handleSubmit = async () => {
  error.value = null;

  // Validate passwords match for new users
  if (!isEditing.value && form.password !== form.password_confirmation) {
    error.value = 'პაროლები არ ემთხვევა';
    return;
  }

  isSubmitting.value = true;

  const data: any = {
    name: form.name,
    email: form.email,
    role: form.role,
  };

  // Only include password if provided
  if (form.password) {
    data.password = form.password;
    data.password_confirmation = form.password_confirmation;
  }

  try {
    if (isEditing.value) {
      await apiPut(`/admin/users/${props.user.id}`, data);
    } else {
      await apiPost('/admin/users', data);
    }

    emit('saved');
  } catch (e: any) {
    error.value = e.message || 'შეცდომა მოხდა';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
        @click.self="emit('close')">
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95">
          <div
            v-if="isOpen"
            class="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            <!-- Header -->
            <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 class="text-xl font-bold text-gray-900">
                {{ isEditing ? 'მომხმარებლის რედაქტირება' : 'ახალი მომხმარებელი' }}
              </h2>
              <button
                @click="emit('close')"
                class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="p-6">
              <!-- Error -->
              <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {{ error }}
              </div>

              <div class="space-y-5">
                <!-- Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    სახელი *
                  </label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    ელ-ფოსტა *
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>

                <!-- Password -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    პაროლი {{ isEditing ? '(ცარიელი დატოვეთ თუ არ გინდათ შეცვლა)' : '*' }}
                  </label>
                  <input
                    v-model="form.password"
                    type="password"
                    :required="!isEditing"
                    minlength="8"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>

                <!-- Password Confirmation -->
                <div v-if="form.password || !isEditing">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    პაროლის დადასტურება {{ !isEditing ? '*' : '' }}
                  </label>
                  <input
                    v-model="form.password_confirmation"
                    type="password"
                    :required="!isEditing || !!form.password"
                    minlength="8"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>

                <!-- Role -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    როლი *
                  </label>
                  <select
                    v-model="form.role"
                    required
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                    <option value="moderator">მოდერატორი</option>
                    <option value="admin">ადმინისტრატორი</option>
                  </select>
                  <p class="mt-1 text-xs text-gray-500">
                    ადმინისტრატორს აქვს სრული წვდომა, მოდერატორს - შეზღუდული
                  </p>
                </div>
              </div>
            </form>

            <!-- Footer -->
            <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                type="button"
                @click="emit('close')"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                გაუქმება
              </button>
              <button
                @click="handleSubmit"
                :disabled="isSubmitting"
                class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <span v-if="isSubmitting">შენახვა...</span>
                <span v-else>{{ isEditing ? 'განახლება' : 'შექმნა' }}</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
