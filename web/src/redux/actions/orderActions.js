export const createOrder = (orderData) => async (dispatch) => {
  dispatch({ type: 'CREATE_ORDER_START' });
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(orderData)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'CREATE_ORDER_SUCCESS',
        payload: data.order
      });
      return data.order;
    } else {
      dispatch({
        type: 'CREATE_ORDER_FAILURE',
        payload: data.message || 'Failed to create order'
      });
      return null;
    }
  } catch (error) {
    dispatch({
      type: 'CREATE_ORDER_FAILURE',
      payload: error.message
    });
    return null;
  }
};

export const fetchOrders = () => async (dispatch) => {
  dispatch({ type: 'FETCH_ORDERS_START' });
  try {
    const response = await fetch('/api/orders', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FETCH_ORDERS_SUCCESS',
        payload: data.orders
      });
    } else {
      dispatch({
        type: 'FETCH_ORDERS_FAILURE',
        payload: data.message || 'Failed to fetch orders'
      });
    }
  } catch (error) {
    dispatch({
      type: 'FETCH_ORDERS_FAILURE',
      payload: error.message
    });
  }
};

export const fetchOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: 'FETCH_ORDER_DETAILS_START' });
  try {
    const response = await fetch(`/api/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FETCH_ORDER_DETAILS_SUCCESS',
        payload: data.order
      });
      return data.order;
    } else {
      dispatch({
        type: 'FETCH_ORDER_DETAILS_FAILURE',
        payload: data.message || 'Failed to fetch order'
      });
      return null;
    }
  } catch (error) {
    dispatch({
      type: 'FETCH_ORDER_DETAILS_FAILURE',
      payload: error.message
    });
    return null;
  }
};

export const cancelOrder = (orderId, reason) => async (dispatch) => {
  dispatch({ type: 'CANCEL_ORDER_START' });
  try {
    const response = await fetch(`/api/orders/${orderId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ reason })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'CANCEL_ORDER_SUCCESS',
        payload: data.order
      });
      return true;
    } else {
      dispatch({
        type: 'CANCEL_ORDER_FAILURE',
        payload: data.message || 'Failed to cancel order'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'CANCEL_ORDER_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const returnOrder = (orderId, returnReason) => async (dispatch) => {
  dispatch({ type: 'RETURN_ORDER_START' });
  try {
    const response = await fetch(`/api/orders/${orderId}/return`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ reason: returnReason })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'RETURN_ORDER_SUCCESS',
        payload: data.order
      });
      return true;
    } else {
      dispatch({
        type: 'RETURN_ORDER_FAILURE',
        payload: data.message || 'Failed to return order'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'RETURN_ORDER_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const trackOrder = (orderId) => async (dispatch) => {
  dispatch({ type: 'TRACK_ORDER_START' });
  try {
    const response = await fetch(`/api/orders/${orderId}/track`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'TRACK_ORDER_SUCCESS',
        payload: data.tracking
      });
      return data.tracking;
    } else {
      dispatch({
        type: 'TRACK_ORDER_FAILURE',
        payload: data.message || 'Failed to track order'
      });
      return null;
    }
  } catch (error) {
    dispatch({
      type: 'TRACK_ORDER_FAILURE',
      payload: error.message
    });
    return null;
  }
};

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    const response = await fetch(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ status })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'UPDATE_ORDER_STATUS_SUCCESS',
        payload: data.order
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
};

export const addOrderReview = (orderId, review) => async (dispatch) => {
  try {
    const response = await fetch(`/api/orders/${orderId}/review`, {
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
        type: 'ADD_ORDER_REVIEW_SUCCESS',
        payload: {
          orderId,
          review: data.review
        }
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding order review:', error);
    return false;
  }
};

export const getOrderInvoice = (orderId) => async (dispatch) => {
  dispatch({ type: 'GET_INVOICE_START' });
  try {
    const response = await fetch(`/api/orders/${orderId}/invoice`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.blob();
    if (response.ok) {
      dispatch({
        type: 'GET_INVOICE_SUCCESS'
      });
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      return true;
    } else {
      dispatch({
        type: 'GET_INVOICE_FAILURE',
        payload: 'Failed to get invoice'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'GET_INVOICE_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const getOrderHistory = (filters = {}) => async (dispatch) => {
  dispatch({ type: 'FETCH_ORDER_HISTORY_START' });
  try {
    const queryParams = new URLSearchParams();
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.fromDate) queryParams.append('fromDate', filters.fromDate);
    if (filters.toDate) queryParams.append('toDate', filters.toDate);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);

    const response = await fetch(`/api/orders/history?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FETCH_ORDER_HISTORY_SUCCESS',
        payload: data.orders
      });
    } else {
      dispatch({
        type: 'FETCH_ORDER_HISTORY_FAILURE',
        payload: data.message || 'Failed to fetch order history'
      });
    }
  } catch (error) {
    dispatch({
      type: 'FETCH_ORDER_HISTORY_FAILURE',
      payload: error.message
    });
  }
};

export const clearOrderError = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_ORDER_ERROR'
  });
};
