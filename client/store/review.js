import axios from 'axios';

const GET_REVIEWS = 'GET_REVIEWS';
const ADD_REVIEW = 'ADD_REVIEW';
const FETCH_REVIEWS = 'FETCH_REVIEWS'
const DELETE_REVIEW = 'DELETE_REVIEW'

const getReviews = reviews => ({
  reviews: reviews,
  type: GET_REVIEWS
})

const addReview = review => ({
  review: review,
  type: ADD_REVIEW
})

const fetchReview = reviews => ({
  reviews: reviews,
  type: FETCH_REVIEWS
})

const removeReview = review => ({
  review: review,
  type: DELETE_REVIEW
})

//thunks
export const fetchReviews = () =>
  dispatch =>
    axios.get('/api/reviews')
      .then(res => res.data)
      .then(reviews => dispatch(fetchReview(reviews)))
      .catch(console.err)

export const getProdReviews = productId =>
  dispatch =>
    axios.get(`/api/products/${productId}/reviews`)
    .then(res => res.data)
    .then(reviews => dispatch(getReviews(reviews)))
    .catch(console.err);

export const createReview = review =>
  dispatch =>
    axios.post('/api/reviews', review)
    .then(res => res.data)
    .then(newRev => {
      dispatch(addReview(newRev))})
    .catch(console.err);

export const deleteReview = id =>
  dispatch =>
      axios.delete(`/api/reviews/${id}`)
      .then(deletedReview => {
        dispatch(removeReview(deletedReview))})
      .catch(console.err)

export default function (reviews = [], action){
  switch (action.type){
    case GET_REVIEWS:
      return action.reviews
    case ADD_REVIEW:
      return reviews.concat(action.review)
    case FETCH_REVIEWS:
      return action.reviews
    case DELETE_REVIEW:
      return reviews.filter(el => el.id !== action.review.id)
    default:
      return reviews
  }
}
