import axios from 'axios';

const GET_CATEGORIES = 'GET_CATEGORIES';
const POST_CATEGORY = 'POST_CATEGORY';

export const getCategories = categories => ({ type: GET_CATEGORIES, categories });

export const postCategory = category => ({ type: POST_CATEGORY, category });

export const fetchCategories = () => dispatch => {
    axios.get('/api/categories')
        .then(results => results.data)
        .then(categories => dispatch(getCategories(categories)))
        .catch(error => console.error('Could not get categories ', error));
}

export const createCategory = category => dispatch => {
    axios.post('/api/categories', category)
        .then(results => results.data)
        .then(newCategory => dispatch(postCategory(newCategory)))
        .catch(error => console.error('Could not post category ', error));
}

export default (categories = [], action) => {

    switch (action.type) {
        case GET_CATEGORIES:
            return action.categories;

        case POST_CATEGORY:
            return [...categories, action.category ];

        default: return categories;
    }
}

