import "./App.css";
import { ProductSearch } from "./components/ProductSearch";
import { WeatherApp } from "./components/WeatherApp";

function App() {
  return (
    <>
      <ProductSearch/>
      <WeatherApp/>
    </>
  );
}

export default App;



// import React, { useState } from 'react';

// interface ProductCardProps {
//   name: string;
//   price: number;
//   imageUrl: string;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ name, price, imageUrl }) => {
//   const [isInCart, setIsInCart] = useState<boolean>(false);
//   const [quantity, setQuantity] = useState<number>(0);

//   const handleAddToCart = () => {
//     setIsInCart(true);
//     setQuantity(1);
//   };

//   const handleIncrease = () => {
//     setQuantity(prevQuantity => prevQuantity + 1);
//   };

//   const handleDecrease = () => {
//     setQuantity(prevQuantity => {
//       if (prevQuantity > 1) {
//         return prevQuantity - 1;
//       } else {
//         setIsInCart(false);
//         return 0;
//       }
//     });
//   };

//   return (
//     <div style={{
//       border: '1px solid #ddd',
//       borderRadius: '8px',
//       padding: '16px',
//       width: '250px',
//       textAlign: 'center',
//       fontFamily: 'sans-serif',
//       boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
//     }}>
//       <img src={imageUrl} alt={name} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
//       <h3>{name}</h3>
//       <p style={{ color: '#666' }}>Rp {price.toLocaleString('id-ID')}</p>

//       <div>
//         {}
//         {!isInCart ? (
//           <button
//             onClick={handleAddToCart}
//             style={{ padding: '10px 20px', border: 'none', backgroundColor: '#007bff', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
//           >
//             Tambahkan Barang
//           </button>
//         ) : (
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
//             <button onClick={handleDecrease} style={{ padding: '10px', width: '40px' }}>-</button>
//             <span style={{ fontSize: '1.2em' }}>{quantity}</span>
//             <button onClick={handleIncrease} style={{ padding: '10px', width: '40px' }}>+</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const ProductPage: React.FC = () => {
//     return (
//         <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
//              <ProductCard
//                 name="Sampoerna Mild"
//                 price={36000}
//                 imageUrl="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.astronauts.id%2Fp%2Fsampoerna-a-mild-red-box-filterrokok-batang-16stick%3Fsrsltid%3DAfmBOorvnNvYZE8avdvVfRSS5sLruE7j4enqU5KmvZqC0pjJbQ128oqZ&psig=AOvVaw2x3oGpl8BKxg9YNbNLIBhH&ust=1756809646136000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCICu46evt48DFQAAAAAdAAAAABAE"
//             />
//             <ProductCard
//                 name="Class Mild"
//                 price={30000}
//                 imageUrl="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdewiana-store.id%2Fproducts-details%2Fclas-mild-purple%2F2699&psig=AOvVaw2lRBN7eapCT3iHUuIV9EVz&ust=1756809665084000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLDGjrGvt48DFQAAAAAdAAAAABAL"
//             />
//         </div>
//     );
// }


// export default ProductPage;