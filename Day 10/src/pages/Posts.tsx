// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Card,
//   CardDescription,
//   CardTitle,
// } from "@/components/ui/card"

// type ProductType = {
//   id: number,
//   title: string,
//   description: string,
// }

// export default function Product () {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState<ProductType | null>
//   (null)

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//         <h1 className="text-4xl font-bold mb-4">Products</h1>
//         <ul className="mb-4">
//         {products.map((post) => (
// <Card key={products.id}>
//   <CardHeader>
//     <CardTitle>Card Title</CardTitle>
//     <CardDescription>Card Description</CardDescription>
//   </CardHeader>
// </Card>
//         ))}
//         </ul>
//     </div>
// }