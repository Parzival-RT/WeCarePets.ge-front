<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPages: number;
  visibleCount?: number;
}>();

const emit = defineEmits<{
  "update:currentPage": [page: number];
}>();

const visible = computed(() => props.visibleCount || 5);

// გვერდების სია: [1, 2, 3, 4, 5, '...', 100] ან [1, '...', 4, 5, 6, 7, 8, '...', 100]
const paginationItems = computed(() => {
  const total = props.totalPages;
  const current = props.currentPage;
  const count = visible.value;
  const half = Math.floor(count / 2);

  if (total <= count + 2) {
    // თუ გვერდები ცოტაა, აჩვენე ყველა
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const items: (number | string)[] = [];

  // გამოთვალე ფანჯრის დასაწყისი - მიმდინარე გვერდი ცენტრში
  let windowStart: number;
  let windowEnd: number;

  if (current <= half + 1) {
    // დასაწყისში ვართ: 1 2 3 4 5 ... 100
    windowStart = 1;
    windowEnd = count;
  } else if (current >= total - half) {
    // ბოლოში ვართ: 1 ... 96 97 98 99 100
    windowStart = total - count + 1;
    windowEnd = total;
  } else {
    // შუაში ვართ: 1 ... 4 5 6 7 8 ... 100 (6 ცენტრში)
    windowStart = current - half;
    windowEnd = current + half;
  }

  // დაამატე პირველი გვერდი და dots თუ საჭიროა
  if (windowStart > 1) {
    items.push(1);
    if (windowStart > 2) {
      items.push("...");
    }
  }

  // დაამატე ფანჯრის გვერდები
  for (let i = windowStart; i <= windowEnd; i++) {
    items.push(i);
  }

  // დაამატე dots და ბოლო გვერდი თუ საჭიროა
  if (windowEnd < total) {
    if (windowEnd < total - 1) {
      items.push("...");
    }
    items.push(total);
  }

  return items;
});

const goToPage = (page: number | string) => {
  if (
    typeof page === "number" &&
    page >= 1 &&
    page <= props.totalPages &&
    page !== props.currentPage
  ) {
    emit("update:currentPage", page);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("update:currentPage", props.currentPage + 1);
  }
};

const lastPage = () => {
  if (props.currentPage !== props.totalPages) {
    emit("update:currentPage", props.totalPages);
  }
};
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-10">
    <!-- Page Numbers with Dots -->
    <template v-for="(item, index) in paginationItems" :key="index">
      <!-- Dots -->
      <span
        v-if="item === '...'"
        class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl text-blue">
        ...
      </span>
      <!-- Page Number -->
      <button
        v-else
        @click="goToPage(item)"
        class="w-10 h-10 md:w-12 md:h-12 rounded-full text-lg md:text-xl font-sans font-bold transition-colors"
        :class="
          item === currentPage
            ? 'bg-primary text-white'
            : 'bg-transparent text-blue hover:bg-primary/10'
        ">
        {{ item }}
      </button>
    </template>

    <!-- Next Page -->
    <button
      v-if="currentPage < totalPages"
      @click="nextPage"
      class="text-blue hover:text-primary text-lg md:text-xl font-sans font-normal underline ml-2 transition-colors">
      შემდეგი გვერდი
    </button>

    <!-- Last Page -->
    <button
      v-if="currentPage < totalPages"
      @click="lastPage"
      class="text-blue hover:text-primary text-lg md:text-xl font-sans font-normal underline ml-2 transition-colors">
      ბოლო გვერდი
    </button>
  </div>
</template>
