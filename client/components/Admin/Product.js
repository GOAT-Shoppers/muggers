import React from 'react';

const makeRow = (product) =>
  (
    <div key={product.id}>
      <hr />
      <div className="productContainer">
        <p>  productId: {product.id}  </p>
        <p>  Name: {product.name}  </p>
        <p>  Description: {product.description}  </p>
        <p>  Stock: {product.stock}</p>
        <p>  Price: {product.price}</p>
      </div>
    </div>
  )

export default function Product(props) {
  return (
    <div>
      {props.products && props.products.map(product => makeRow(product))}
    </div>
  );
}
