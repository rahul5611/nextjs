import React, { useState } from 'react';
import './css/productCard.css';
import Popover from '../SharedComponent/Popover';

const ProductCard = ({ products, onAddToCart }) => {  
  const [isVisible, setIsVisible] = useState(false);
  const [product, setProduct] = useState("")
  return (<>
    {products && products.length > 0 ? products.map((product, index) => {return <div className="product-card" onClick={() => {
          setIsVisible(true);
          setProduct(product);
        }}>
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info" >
        <div className="product-name">{product.name}</div>
        <div className="product-price-rating">
          <p className="product-price">₹{product.price.toLocaleString()}</p>
          <div className="product-rating">
            ⭐ {product.rating} ({product.reviews} Reviews)
          </div>
        </div>
        <button
          onClick={(e) => {
            onAddToCart(product);
            e.stopPropagation();            
          }}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
      </div>
    </div>}) : ""}
    {isVisible ? <><Popover product={product} isVisible={isVisible} setIsVisible={(val) => {
        setIsVisible(val);
        if(!val) {
          setProduct();
        }
      }}/></> : ""}
    </>
  );
};

export default ProductCard;
