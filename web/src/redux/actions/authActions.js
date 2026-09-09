export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' });
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: data.user,
          userType: data.userType
        }
      });
      localStorage.setItem('token', data.token);
      return true;
    } else {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: data.message || 'Login failed'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'AUTH_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' });
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: data.user,
          userType: data.userType
        }
      });
      localStorage.setItem('token', data.token);
      return true;
    } else {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: data.message || 'Registration failed'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'AUTH_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};

export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    const response = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'UPDATE_USER',
        payload: data.user
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Profile update error:', error);
    return false;
  }
};

export const verifyToken = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch({ type: 'LOGOUT' });
      return;
    }
    const response = await fetch('/api/auth/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: data.user,
          userType: data.userType
        }
      });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  } catch (error) {
    dispatch({ type: 'LOGOUT' });
  }
};
