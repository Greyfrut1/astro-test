const BASE_URL = 'https://back.vnu.ms1-wishdesk.com'; // Замініть на URL вашого сайту Drupal

export const getAllArticles = async () => {
  console.log('testsete')
  const res = await fetch(`${BASE_URL}/jsonapi/node/news`);
  console.log(res)
  
  if (!res.ok) {
    
    throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data.data;
};
export const getArticleById = async (id) => {
  console.log(`${BASE_URL}/jsonapi/node/news/${id}`);
  const res = await fetch(`${BASE_URL}/jsonapi/node/news/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch article ${id}: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data.data;
};