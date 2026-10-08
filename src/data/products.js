import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

function normalizeProduct(product) {
  return {
    id: product.id,
    name: product.title,
    slug: product.slug,
    description: product.description,
    price: product.price,
    previousPrice: product.discountPercentage
      ? product.price / (1 - product.discountPercentage / 100)
      : null,
    currency: 'USD',
    image: product.thumbnail || product.images?.[0] || '',
    images: product.images ?? [],
    categoryId: product.category,
    brand: product.brand || '',
    rating: product.rating ?? 0,
    reviewCount: product.reviews?.length ?? 0,
    stock: product.stock ?? 0,
    discountPercentage: product.discountPercentage ?? 0,
    isFeatured: (product.rating ?? 0) >= 4.5,
    isBestSeller: (product.reviews?.length ?? 0) >= 3,
  };
}

export async function fetchProducts({ limit = 40, skip = 0, signal } = {}) {
  const { data } = await api.get('/products', {
    params: { limit, skip },
    signal,
  });

  return {
    products: data.products.map(normalizeProduct),
    total: data.total,
  };
}

export async function searchProducts(query, { limit = 40, skip = 0, signal } = {}) {
  const { data } = await api.get('/products/search', {
    params: { q: query, limit, skip },
    signal,
  });

  return {
    products: data.products.map(normalizeProduct),
    total: data.total,
  };
}

export async function fetchProductCategories({ signal } = {}) {
  const { data } = await api.get('/products/categories', { signal });
  return data;
}

export async function fetchProductById(id, { signal } = {}) {
  const { data } = await api.get(`/products/${id}`, { signal });
  return normalizeProduct(data);
}

export function formatPrice(amount, currency = 'NGN') {
  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}
