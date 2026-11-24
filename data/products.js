import { formatCurrency } from "../scripts/utils/money.js";

class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  netWeight;
  expiry;
  country;
  description;
  ingredients;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.netWeight = productDetails.netWeight;
    this.expiry = productDetails.expiry;
    this.country = productDetails.country;
    this.description = productDetails.description;
    this.ingredients = productDetails.ingredients;
  }

  getStarURL() {
    return `images/ratings/rating-${this.rating.stars * 10}.svg`;
  }
  getPrice() {
    return `QAR ${formatCurrency(this.priceCents)}`;
  }
  getName() {
    return this.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
}

class Eye extends Product {
  constructor(productDetails) {
    super(productDetails);
  }
}
class Face extends Product {
  constructor(productDetails) {
    super(productDetails);
  }
}
class Lip extends Product {
  constructor(productDetails) {
    super(productDetails);
  }
}
class Nail extends Product {
  constructor(productDetails) {
    super(productDetails);
  }
}

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
    type: "eye",
    expiry: 6,
    country: "Qatar",
    description:
      "Transform your lashes and catch every eye with this water-resistant* lengthening and curling mascara with mini brush. The fluid and intense black colour envelops the lashes from base to tip and amplifies their beauty. Up to 24 hours of hold**, 11.7% longer** and 16.8% curlier** from the very first stroke. The mascara you love, with even more impressive results.",
    ingredients:
      "AQUA (WATER/EAU), COPERNICIA CERIFERA CERA (COPERNICIA CERIFERA (CARNAUBA) WAX), GLYCERYL STEARATE, HYDROGENATED OLIVE O IL STEARYL ESTERS, SYNTHETIC WAX, VP/VA COPOLYMER, STEARIC ACID, HELIANTHUS ANNUUS SEED CERA (HELIANTHUS ANNUUS (SUNFLOWER) SEED WAX ), PALMITIC ACID, BUTYLENE GLYCOL, OLEA EUROPAEA OIL UNSAPONIFIABLES (OLEA EUROPAEA (OLIVE) OIL UNSAPONIFIABLES), AMINOMETHYL PROPAN OL, RICINUS COMMUNIS SEED OIL (RICINUS COMMUNIS (CASTOR) SEED OIL), 1,2-HEXANEDIOL, CAPRYLYL GLYCOL, POLYIMIDE-1, GALACTOARABINAN, R HUS VERNICIFLUA PEEL CERA (RHUS VERNICIFLUA PEEL WAX), SHOREA ROBUSTA RESIN, SODIUM DEHYDROACETATE, LECITHIN, TOCOPHEROL, ASCORBYL P ALMITATE, CITRIC ACID, CI 77499 (IRON OXIDES), CI 77007 (ULTRAMARINES).",
  },
  {
    id: "RK0002",
    image: "images/products/face/face1.PNG",
    name: "Dreamphoria Cheek Palette",
    rating: {
      stars: 4,
      count: 287,
    },
    priceCents: 14500,
    netWeight: 320,
    type: "face",
    expiry: 12,
    country: "Germany",
    description:
      "Compact creamy blush. A highly sensorial product inspired by the softness of clouds warmed by the setting sun. Perfect for brightening your complexion and enhancing your face and features for a long time by playing with volume.",
    ingredients:
      "MICA, DIMETHICONE, SQUALANE, PHENYL TRIMETHICONE, SILICA, ZINC STEARATE, DIMETHICONE/VINYL DIMETHICONE CROSSPOLYMER, ET HYLHEXYLGLYCERIN, HYDROGENATED STYRENE/ISOPRENE COPOLYMER, CAPRYLYL GLYCOL, PARFUM (FRAGRANCE), ALUMINA, KAOLIN, ADANSONIA DIGITATA SEED OIL, PENTAERYTHRITYL TETRA-DI-T-BUTYL HYDROXYHYDROCINNAMATE, TOCOPHEROL, CI 77891 (TITANIUM DIOXIDE), CI 19140 (YELLOW 5 LAKE), CI 77491 - CI 77499 (IRON OXIDES), CI 15850 (RED 7), CI 77007 (ULTRAMARINES).",
  },
  {
    id: "RK0003",
    image: "images/products/lip/lip1.PNG",
    name: "Twist 'n Twinkle matte liquid lipstick",
    rating: {
      stars: 4.5,
      count: 1187,
    },
    priceCents: 24599,
    netWeight: 20,
    type: "lip",
    expiry: 12,
    country: "Germany",
    description:
      "A unique lipstick with an iridescent finish that shifts from matte to shimmer. A texture that transforms after application, delivering exceptional radiance and sparkle when massaged into the lips.",
    ingredients:
      "ISODODECANE, CALCIUM SODIUM BOROSILICATE, DIMETHICONE, OCTYLDODECANOL, HYDROGENATED STYRENE/ISOPRENE COPOLYMER, MICA, S TEARALKONIUM HECTORITE, DIMETHICONE/VINYL DIMETHICONE CROSSPOLYMER, ALCOHOL, SILICA, HELIANTHUS ANNUUS SEED OIL (HELIANTHUS ANNUUS ( SUNFLOWER) SEED OIL), AROMA (FLAVOR), TIN OXIDE, CAPRYLIC/CAPRIC TRIGLYCERIDE, AQUA (WATER/EAU), PISTACIA LENTISCUS GUM (PISTACIA LE NTISCUS (MASTIC) GUM), GLYCYRRHIZA GLABRA ROOT EXTRACT (GLYCYRRHIZA GLABRA (LICORICE) ROOT EXTRACT), LINALYL ACETATE, PENTAERYTHRITY L TETRA-DI-t-BUTYL HYDROXYHYDROCINNAMATE, TERPINEOL, DICALCIUM PHOSPHATE, CI 77891 (TITANIUM DIOXIDE), CI 77491 – CI 77492 (IRON OXI DES), CI 15850 (RED 7 LAKE), CI 45410 (RED 28 LAKE), CI 42090 (BLUE 1 LAKE), CI 19140 (YELLOW 5 LAKE).",
  },
  {
    id: "RK0004",
    image: "images/products/nail/nail1.PNG",
    name: "power pro Nail Polish Gel Formula",
    rating: {
      stars: 5.0,
      count: 70,
    },
    priceCents: 3000,
    netWeight: 20,
    type: "nail",
    expiry: 12,
    country: "Germany",
    description:
      "The fluid texture of the polish ensures perfect control during application and provides a professional finish that will last for up to 7 days*. Each shade is calibrated with extreme precision to optimise coverage and get the most out of the pigments.\nThe brand new, modern packaging is in transparent glass with a matte black capsule. A palette of 30 colours to match every one of your looks!\nThe ergonomic applicator handle is easy to hold, while the applicator releases just the right amount of product for precise and professional application. What’s more, the brush has 1000 rounded bristles that follow the shape of the nail for flawless application.\nWARNING: keep out of reach of children and away from heat sources. Do not consume.",
    ingredients:
      "BUTYL ACETATE, ETHYL ACETATE, NITROCELLULOSE, ACETYL TRIBUTYL CITRATE, ISOPROPYL ALCOHOL, ADIPIC ACID/NEOPENTYL GLYCOL /TRIMELLITIC ANHYDRIDE COPOLYMER, STEARALKONIUM BENTONITE, ACRYLATES COPOLYMER, SILICA, DIACETONE ALCOHOL, BENZOPHENONE-1, N-BUTYL A LCOHOL, SORBIC ACID, TRIMETHYLPENTANEDIYL DIBENZOATE, STYRENE/ACRYLATES COPOLYMER, HEXANAL, DIMETHICONE, LITHOTHAMNION CALCAREUM EXT RACT, TRIMETHYLSILOXYSILICATE, CAPRYLIC/CAPRIC TRIGLYCERIDE, MANNITOL, PHOSPHORIC ACID, DIATOMACEOUS EARTH, PISTACIA LENTISCUS GUM ( PISTACIA LENTISCUS (MASTIC) GUM), ZINC SULFATE, TOCOPHEROL. +/- (MAY CONTAIN): CI 77891 (TITANIUM DIOXIDE), CI 77491 - CI 77499 (IRO N OXIDES), CI 19140 (YELLOW 5 LAKE), CI 15850 (RED 6 LAKE), CI 15880 (RED 34 LAKE), CI 77266 (NANO) (BLACK 2), CI 15850 (RED 7 LAKE) , CI 77510 (FERRIC AMMONIUM FERROCYANIDE), CI 73360 (RED 30).",
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
    netWeight: 20,
    type: "nail",
    expiry: 12,
    country: "Germany",
    description:
      "The fluid texture of the polish ensures perfect control during application and provides a professional finish that will last for up to 7 days*. Each shade is calibrated with extreme precision to optimise coverage and get the most out of the pigments.\nThe brand new, modern packaging is in transparent glass with a matte black capsule. A palette of 30 colours to match every one of your looks!\nThe ergonomic applicator handle is easy to hold, while the applicator releases just the right amount of product for precise and professional application. What’s more, the brush has 1000 rounded bristles that follow the shape of the nail for flawless application.\nWARNING: keep out of reach of children and away from heat sources. Do not consume.",
    ingredients:
      "BUTYL ACETATE, ETHYL ACETATE, NITROCELLULOSE, ACETYL TRIBUTYL CITRATE, ISOPROPYL ALCOHOL, ADIPIC ACID/NEOPENTYL GLYCOL /TRIMELLITIC ANHYDRIDE COPOLYMER, STEARALKONIUM BENTONITE, ACRYLATES COPOLYMER, SILICA, DIACETONE ALCOHOL, BENZOPHENONE-1, N-BUTYL A LCOHOL, SORBIC ACID, TRIMETHYLPENTANEDIYL DIBENZOATE, STYRENE/ACRYLATES COPOLYMER, HEXANAL, DIMETHICONE, LITHOTHAMNION CALCAREUM EXT RACT, TRIMETHYLSILOXYSILICATE, CAPRYLIC/CAPRIC TRIGLYCERIDE, MANNITOL, PHOSPHORIC ACID, DIATOMACEOUS EARTH, PISTACIA LENTISCUS GUM ( PISTACIA LENTISCUS (MASTIC) GUM), ZINC SULFATE, TOCOPHEROL. +/- (MAY CONTAIN): CI 77891 (TITANIUM DIOXIDE), CI 77491 - CI 77499 (IRO N OXIDES), CI 19140 (YELLOW 5 LAKE), CI 15850 (RED 6 LAKE), CI 15880 (RED 34 LAKE), CI 77266 (NANO) (BLACK 2), CI 15850 (RED 7 LAKE) , CI 77510 (FERRIC AMMONIUM FERROCYANIDE), CI 73360 (RED 30).",
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
    type: "eye",
    expiry: 6,
    country: "Qatar",
    description:
      "Transform your lashes and catch every eye with this water-resistant* lengthening and curling mascara with mini brush. The fluid and intense black colour envelops the lashes from base to tip and amplifies their beauty. Up to 24 hours of hold**, 11.7% longer** and 16.8% curlier** from the very first stroke. The mascara you love, with even more impressive results.",
    ingredients:
      "AQUA (WATER/EAU), COPERNICIA CERIFERA CERA (COPERNICIA CERIFERA (CARNAUBA) WAX), GLYCERYL STEARATE, HYDROGENATED OLIVE O IL STEARYL ESTERS, SYNTHETIC WAX, VP/VA COPOLYMER, STEARIC ACID, HELIANTHUS ANNUUS SEED CERA (HELIANTHUS ANNUUS (SUNFLOWER) SEED WAX ), PALMITIC ACID, BUTYLENE GLYCOL, OLEA EUROPAEA OIL UNSAPONIFIABLES (OLEA EUROPAEA (OLIVE) OIL UNSAPONIFIABLES), AMINOMETHYL PROPAN OL, RICINUS COMMUNIS SEED OIL (RICINUS COMMUNIS (CASTOR) SEED OIL), 1,2-HEXANEDIOL, CAPRYLYL GLYCOL, POLYIMIDE-1, GALACTOARABINAN, R HUS VERNICIFLUA PEEL CERA (RHUS VERNICIFLUA PEEL WAX), SHOREA ROBUSTA RESIN, SODIUM DEHYDROACETATE, LECITHIN, TOCOPHEROL, ASCORBYL P ALMITATE, CITRIC ACID, CI 77499 (IRON OXIDES), CI 77007 (ULTRAMARINES).",
  },
].map((eachProduct) => {
  if (eachProduct.type === "eye") {
    return new Eye(eachProduct);
  } else if (eachProduct.type === "face") {
    return new Face(eachProduct);
  } else if (eachProduct.type === "lip") {
    return new Lip(eachProduct);
  } else if (eachProduct.type === "nail") {
    return new Nail(eachProduct);
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
