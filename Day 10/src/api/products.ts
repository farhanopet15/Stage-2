// export interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

// const sampleProducts: Product[] = [
//   { id: 1, name: "Laptop", price: 15000000 },
//   { id: 2, name: "Iphone", price: 8000000 },
//   { id: 3, name: "Headshet", price: 1500000 },
//   { id: 4, name: "Keyboard", price: 750000 },
//   { id: 5, name: "Mouse", price: 500000 },
// ];

// export async function fetchProducts(
//   query: string
// ): Promise<Product[]> {
//   console.log("Fetching products for:", query);
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (query.toLowerCase() === "fail") {
//         reject(new Error("Failed to fetch products. Please try again later."));
//       } else {
//         const filteredProducts = sampleProducts.filter((product) =>
//           product.name.toLowerCase().includes(query.toLowerCase())
//         );
//         resolve(filteredProducts);
//       }
//     }, 1000);
//   });
// }