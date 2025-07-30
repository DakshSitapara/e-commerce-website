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
    image:
      "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 499,
    rating: 4.5,
    category: "Men",
    type: "T-Shirt",
    availableQuantity: 5,
    description:
      "This is a comfortable and stylish T-shirt made from high-quality cotton. It has a classic design and is suitable for casual wear.",
  },
  {
    id: 2,
    name: "Women's Shirt",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 599,
    rating: 4.2,
    category: "Women",
    type: "Shirt",
    availableQuantity: 5,
    description:
      "This is a high-quality women's shirt with a modern design. It is made from soft and breathable fabric and is suitable for formal wear.",
  },
  {
    id: 3,
    name: "Kids' Jeans",
    image:
      "https://images.unsplash.com/photo-1637069585336-827b298fe84a?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 450,
    rating: 4.7,
    category: "Kids",
    type: "Jeans",
    availableQuantity: 6,
    description:
      "These are high-quality jeans for kids made from durable and comfortable fabric. They have a classic design and are suitable for casual wear.",
  },
  {
    id: 4,
    name: "Men's Jeans",
    image:
      "https://images.unsplash.com/photo-1721665107649-11e9773821b9?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 999,
    rating: 4.8,
    category: "Men",
    type: "Jeans",
    availableQuantity: 3,
    description:
      "These are high-quality jeans for men made from durable and comfortable fabric. They have a modern design and are suitable for formal wear.",
  },
  {
    id: 5,
    name: "Men's T-Shirt",
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 799,
    rating: 4.3,
    category: "Men",
    type: "T-Shirt",
    availableQuantity: 6,
    description:
      "This is a high-quality T-shirt for men made from soft and breathable fabric. It has a classic design and is suitable for casual wear.",
  },
  {
    id: 6,
    name: "Kids' T-Shirt",
    image:
      "https://images.unsplash.com/photo-1628071645679-101ea5fad26f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 299,
    rating: 4.1,
    category: "Kids",
    type: "T-Shirt",
    availableQuantity: 2,
    description:
      "This is a high-quality T-shirt for kids made from soft and breathable fabric. It has a fun design and is suitable for casual wear.",
  },
  {
    id: 7,
    name: "Men's Shirt",
    image:
      "https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 899,
    rating: 4.0,
    category: "Men",
    type: "Shirt",
    availableQuantity: 4,
    description:
      "This is a high-quality shirt for men made from soft and breathable fabric. It has a modern design and is suitable for formal wear.",
  },
  {
    id: 8,
    name: "Women's Jeans",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 1200,
    rating: 4.6,
    category: "Women",
    type: "Jeans",
    availableQuantity: 5,
    description:
      "These are high-quality jeans for women made from durable and comfortable fabric. They have a modern design and are suitable for formal wear.",
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