import React from 'react';

const Product = ({ product, setVisible }) => {
  return (
    <div className='pop-up' data-testid='popup'>
      <div className='product-img-div-pop-up'>
        <button className='exit-popup' data-testid='cancel' onClick={() => setVisible(false)}>x</button>
        <p>{product.price}$</p>
        <img src={product.URL} alt='IMG' data-testid='IMG' />
      </div>
      <div className='product-desc-div-pop-up'>
        <h3 data-testid='product-name'>{product.name}</h3>
        <span data-testid='product-desc'>{product.description}</span>
      </div>
    </div>
  )

}


export default Product