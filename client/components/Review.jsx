import React from 'react';
import { connect } from 'react-redux';
import { createReview, fetchReviews } from '../store/review';

const Review = (props) => {
  const {reviews,user} = props;
  console.log(user.isLoggedIn)

  return (
    <div>
    {user.isLoggedIn ? (
      <div id="reviewInput">
        <h3>Add a review</h3>
        <form onSubmit={evt => props.handleSubmit(evt)}>
            <div>
              <label htmlFor="inlineFormCustomSelect">Rating</label>
              <select className="rating" id="inlineFormCustomSelect">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
                <option value="5">Five</option>
              </select>
            </div>
            <label>What do you have to say about this mug?</label>
            <div>
              <textarea aria-label="With textarea" name="text" id="reviewText" />
            </div>
          {props.user.isAdmin && (<button type="submit" className="btn btn-outline-dark rating" disabled={!props.isLoggedIn}>Submit</button>)}
      </form>
      </div>) :
      (<h3>Log in to leave a review!</h3>)}
      <h3>Reviews</h3>
      {reviews.reverse().map(el =>
        (<div key={el.id} id="reviewBox" className="genericBackground">
          <p>Rating: {el.rating}</p>
          <p>{el.text}</p>
          <button key={el.id} onClick={(evt) => props.handleDelete(evt)}>Delete</button>
        </div>
      )
    )}
  </div>)
}


const mapState = (state, ownProps) => {

  const productId = ownProps.id;
  const reviews = state.review
  return {
    userId: state.user.id,
    reviews: reviews.filter(el => el.productId == productId),
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const newReview = {
        productId: ownProps.id,
        rating: document.getElementById('inlineFormCustomSelect').value,
        text: document.querySelector('[name="text"]').value,
        userId: ownProps.userId
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
