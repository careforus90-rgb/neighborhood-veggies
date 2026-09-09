export const fetchFarmers = () => async (dispatch) => {
  dispatch({ type: 'FETCH_FARMERS_START' });
  try {
    const response = await fetch('/api/farmers');
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FETCH_FARMERS_SUCCESS',
        payload: data.farmers
      });
    } else {
      dispatch({
        type: 'FETCH_FARMERS_FAILURE',
        payload: data.message || 'Failed to fetch farmers'
      });
    }
  } catch (error) {
    dispatch({
      type: 'FETCH_FARMERS_FAILURE',
      payload: error.message
    });
  }
};

export const fetchFarmerById = (farmerId) => async (dispatch) => {
  dispatch({ type: 'FETCH_FARMER_DETAILS_START' });
  try {
    const response = await fetch(`/api/farmers/${farmerId}`);
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FETCH_FARMER_DETAILS_SUCCESS',
        payload: data.farmer
      });
    } else {
      dispatch({
        type: 'FETCH_FARMER_DETAILS_FAILURE',
        payload: data.message || 'Failed to fetch farmer'
      });
    }
  } catch (error) {
    dispatch({
      type: 'FETCH_FARMER_DETAILS_FAILURE',
      payload: error.message
    });
  }
};

export const getFarmerProducts = (farmerId) => async (dispatch) => {
  dispatch({ type: 'FETCH_FARMER_PRODUCTS_START' });
  try {
    const response = await fetch(`/api/farmers/${farmerId}/products`);
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FETCH_FARMER_PRODUCTS_SUCCESS',
        payload: data.products
      });
    } else {
      dispatch({
        type: 'FETCH_FARMER_PRODUCTS_FAILURE',
        payload: data.message || 'Failed to fetch farmer products'
      });
    }
  } catch (error) {
    dispatch({
      type: 'FETCH_FARMER_PRODUCTS_FAILURE',
      payload: error.message
    });
  }
};

export const filterFarmers = (filters) => async (dispatch) => {
  dispatch({ type: 'FILTER_FARMERS_START' });
  try {
    const queryParams = new URLSearchParams();
    if (filters.location) queryParams.append('location', filters.location);
    if (filters.rating) queryParams.append('rating', filters.rating);
    if (filters.search) queryParams.append('search', filters.search);
    
    const response = await fetch(`/api/farmers/filter?${queryParams}`);
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FILTER_FARMERS_SUCCESS',
        payload: data.farmers
      });
    } else {
      dispatch({
        type: 'FILTER_FARMERS_FAILURE',
        payload: data.message || 'Failed to filter farmers'
      });
    }
  } catch (error) {
    dispatch({
      type: 'FILTER_FARMERS_FAILURE',
      payload: error.message
    });
  }
};

export const addFarmerReview = (farmerId, review) => async (dispatch) => {
  try {
    const response = await fetch(`/api/farmers/${farmerId}/reviews`, {
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
        type: 'ADD_FARMER_REVIEW',
        payload: {
          farmerId,
          review: data.review
        }
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding farmer review:', error);
    return false;
  }
};

export const followFarmer = (farmerId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/farmers/${farmerId}/follow`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.ok) {
      dispatch({
        type: 'FOLLOW_FARMER',
        payload: farmerId
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error following farmer:', error);
    return false;
  }
};

export const unfollowFarmer = (farmerId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/farmers/${farmerId}/unfollow`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.ok) {
      dispatch({
        type: 'UNFOLLOW_FARMER',
        payload: farmerId
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error unfollowing farmer:', error);
    return false;
  }
};

export const setSelectedFarmer = (farmer) => (dispatch) => {
  dispatch({
    type: 'SET_SELECTED_FARMER',
    payload: farmer
  });
};

export const getFarmerStats = (farmerId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/farmers/${farmerId}/stats`);
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FETCH_FARMER_STATS_SUCCESS',
        payload: data.stats
      });
    }
  } catch (error) {
    console.error('Error fetching farmer stats:', error);
  }
};
