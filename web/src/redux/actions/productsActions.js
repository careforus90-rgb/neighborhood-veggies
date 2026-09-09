export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_START' });
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FETCH_PRODUCTS_SUCCESS',
        payload: data.products
      });
    } else {
      dispatch({
        type: 'FETCH_PRODUCTS_FAILURE',
        payload: data.message || 'Failed to fetch products'
      });
    }
  } catch (error) {
    dispatch({
      type: 'FETCH_PRODUCTS_FAILURE',
      payload: error.message
    });
  }
};

export const fetchProductById = (productId) => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCT_DETAILS_START' });
  try {
    const response = await fetch(`/api/products/${productId}`);
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FETCH_PRODUCT_DETAILS_SUCCESS',
        payload: data.product
      });
    } else {
      dispatch({
        type: 'FETCH_PRODUCT_DETAILS_FAILURE',
        payload: data.message || 'Failed to fetch product'
      });
    }
  } catch (error) {
    dispatch({
      type: 'FETCH_PRODUCT_DETAILS_FAILURE',
      payload: error.message
    });
  }
};

export const filterProducts = (filters) => async (dispatch) => {
  dispatch({ type: 'FILTER_PRODUCTS_START' });
  try {
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (filters.search) queryParams.append('search', filters.search);
    
    const response = await fetch(`/api/products/filter?${queryParams}`);
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FILTER_PRODUCTS_SUCCESS',
        payload: data.products
      });
    } else {
      dispatch({
        type: 'FILTER_PRODUCTS_FAILURE',
        payload: data.message || 'Failed to filter products'
      });
    }
  } catch (error) {
    dispatch({
      type: 'FILTER_PRODUCTS_FAILURE',
      payload: error.message
    });
  }
};

export const searchProducts = (query) => async (dispatch) => {
  dispatch({ type: 'SEARCH_PRODUCTS_START' });
  try {
    const response = await fetch(`/api/products/search?q=${query}`);
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'SEARCH_PRODUCTS_SUCCESS',
        payload: data.products
      });
    } else {
      dispatch({
        type: 'SEARCH_PRODUCTS_FAILURE',
        payload: data.message || 'Search failed'
      });
    }
  } catch (error) {
    dispatch({
      type: 'SEARCH_PRODUCTS_FAILURE',
      payload: error.message
    });
  }
};

export const setSelectedProduct = (product) => (dispatch) => {
  dispatch({
    type: 'SET_SELECTED_PRODUCT',
    payload: product
  });
};

export const addReview = (productId, review) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${productId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(review)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'ADD_REVIEW',
        payload: {
          productId,
          review: data.review
        }
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding review:', error);
    return false;
  }
};

export const getCategoryProducts = (category) => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_START' });
  try {
    const response = await fetch(`/api/products/category/${category}`);
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FETCH_PRODUCTS_SUCCESS',
        payload: data.products
      });
    } else {
      dispatch({
        type: 'FETCH_PRODUCTS_FAILURE',
        payload: data.message || 'Failed to fetch products'
      });
    }
  } catch (error) {
    dispatch({
      type: 'FETCH_PRODUCTS_FAILURE',
      payload: error.message
    });
  }
};
