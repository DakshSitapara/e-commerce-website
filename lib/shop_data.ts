type Category = "Men" | "Women" | "Kids";
type Type = "T-Shirt" | "Shirt" | "Jeans" | "Other";

export const Category = ["Men", "Women", "Kids"];
export const Type = ["T-Shirt", "Shirt", "Jeans"];

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  category: Category;
  type: Type;
  availableQuantity: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Men's T-Shirt",
    image: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 499,
    rating: 4.5,
    category: "Men",
    type: "T-Shirt",
    availableQuantity: 5,
    description:
      "Experience everyday comfort and timeless style with our premium Men’s T-Shirt, meticulously crafted from 100% combed cotton. This versatile essential features a regular fit and a classic crew neckline that suits all body types. Its breathable, soft-touch fabric ensures maximum comfort throughout the day, whether you're heading out for a casual meet-up or relaxing at home.",
  },
  {
    id: 2,
    name: "Women's Shirt",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 599,
    rating: 4.2,
    category: "Women",
    type: "Shirt",
    availableQuantity: 5,
    description:
      "Redefine elegance with our Women’s Shirt—where sophistication meets comfort. Made from a high-quality cotton-linen blend, this shirt is lightweight, breathable, and luxuriously soft. It features a modern tailored fit, full button placket, and a crisp collar that transitions seamlessly from day to night. Whether you're presenting at work or enjoying brunch with friends, this shirt exudes effortless professionalism and feminine charm.",
  },
  {
    id: 3,
    name: "Kids' Jeans",
    image: "https://images.unsplash.com/photo-1637069585336-827b298fe84a?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 450,
    rating: 4.7,
    category: "Kids",
    type: "Jeans",
    availableQuantity: 6,
    description:
      "Our Kids' Jeans are thoughtfully designed to support your child’s energy and enthusiasm for life. Crafted from premium stretch denim, these jeans combine durability with all-day flexibility, allowing unrestricted movement for play and adventure. The elastic-adjustable waistband ensures a perfect fit as they grow, while reinforced stitching adds extra strength for active use.",
  },
  {
    id: 4,
    name: "Men's Jeans",
    image: "https://images.unsplash.com/photo-1721665107649-11e9773821b9?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 999,
    rating: 4.8,
    category: "Men",
    type: "Jeans",
    availableQuantity: 3,
    description:
      "Elevate your denim game with our Men’s Slim-Fit Jeans, expertly constructed from durable stretch denim for optimal comfort and longevity. These jeans feature a sleek tapered leg, classic five-pocket styling, and a zip-fly closure that ensures a tailored look. Whether paired with a crisp shirt for work or a relaxed tee for weekends, these jeans transition seamlessly from smart to casual occasions.",
  },
  {
    id: 5,
    name: "Men's T-Shirt",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 799,
    rating: 4.3,
    category: "Men",
    type: "T-Shirt",
    availableQuantity: 6,
    description:
      "Refined, reliable, and remarkably comfortable—our premium Men’s T-Shirt is designed for the modern man who values style without compromising comfort. Made from ultra-soft ringspun cotton, it features a flattering slim fit, ribbed collar, and double-stitched hems for long-lasting durability. Whether you’re dressing it up with a blazer or keeping it casual with jeans, this T-shirt is the ultimate go-to for everyday sophistication.",
  },
  {
    id: 6,
    name: "Kids' T-Shirt",
    image: "https://images.unsplash.com/photo-1628071645679-101ea5fad26f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 299,
    rating: 4.1,
    category: "Kids",
    type: "T-Shirt",
    availableQuantity: 2,
    description:
      "Bright, bold, and built for fun—our Kids’ T-Shirt brings together vibrant design and unbeatable comfort. Made from soft, skin-friendly cotton, this T-shirt is gentle on young skin and perfect for everyday adventures. With fun prints and sturdy stitching, it’s designed to withstand playtime, school days, and every little moment in between.",
  },
  {
    id: 7,
    name: "Men's Shirt",
    image: "https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 899,
    rating: 4.0,
    category: "Men",
    type: "Shirt",
    availableQuantity: 4,
    description:
      "Command attention with our tailored Men’s Shirt, crafted from a breathable cotton-rich fabric that keeps you cool and confident all day. Its crisp finish, structured collar, and buttoned cuffs make it ideal for formal settings, while the contemporary cut allows easy transition to smart-casual occasions. Pair it with trousers or chinos for a polished, professional look that never goes out of style.",
  },
  {
    id: 8,
    name: "Women's Jeans",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 1200,
    rating: 4.6,
    category: "Women",
    type: "Jeans",
    availableQuantity: 5,
    description:
      "Redefining everyday denim, our Women’s High-Rise Jeans deliver the perfect blend of elegance and functionality. Featuring a contour-hugging fit with a hint of stretch, these jeans sculpt your silhouette while offering day-long comfort. The deep indigo wash and refined stitching make them ideal for everything from office attire to casual weekend plans.",
  },
  {
    id: 9,
    name: "Men's Shirt",
    image: "https://images.unsplash.com/photo-1459785704030-654f6c5934a7?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 1499,
    rating: 4.9,
    category: "Men",
    type: "Shirt",
    availableQuantity: 2,
    description:
      "For the discerning gentleman, our luxury Men’s Shirt offers an elevated take on classic formalwear. Made from long-staple cotton with a silky-smooth finish, it features mother-of-pearl buttons and a tailored silhouette that speaks of understated elegance. Perfect for boardroom meetings or formal gatherings, it’s a premium shirt that exudes confidence.",
  },
  {
    id: 10,
    name: "Women's Shirt",
    image: "https://plus.unsplash.com/premium_photo-1691367279381-0bc5f1048916?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 1099,
    rating: 4.8,
    category: "Women",
    type: "Shirt",
    availableQuantity: 1,
    description:
      "Sleek, sophisticated, and smartly tailored—our Women’s Shirt is designed for those who dress with intention. Made from silky, breathable cotton blend, this shirt features a structured collar, full-length sleeves, and a feminine silhouette that flatters every body type. Perfect for presentations, interviews, or evening dinners, it’s a wardrobe hero for the style-conscious woman.",
  },
  {
    id: 11,
    name: "Kids' T-Shirt",
    image: "https://images.unsplash.com/photo-1564864310852-e1e98eb07010?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 249,
    rating: 4.4,
    category: "Kids",
    type: "T-Shirt",
    availableQuantity: 4,
    description:
      "Let your little one enjoy maximum comfort with our Kids' Cotton T-Shirt. Designed with vibrant colors and fun patterns, this tee is perfect for play, learning, and relaxation. The breathable fabric and reinforced stitching ensure durability, even after endless adventures and multiple washes.",
  },
  {
    id: 12,
    name: "Men's Hoodie",
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 899,
    rating: 4.7,
    category: "Men",
    type: "T-Shirt",
    availableQuantity: 5,
    description:
      "Stay cozy in style with our Men’s Full-Zip Hoodie, crafted from a plush cotton-polyester blend for superior softness and insulation. Featuring a lined hood, ribbed cuffs, and spacious front pockets, this hoodie is the ideal companion for cool-weather days, travel, or simply lounging in comfort. It’s not just a hoodie—it’s your new favorite layer.",
  }
];


  const getCategoryColor = (category : string) => {
    switch (category) {
      case "Men":
        return "bg-blue-500";
      case "Women":
        return "bg-pink-500";
      case "Kids":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  export const CategoryColor = (category: string) => {
    return getCategoryColor(category);
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "T-Shirt":
        return "bg-yellow-500";
      case "Shirt":
        return "bg-purple-500";
      case "Jeans":
        return "bg-indigo-500";
      case "Other":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  export const TypeColor = (type: string) => {
    return getTypeColor(type);
  }