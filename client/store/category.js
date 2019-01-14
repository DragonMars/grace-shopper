import axios from 'axios'

const GOT_CATEGORIES = 'GOT_CATEGORIES'

const initialState = []

const gotCategories = categories => ({
  type: GOT_CATEGORIES,
  categories
})

export const fetchAllCategories = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/category')
    console.log('fetchallcategories data is ', data)
    dispatch(gotCategories(data))
  } catch (err) {
    console.error(err)
  }
}

export default function category(state = initialState, action) {
  switch (action.type) {
    case GOT_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
