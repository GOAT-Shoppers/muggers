import React from 'react';


export default function Product(props) {
  console.log(props.products)
  return (
    <div>
      {props.products && props.products.map(product => makeRow(product))}
    </div>
  );
}

const makeRow = (product) =>
  <div key={product.id} className="flexContainer">
    <p>  productId: {product.id}  </p>
    <p>  Name: {product.name}  </p>
    <p>  Description: {product.description}  </p>
    <p>  Stock: {product.stock}</p>
    <p>  Price: {product.price}</p>
  </div>