import React from 'react';
import { connect } from 'react-redux';
import { createReview, getProdReviews, fetchReviews } from '../store/review'

const Review = (props) => {
  const reviews = props.reviews;

  //this add review section would only be available to logged in users, if logged out, the render would start with the reviews.map
  return (
    <div>
      <h3>Add a review</h3>
      <form onSubmit={evt => props.handleSubmit(evt)}>
        <label>Rating:</label>
          <select id="rating">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        <label>What do you have to say about this mug?</label>
        <input name="text" placeholder="Submit a review" />
        <button type="submit">Submit</button>
      </form>
      {reviews.reverse().map(el =>
        (<div key={el.id}>
          <p>Rating: {el.rating}</p>
          <p>{el.text}</p>
          <button key={el.id} onClick={(evt) => props.handleDelete(evt)}>Delete</button>
        </div>
      )
    )}
  </div>)
}


const mapState = (state, ownProps) => {
  const productId = ownProps.match.params.id;
  const reviews = state.review
  return {
//    product: state.product, current product selected, depending on how our store looks, maybe this is just a match.params method to get the ID
    reviews: reviews.filter(el => el.productId == productId) //filter reviews for specific product
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const newReview = {
        productId: ownProps.match.params.id,
        rating: document.getElementById('rating').value,
        text: document.querySelector('[name="text"]').value,
        //not sure how to get user Id - would this be on the session?
      }
      const thunk = createReview(newReview);
      dispatch(thunk);
      fetchReviews();
    },
    handleDelete(evt){
      console.log('This is the id', evt)
    }
  }
}

export default connect(mapState, mapDispatch)(Review)
