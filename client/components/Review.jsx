import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview } from '../store/review'

export const Review = (props) => {
  const { reviews } = props;
  //this add review section would only be available to logged in users, if logged out, the render would start with the reviews.map
  return (
    <div>
      <h3>Add a review</h3>
      <form onSubmit={evt => props.handleSubmit(evt)}>
        <select id="rating">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <input name="text" defaultValue="Submit a review" />
      </form>
      {reviews.map(el =>
        (<div key={el.id}>
          <p>Rating: {el.rating}</p>
          <p>{el.text}</p>
        </div>
      )
    )}
  </div>)
}


const mapState = (state) => {
  return {
//    product: state.product, //current product selected, depending on how our store looks, maybe this is just a match.params method to get the ID
    reviews: state.reviews //filter reviews for specific product
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
      handleSubmit(evt) {
        evt.preventDefault();
        const newReview = {
          productId: ownProps.match.params.productId, //not sure this is the right URI
          rating: document.getElementById('rating').value,
          text: document.querySelector('[name="text"]').value,
          //not sure how to get user Id - would this be on the session?
        }
        const thunk = createReview(newReview);
        dispatch(thunk);
    }
  }
}

connect(mapState, mapDispatch)(Review)
