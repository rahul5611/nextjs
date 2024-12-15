import React, { useState } from 'react';
import ProductCard from './ProductCard';

const Product = () => {
    const [cart, setCart] = useState([]);

    const products = [
        {
            image: 'https://exstatic-in.vivo.com/Oz84QB3Wo0uns8j1/in/1704281217116/e541e616989e1bb591be46e05181af8f.png_w860-h860.webp',
            name: 'vivo T3 Lite 5G (Majestic Black, 128 GB)',
            price: 10999,
            hhd: "128GB",
            ram: "4GB",
            rating: 4.5,
            reviews: 1800,
        },
        {
            image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/k/v/-original-imah34gxnuk2n2ek.jpeg?q=70',
            name: 'Xiaomi 14 CIVI (Aqua Blue, 512 GB)',
            price: 46999,
            hhd: "512GB",
            ram: "8GB",
            rating: 4.5,
            reviews: 1500,
        },
        {
            image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/x/i/8/-original-imag7chxqqu7h5hs.jpeg?q=70',
            name: 'Redmi 9A Sport (Coral Green, 32 GB)',
            price: 8999,
            hhd: "32GB",
            ram: "4GB",
            rating: 4.5,
            reviews: 2800,
        },
        {
            image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/r/v/c/-original-imah5p5fmyzxz8wu.jpeg?q=70',
            name: 'SAMSUNG Galaxy A16 5G (Light Green, 256 GB)  (8 GB RAM)',
            price: 15200,
            hhd: "256GB",
            ram: "8GB",
            rating: 4.0,
            reviews: 700,
        },
        {
            image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/r/v/c/-original-imah5p5fmyzxz8wu.jpeg?q=70',
            name: 'SAMSUNG Galaxy A16 5G (Light Green, 256 GB)  (8 GB RAM)',
            price: 15200,
            rating: 4.0,
            reviews: 700,
        },
        {
            image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/n/l/3/-original-imah27wvna2g9hfc.jpeg?q=70',
            name: 'vivo T3 Lite 5G (Majestic Black, 128 GB)  (6 GB RAM)',
            price: 11450,
            hhd: "128GB",
            ram: "6GB",
            rating: 4.5,
            reviews: 11800,
        },
        {
            image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/x/i/8/-original-imag7chxqqu7h5hs.jpeg?q=70',
            name: 'Redmi 9A Sport (Coral Green, 32 GB)',
            price: 8999,
            hhd: "32GB",
            ram: "4GB",
            rating: 4.5,
            reviews: 2800,
        },
        {
            image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/e/r/f/-original-imah56hkgehywn5b.jpeg?q=70',
            name: 'SAMSUNG Galaxy F05 (Twilight Blue, 64 GB)  (4 GB RAM)',
            price: 6499,            
            hhd: "64GB",
            ram: "4GB",
            rating: 4.5,
            reviews: 1100,
        },
        {
            image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/n/l/3/-original-imah27wvna2g9hfc.jpeg?q=70',
            name: 'vivo T3 Lite 5G (Majestic Black, 256 GB)  (8 GB RAM)',
            price: 14450,            
            hhd: "256GB",
            ram: "8GB",
            rating: 4,
            reviews: 18000,
        },
        {
            image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/x/i/8/-original-imag7chxqqu7h5hs.jpeg?q=70',
            name: 'Redmi 9A Sport (Coral Green, 32 GB)',
            price: 8999,
            hhd: "328GB",
            ram: "4GB",
            rating: 4.5,
            reviews: 2800,
        },
        {
            image: 'https://exstatic-in.vivo.com/Oz84QB3Wo0uns8j1/in/1704281217116/e541e616989e1bb591be46e05181af8f.png_w860-h860.webp',
            name: 'vivo T3 Lite 5G (Majestic Black, 128 GB)',
            price: 10999,            
            hhd: "128GB",
            ram: "6GB",
            rating: 4.5,
            reviews: 1800,
        },
        {
            image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/r/v/c/-original-imah5p5fmyzxz8wu.jpeg?q=70',
            name: 'SAMSUNG Galaxy A16 5G (Light Green, 256 GB)  (8 GB RAM)',
            price: 15200,
            hhd: "256GB",
            ram: "8GB",
            rating: 4.0,
            reviews: 700,
        },
    ]

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
        //alert(`${product.name} added to cart!`);
    };

    return (
        <div className="product">
            <h1>Product List 
                <i onClick={() => {setCart([])}} 
                    style={{fontSize: "16px", cursor: "pointer", float: "right", marginRight: "116px"}} 
                    class="fa fa-window-close" aria-hidden="true">
                        <span style={{marginLeft: "8px", fontFamily: '"Lexend Deca", sans-serif'}}>Clear Cart</span>
                </i>
            </h1>
            <span style={{
                float: "right",
                marginTop: "-62px",
                marginRight: "33px",}}><button style={{
                backgroundColor: "#FFF",
                color: " #2d2a29"
            }} className="btn">
                <i class="fa fa-shopping-basket" style={{fontSize: "20px"}}></i></button>
                <span style={{ color: "#ed1107", 
                        position: "relative", top: "-12px", right: "17px", padding: "8px", 
                        border: cart.length > 0 ? '1px solid #ed1107' : 0, borderRadius: "50px"
                    }}>
                        {cart.length > 0 ? cart.length : ""}
                </span> 
            </span>
            <div style={{ height: "calc(100vh - 258px)", overflowY: "auto" }}>
                <div className="product-grid">
                    <ProductCard products={products} onAddToCart={handleAddToCart} />
                </div>
            </div>
        </div>
    );
};

export default Product;
