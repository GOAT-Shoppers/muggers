import React from 'react';
import { connect } from 'react-redux';
import { createReview, fetchReviews } from '../store/review'

const Review = (props) => {
  const reviews = props.reviews;
  //this add review section would only be available to logged in users, if logged out, the render would start with the reviews.map
  return (
    <div>
      <h3>Add a review</h3>
      <form onSubmit={evt => props.handleSubmit(evt)}>
          <div className="col-auto my-1">
            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Rating</label>
            <select className="custom-select mr-sm-2 rating" id="inlineFormCustomSelect">
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
              <option value="5">Five</option>
            </select>
        </div>
        <label>What do you have to say about this mug?</label>
        <div className="input-group">
        <textarea className="form-control" aria-label="With textarea" />
      </div>
        <button type="submit" className="btn btn-outline-dark rating">Submit</button>
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
