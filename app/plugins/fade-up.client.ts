export default defineNuxtPlugin((nuxtApp) => {
  let intersectionObserver: IntersectionObserver;
  let mutationObserver: MutationObserver;

  const observe = () => {
    document.querySelectorAll('.fade-up:not(.visible)').forEach((el) => {
      intersectionObserver.observe(el);
    });
  };

  nuxtApp.hook('app:mounted', () => {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    mutationObserver = new MutationObserver(observe);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    nextTick(observe);
  });
});
