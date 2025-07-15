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
  category: Category;
  type: Type;
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
  },
  {
    id: 2,
    name: "Women's Shirt",
    image: "",
    price: 599,
    rating: 4.2,
    category: "Women",
    type: "Shirt",
  },
  {
    id: 3,
    name: "Kids' Jeans",
    image: "",
    price: 450,
    rating: 4.7,
    category: "Kids",
    type: "Jeans",
  },
  {
    id: 4,
    name: "Men's Jeans",
    image: "",
    price: 999,
    rating: 4.8,
    category: "Men",
    type: "Jeans",
  },
  {
    id: 5,
    name: "Women's T-Shirt",
    image: "",
    price: 799,
    rating: 4.3,
    category: "Women",
    type: "T-Shirt",
  },
  {
    id: 6,
    name: "Kids' Shirt",
    image: "",
    price: 299,
    rating: 4.1,
    category: "Kids",
    type: "Shirt",
  },
  {
    id: 7,
    name: "Men's Shirt",
    image: "",
    price: 899,
    rating: 4.0,
    category: "Men",
    type: "Shirt",
  },
  {
    id: 8,
    name: "Women's Jeans",
    image: "",
    price: 1200,
    rating: 4.6,
    category: "Women",
    type: "Jeans",
  },
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