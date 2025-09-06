// import React, { useState, useEffect } from "react";
// import { fetchProducts, type Product } from "../api/products";
// import { useDebounce } from "../hooks/useDebounce";

// export function ProductSearch() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const debouncedSearchTerm = useDebounce(searchTerm, 500);

//   useEffect(() => {
//     if (debouncedSearchTerm) {
//       setLoading(true);
//       setError(null);
//       fetchProducts(debouncedSearchTerm)
//         .then((data) => {
//           setProducts(data);
//         })
//         .catch((err) => {
//           setError(err.message);
//           setProducts([]);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } else {
//       setProducts([]);
//       setError(null);
//     }
//   }, [debouncedSearchTerm]);

//   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div>
//       <h1>Pencarian Produk</h1>
//       <input
//         type="text"
//         placeholder="apa yang anda cari?"
//         value={searchTerm}
//         onChange={handleOnChange}
//         style={{ padding: "8px", width: "300px" }}
//       />

//       {loading && <p>Loading...</p>}

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {!loading &&
//         !error &&
//         products.length === 0 &&
//         debouncedSearchTerm && (
//           <p>Tidak Ada Product Yang Tersedia.</p>
//         )}

//       {!loading && !error && products.length > 0 && (
//         <ul>
//           {products.map((product) => (
//             <li key={product.id}>
//               <h3>{product.name}</h3>
//               <p>Rp {product.price.toLocaleString("id-ID")}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }