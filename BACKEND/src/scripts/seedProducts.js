const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/product.model");

dotenv.config();

const products = [
  {
    name: "Soft Pinch Liquid Blush",
    brand: "Rare Beauty",
    description:
      "A lightweight liquid blush that blends easily and gives cheeks a natural, long-lasting flush with a soft finish.",
    price: 3200,
    originalPrice: 3200,
    category: "Blush",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494273776/XdxSzqwU00-000000000494273776_1.png",
    rating: 4.6,
    stock: 24,
  },

  {
    name: "Dior Addict Lip Glow",
    brand: "Dior",
    description:
      "A hydrating colour-enhancing lip balm that leaves lips comfortable, glossy and naturally radiant.",
    price: 4400,
    originalPrice: 4400,
    category: "Lip Care",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494277813/yYwp4aS4q-000000000494277813_1.png",
    rating: 4.5,
    stock: 18,
  },

  {
    name: "Positive Light Silky Touch Highlighter",
    brand: "Rare Beauty",
    description:
      "A finely pressed highlighter with reflective pearls that creates a smooth, luminous glow without feeling heavy.",
    price: 3532,
    originalPrice: 3532,
    category: "Highlighter",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494273805/CnVqO5l4qz-000000000494273805_1.png",
    rating: 4.5,
    stock: 16,
  },

  {
    name: "Warm Wishes Effortless Bronzer Stick",
    brand: "Rare Beauty",
    description:
      "A creamy bronzer stick that melts into the skin and creates natural-looking warmth and definition.",
    price: 3784,
    originalPrice: 3784,
    category: "Bronzer",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494273838/-M2aH8_4rZ-000000000494273838_1.png",
    rating: 4.6,
    stock: 14,
  },

  {
    name: "Nude Obsessions Eyeshadow Palette",
    brand: "Huda Beauty",
    description:
      "A premium nude eyeshadow palette featuring blendable matte, shimmer and metallic shades for everyday and glam looks.",
    price: 2915,
    originalPrice: 2915,
    category: "Eyeshadow",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000493860578/gAgZSjYsd2-000000000493860578_1.png",
    rating: 4.4,
    stock: 15,
  },

  {
    name: "Gloss Bomb Universal Lip Luminizer",
    brand: "Fenty Beauty",
    description:
      "A high-shine, non-sticky lip gloss that gives lips a smooth, juicy and glass-like appearance.",
    price: 2400,
    originalPrice: 2400,
    category: "Lip Gloss",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494612502/yMXKnxzxgwA7-000000000494612502_1.jpg",
    rating: 4.5,
    stock: 21,
  },

  {
    name: "Libre Eau De Parfum",
    brand: "Yves Saint Laurent",
    description:
      "A sophisticated floral fragrance combining lavender, orange blossom and warm woody notes for a bold feminine scent.",
    price: 12000,
    originalPrice: 12000,
    category: "Perfume",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000493111528/VEXomQ8Y7i-000000000493111528_1.jpg",
    rating: 4.6,
    stock: 8,
  },

  {
    name: "Almost Lipstick Black Honey",
    brand: "Clinique",
    description:
      "A sheer lip colour with a glossy balm-like texture that adapts beautifully to the natural tone of your lips.",
    price: 2400,
    originalPrice: 2400,
    category: "Lipstick",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000493286076/R0TDE69Kh-000000000493286076_1.jpg",
    rating: 4.5,
    stock: 17,
  },

  {
    name: "Touche Éclat Blur Primer",
    brand: "Yves Saint Laurent",
    description:
      "An illuminating primer that smooths the appearance of skin texture while creating a polished radiant base.",
    price: 3800,
    originalPrice: 3800,
    category: "Primer",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494474861/4S-5bUhvB8-000000000494474861_1.jpg",
    rating: 4.4,
    stock: 11,
  },

  {
    name: "Blush Filter",
    brand: "Huda Beauty",
    description:
      "A lightweight liquid blush with buildable colour and a soft-focus finish for naturally flushed cheeks.",
    price: 2250,
    originalPrice: 2250,
    category: "Blush",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494498117/a6cqrSIR9Q-000000000494498117_1.jpg",
    rating: 4.5,
    stock: 20,
  },

  {
    name: "Cooling Water Jelly Tint",
    brand: "MILK MAKEUP",
    description:
      "A hydrating jelly tint for lips and cheeks with a fresh, bouncy texture and buildable colour.",
    price: 3200,
    originalPrice: 3200,
    category: "Lip & Cheek Tint",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494512104/p4mGrjg_nR_-000000000494512104_1.jpg",
    rating: 4.4,
    stock: 13,
  },

  {
    name: "Easy Bake Loose Powder",
    brand: "Huda Beauty",
    description:
      "A finely milled setting powder that controls shine and gives makeup a smooth, soft-focus and airbrushed appearance.",
    price: 3250,
    originalPrice: 3250,
    category: "Setting Powder",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000493860604/xXrCP7Z4yh-000000000493860604_1.jpg",
    rating: 4.5,
    stock: 18,
  },

  {
    name: "Loveshine Lipstick",
    brand: "Yves Saint Laurent",
    description:
      "A high-shine lipstick with a juicy finish, comfortable texture and buildable colour.",
    price: 4000,
    originalPrice: 4000,
    category: "Lipstick",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494496706/4sqsh3Pso9V-000000000494496706_1.jpg",
    rating: 4.5,
    stock: 10,
  },

  {
    name: "Dior Forever Glow Maximizer",
    brand: "Dior",
    description:
      "A lightweight liquid highlighter with fine pearl pigments for an elegant luminous glow.",
    price: 4200,
    originalPrice: 4200,
    category: "Highlighter",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494512433/naARYM1ZC-6-000000000494512433_1.jpg",
    rating: 4.5,
    stock: 10,
  },

  {
    name: "Dior Forever Skin Correct Concealer",
    brand: "Dior",
    description:
      "A creamy high-coverage concealer designed to correct imperfections while keeping the under-eye area comfortable.",
    price: 4400,
    originalPrice: 4400,
    category: "Concealer",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494284355/tPri-U8H4je-000000000494284355_1.jpg",
    rating: 4.5,
    stock: 13,
  },

  {
    name: "Stay Vulnerable Melting Blush",
    brand: "Rare Beauty",
    description:
      "A creamy blush that melts into skin and gives a soft-focus wash of natural-looking colour.",
    price: 3000,
    originalPrice: 3000,
    category: "Blush",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494273822/VyHI3v-Eyl-000000000494273822_1.png",
    rating: 4.4,
    stock: 16,
  },

  {
    name: "Dramatically Different Moisturizing Lotion+",
    brand: "Clinique",
    description:
      "A dermatologist-developed moisturiser that helps strengthen the moisture barrier and keeps skin hydrated.",
    price: 3500,
    originalPrice: 3500,
    category: "Moisturizer",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000410268901001/pVs20Fzs4v9-000000410268901001_1.png",
    rating: 4.3,
    stock: 19,
  },

  {
    name: "Moisture Surge 100H Auto-Replenishing Hydrator",
    brand: "Clinique",
    description:
      "A lightweight gel moisturiser that provides long-lasting hydration and leaves skin feeling fresh and plump.",
    price: 4200,
    originalPrice: 4200,
    category: "Moisturizer",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/clinique/7016653/0/EQVvCmAomm-1_Product_192333042809-Clinique-Moisture-Surge-100H-Auto-Replenishing-Hydrator.png",
    rating: 4.5,
    stock: 17,
  },

  {
    name: "Kush High Roll Mascara",
    brand: "MILK MAKEUP",
    description:
      "A volumising mascara that defines lashes while helping resist smudging and flaking throughout the day.",
    price: 3300,
    originalPrice: 3300,
    category: "Mascara",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494587315/GNu5-EjdcW0-000000000494587315_1.jpg",
    rating: 4.4,
    stock: 15,
  },

  {
    name: "Loveshine Lip Oil Gloss",
    brand: "Yves Saint Laurent",
    description:
      "A glossy lip oil that gives lips a juicy high-shine finish with a comfortable, hydrating feel.",
    price: 4000,
    originalPrice: 4000,
    category: "Lip Gloss",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494739328/tPWPMrFxhOH-000000000494739328_1.jpg",
    rating: 4.4,
    stock: 9,
  },

  {
    name: "Saccharomyces Ferment 30% Milky Toner",
    brand: "The Ordinary",
    description:
      "A lightweight milky toner designed to support smoother, hydrated and more radiant-looking skin.",
    price: 1500,
    originalPrice: 1500,
    category: "Toner",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494474659/dmaRLEsWIuK-000000000494474659_1.jpg",
    rating: 4.3,
    stock: 26,
  },

  {
    name: "Squalane + Amino Acids Lip Balm",
    brand: "The Ordinary",
    description:
      "A nourishing lip balm that helps soften dry lips and provides comfortable everyday hydration.",
    price: 950,
    originalPrice: 950,
    category: "Lip Care",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494474621/SnVsIzd3VjS-000000000494474621_1.jpg",
    rating: 4.4,
    stock: 30,
  },

  {
    name: "Black Opium Eau de Parfum",
    brand: "Yves Saint Laurent",
    description:
      "A warm, sophisticated feminine fragrance with a modern gourmand-floral character and an addictive signature.",
    price: 12000,
    originalPrice: 12000,
    category: "Perfume",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000491332237/tH8SxUAzO-000000000491332237_1.jpg",
    rating: 4.6,
    stock: 7,
  },

  {
    name: "Cooling Water Jelly Ice Stick",
    brand: "MILK MAKEUP",
    description:
      "A refreshing face serum stick designed to cool, soothe and hydrate skin while reducing the look of puffiness.",
    price: 3700,
    originalPrice: 3700,
    category: "Face Care",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494587346/sB0MaRnlocP-000000000494587346_1.jpg",
    rating: 4.3,
    stock: 12,
  },

  {
    name: "Easy Blur Natural Airbrush Foundation",
    brand: "Huda Beauty",
    description:
      "A lightweight foundation with buildable coverage, a natural airbrushed finish and a smooth skin-like appearance.",
    price: 3380,
    originalPrice: 3380,
    category: "Foundation",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494475513/0aVAEagpIqs-000000000494475513_1.jpg",
    rating: 4.4,
    stock: 14,
  },

  {
    name: "Positive Light Liquid Luminizer",
    brand: "Rare Beauty",
    description:
      "A silky liquid highlighter that blends into the skin for a soft, dewy and naturally radiant glow.",
    price: 3532,
    originalPrice: 3532,
    category: "Highlighter",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494273898/T6r5AZ8Fv--000000000494273898_1.png",
    rating: 4.4,
    stock: 15,
  },

  {
    name: "MACximal Silky Matte Lipstick",
    brand: "MAC Cosmetics",
    description:
      "A premium matte lipstick with rich colour payoff and a smooth, comfortable finish designed for long wear.",
    price: 2600,
    originalPrice: 2600,
    category: "Lipstick",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494512047/GQl4smkBY-000000000494512047_1.jpg",
    rating: 4.5,
    stock: 18,
  },

  {
    name: "Charlotte's Magic Cream",
    brand: "Charlotte Tilbury",
    description:
      "A rich moisturising face cream designed to leave skin looking smoother, plumper and more radiant with a luxurious finish.",
    price: 5250,
    originalPrice: 5250,
    category: "Face Cream",
    image:
      "https://www.charlottetilbury.com/cdn/shop/files/CT_1000x1000_Charlotte_s_Magic_Cream_50ml_1.jpg",
    rating: 4.6,
    stock: 10,
  },

  {
    name: "Charlotte's Magic Serum Crystal Elixir",
    brand: "Charlotte Tilbury",
    description:
      "A luxurious facial serum formulated to hydrate skin and support a smoother, brighter and more radiant-looking complexion.",
    price: 8850,
    originalPrice: 8850,
    category: "Serum",
    image:
      "https://www.charlottetilbury.com/cdn/shop/files/CT_1000x1000_Charlotte_s_Magic_Serum_30ml.jpg",
    rating: 4.5,
    stock: 8,
  },

  {
    name: "Brazilian Bum Bum Cream",
    brand: "Sol de Janeiro",
    description:
      "A rich, fast-absorbing body cream with a luxurious texture and a warm, addictive fragrance for soft, smooth-feeling skin.",
    price: 4200,
    originalPrice: 4200,
    category: "Body Cream",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000493285982/2g5g6JwK1-000000000493285982_1.jpg",
    rating: 4.6,
    stock: 14,
  },

  {
    name: "Advanced Night Repair Serum",
    brand: "Estée Lauder",
    description:
      "A premium nighttime serum designed to hydrate skin and support a smoother, more radiant and refreshed-looking complexion.",
    price: 9800,
    originalPrice: 9800,
    category: "Serum",
    image:
      "https://www.esteelauder.in/media/export/cms/products/640x600/el_sku_27JY01_640x600_0.png",
    rating: 4.6,
    stock: 9,
  },

  {
    name: "Laneige Lip Glowy Balm",
    brand: "Laneige",
    description:
      "A lightweight lip balm that provides comfortable moisture and a glossy finish for soft-looking lips.",
    price: 750,
    originalPrice: 750,
    category: "Lip Care",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000493890455/1.jpg",
    rating: 4.4,
    stock: 25,
  },

  {
    name: "The POREfessional Face Primer",
    brand: "Benefit Cosmetics",
    description:
      "A silky face primer that helps smooth the appearance of pores and creates an even base for makeup application.",
    price: 3800,
    originalPrice: 3800,
    category: "Primer",
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494512020/1.jpg",
    rating: 4.5,
    stock: 12,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully 👍");  

    const insertedProducts = await Product.insertMany(products);

    console.log(
      `✅ ${insertedProducts.length} premium products inserted successfully`
    );
  } catch (error) {
    console.error("❌ Seed products error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

seedProducts();