import axios from 'axios'
import history from '../history'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'


const defaultUser = {}

export const getUser = user => ({type: GET_USER, user})
export const removeUser = () => ({type: REMOVE_USER})
export const updateUser = user => ({type: UPDATE_USER, user})

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (firstName, lastName, email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { firstName, lastName, email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const updatingUser = user =>
  dispatch => {
     axios.put(`/api/users/${user.id}`, user)
           .then(results => results.data)
          .then(updatedUser => dispatch(updateUser(updatedUser)))
          .catch(error => console.error('Could not update user ', error));
}

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_USER:
      return action.user;
    default:
      return state
  }
}
