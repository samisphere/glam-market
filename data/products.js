import { formatCurrency } from "../scripts/utils/money.js";

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarURL() {
    return `images/ratings/rating-${this.rating.stars * 10}.svg`;
  }
  getPrice() {
    return `QAR ${formatCurrency(this.priceCents)}`;
  }
}

class Eye extends Product {
  netWeight;
  constructor(productDetails) {
    super(productDetails);
    this.netWeight = productDetails.netWeight;
  }
}
const masacra = new Eye({
  id: "RK0001",
  image: "images/products/eye/eye1.PNG",
  name: "Long lasting Mascara",
  rating: {
    stars: 4.5,
    count: 87,
  },
  priceCents: 4550,
  netWeight: 20,
});
console.log(masacra.getPrice());

export const products = [
  {
    id: "RK0001",
    image: "images/products/eye/eye1.PNG",
    name: "Long lasting Mascara",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 4550,
    netWeight: 20,
    type: 'eye'
  },
  {
    id: "RK0002",
    image: "images/products/face/face1.PNG",
    name: "Cheek Palette",
    rating: {
      stars: 4,
      count: 287,
    },
    priceCents: 14500,
  },
  {
    id: "RK0003",
    image: "images/products/lip/lip1.PNG",
    name: "Long lasting Lip Gloss with Formula",
    rating: {
      stars: 4.5,
      count: 1187,
    },
    priceCents: 24599,
  },
  {
    id: "RK0004",
    image: "images/products/nail/nail1.PNG",
    name: "Nail Polish Gel Formula",
    rating: {
      stars: 5.0,
      count: 70,
    },
    priceCents: 3000,
  },
  {
    id: "RK0005",
    image: "images/products/nail/nail7.PNG",
    name: "Power Pro Nail Lacquer",
    rating: {
      stars: 5,
      count: 127,
    },
    priceCents: 5000,
  },
  {
    id: "RK0006",
    image: "images/products/eye/eye4.PNG",
    name: "Translucent Loose Setting Powder",
    rating: {
      stars: 3.5,
      count: 320,
    },
    priceCents: 13000,
    netWeight: 20,
    type: 'eye'
  },
].map((eachProduct) => {
  if (eachProduct.type === 'eye') {
    return new Eye(eachProduct);
  }
  return new Product(eachProduct);
});

export function getProduct(productId) {
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}
