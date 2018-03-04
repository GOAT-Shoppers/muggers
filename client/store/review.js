import axios from 'axios';
import Reviews from '../../server/db/models/review';

const GET_REVIEWS = 'GET_REVIEWS';
const ADD_REVIEW = 'ADD_REVIEW';

const defaultReviews = [];

const getReviews = reviews => ({
  reviews: reviews,
  type: GET_REVIEWS
})

const addReview = review => ({
  review: review,
  type: ADD_REVIEW
})

//thunks
export const getAllReviews = productId =>
  dispatch =>
    axios.get(`/api/products/${productId}/reviews`)
    .then(reviews => dispatch(getReviews(reviews)))
    .catch(console.err);

export const createReview = review =>
  dispatch =>
    axios.post('api/reviews', review)
    .then(res => dispatch(addReview(res)))
    .catch(console.err);

export default function (reviews = [], action){
  switch (action.type){
    case GET_REVIEWS:
      return action.reviews
    case ADD_REVIEW:
      return reviews.push(action.review)
    default:
      return reviews
  }
}
