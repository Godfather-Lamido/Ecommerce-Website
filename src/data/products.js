
const products = [
  {
    id: 1,
    name: "Classic Essential White T-Shirt",
    slug: "classic-essential-white-t-shirt",
    description:
      "A versatile everyday T-shirt with a clean silhouette and comfortable feel. Easy to style for casual outings or relaxed days.",
    price: 12500,
    previousPrice: 15000,
    currency: "NGN",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    ],
    categoryId: "clothing",
    gender: "unisex",
    brand: "E-Sharp Essentials",
    rating: 4.7,
    reviewCount: 38,
    stock: 24,
    discountPercentage: 17,
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: 2,
    name: "Relaxed Fit Denim Jacket",
    slug: "relaxed-fit-denim-jacket",
    description:
      "A timeless denim layer designed to work with everyday outfits. A simple addition to a versatile wardrobe.",
    price: 28500,
    previousPrice: 35000,
    currency: "NGN",
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800",
    images: [
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800",
    ],
    categoryId: "clothing",
    gender: "unisex",
    brand: "E-Sharp Essentials",
    rating: 4.6,
    reviewCount: 21,
    stock: 12,
    discountPercentage: 19,
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: 3,
    name: "Everyday Black Hoodie",
    slug: "everyday-black-hoodie",
    description:
      "A comfortable hoodie with a relaxed fit for casual wear and cooler days.",
    price: 22000,
    previousPrice: null,
    currency: "NGN",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
    ],
    categoryId: "clothing",
    gender: "unisex",
    brand: "E-Sharp Essentials",
    rating: 4.5,
    reviewCount: 16,
    stock: 18,
    discountPercentage: 0,
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: 4,
    name: "Women's Casual Summer Dress",
    slug: "womens-casual-summer-dress",
    description:
      "A relaxed, easy-to-wear dress suited to casual outings and everyday styling.",
    price: 26500,
    previousPrice: 32000,
    currency: "NGN",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
    ],
    categoryId: "clothing",
    gender: "women",
    brand: "E-Sharp Essentials",
    rating: 4.8,
    reviewCount: 29,
    stock: 10,
    discountPercentage: 17,
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: 5,
    name: "Men's Smart Casual Shirt",
    slug: "mens-smart-casual-shirt",
    description:
      "A smart casual shirt that works for everyday wear, informal meetings and outings.",
    price: 18500,
    previousPrice: null,
    currency: "NGN",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=800",
    images: [
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=800",
    ],
    categoryId: "clothing",
    gender: "men",
    brand: "E-Sharp Essentials",
    rating: 4.4,
    reviewCount: 14,
    stock: 20,
    discountPercentage: 0,
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: 6,
    name: "Classic White Sneakers",
    slug: "classic-white-sneakers",
    description:
      "Minimal everyday sneakers designed to pair easily with casual outfits.",
    price: 32000,
    previousPrice: 38000,
    currency: "NGN",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    ],
    categoryId: "footwear",
    gender: "unisex",
    brand: "E-Sharp Essentials",
    rating: 4.8,
    reviewCount: 42,
    stock: 15,
    discountPercentage: 16,
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: 7,
    name: "Everyday Leather Loafers",
    slug: "everyday-leather-loafers",
    description:
      "A clean, understated footwear option for smart casual outfits.",
    price: 35000,
    previousPrice: null,
    currency: "NGN",
    image:
      "https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=800",
    images: [
      "https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=800",
    ],
    categoryId: "footwear",
    gender: "men",
    brand: "E-Sharp Essentials",
    rating: 4.5,
    reviewCount: 12,
    stock: 8,
    discountPercentage: 0,
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: 8,
    name: "Women's Everyday Handbag",
    slug: "womens-everyday-handbag",
    description:
      "A practical everyday handbag with a simple design that complements different outfits.",
    price: 29500,
    previousPrice: 35000,
    currency: "NGN",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    ],
    categoryId: "bags",
    gender: "women",
    brand: "E-Sharp Essentials",
    rating: 4.7,
    reviewCount: 25,
    stock: 11,
    discountPercentage: 16,
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: 9,
    name: "Minimal Everyday Backpack",
    slug: "minimal-everyday-backpack",
    description:
      "A practical backpack for carrying everyday essentials to work, school or casual outings.",
    price: 24000,
    previousPrice: null,
    currency: "NGN",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    ],
    categoryId: "bags",
    gender: "unisex",
    brand: "E-Sharp Essentials",
    rating: 4.6,
    reviewCount: 19,
    stock: 14,
    discountPercentage: 0,
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: 10,
    name: "Classic Wristwatch",
    slug: "classic-wristwatch",
    description:
      "A simple wristwatch with a timeless look, suitable for everyday styling.",
    price: 27500,
    previousPrice: 33000,
    currency: "NGN",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    ],
    categoryId: "accessories",
    gender: "unisex",
    brand: "E-Sharp Essentials",
    rating: 4.7,
    reviewCount: 31,
    stock: 9,
    discountPercentage: 17,
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: 11,
    name: "Everyday Sunglasses",
    slug: "everyday-sunglasses",
    description:
      "A versatile accessory for adding a finishing touch to casual everyday looks.",
    price: 12000,
    previousPrice: null,
    currency: "NGN",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    ],
    categoryId: "accessories",
    gender: "unisex",
    brand: "E-Sharp Essentials",
    rating: 4.3,
    reviewCount: 11,
    stock: 22,
    discountPercentage: 0,
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: 12,
    name: "Women's Classic Heels",
    slug: "womens-classic-heels",
    description:
      "Classic heels designed to complement smart and occasion-ready outfits.",
    price: 30000,
    previousPrice: 36000,
    currency: "NGN",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
    ],
    categoryId: "footwear",
    gender: "women",
    brand: "E-Sharp Essentials",
    rating: 4.6,
    reviewCount: 17,
    stock: 7,
    discountPercentage: 17,
    isFeatured: false,
    isBestSeller: false,
  },
];

export const categories = [
  {
    slug: "clothing",
    name: "Clothing",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
  },
  {
    slug: "footwear",
    name: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  },
  {
    slug: "bags",
    name: "Bags",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
  },
  {
    slug: "accessories",
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
  },
];

const wait = (ms = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchProducts = async (options = {}, legacySkip = 0) => {
  await wait(150);

  const limit =
    typeof options === "number"
      ? options
      : options.limit ?? products.length;

  const skip =
    typeof options === "number"
      ? legacySkip
      : options.skip ?? 0;

  const category =
    typeof options === "object" ? options.category : undefined;

  let result = [...products];

  if (category) {
    result = result.filter(
      (product) => product.categoryId === category
    );
  }

  return {
    products: result.slice(skip, skip + limit),
    total: result.length,
    skip,
    limit,
  };
};

export const searchProducts = async (query = "") => {
  await wait(100);

  const searchTerm = query.trim().toLowerCase();

  if (!searchTerm) return [];

  return products.filter((product) =>
    [
      product.name,
      product.description,
      product.categoryId,
      product.gender,
      product.brand,
    ].some((value) =>
      String(value).toLowerCase().includes(searchTerm)
    )
  );
};

export const fetchProductCategories = async () => {
  await wait(100);
  return categories;
};

export const fetchProductById = async (id) => {
  await wait(100);

  return (
    products.find((product) => String(product.id) === String(id)) ||
    null
  );
};

export const formatPrice = (amount, currency = "NGN") => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
};

export default products;
