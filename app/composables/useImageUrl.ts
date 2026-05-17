export const useImageUrl = () => {
  const config = useRuntimeConfig();

  // ეს ფუნქცია ავტომატურად დასვამს სწორ Base URL-ს ფრონტის გარემოს მიხედვით
  const getImageUrl = (fullUrl: string): string => {
    if (!fullUrl) return '/images/placeholder.jpg';

    // 1. თუ ბექიდან მოსულ ლინკში უკვე წერია localhost, პირდაპირ ის დავაბრუნოთ
    if (fullUrl.includes('localhost') || fullUrl.includes('127.0.0.1')) {
      return fullUrl;
    }

    // 2. ამოვჭრათ მხოლოდ სთორიჯის გზა (მაგ: storage/stories/photo.png)
    const storagePath = fullUrl.replace(/^https?:\/\/[^/]+\//, '');

    // 3. ავიღოთ ბაზის მისამართი .env-დან
    const baseUrl = String(config.public?.apiBaseUrl || '');

    // 4. თუ baseUrl ცარიელი ან undefined — ბექენდის IP პირდაპირ
    if (!baseUrl || baseUrl.includes('undefined')) {
      return `http://104.248.22.83:8080/${storagePath}`;
    }

    return `${baseUrl}/${storagePath}`;
  };

  return { getImageUrl };
};
