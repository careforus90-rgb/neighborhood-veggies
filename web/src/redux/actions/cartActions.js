export const addToCart = (product) => (dispatch) => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: product
  });
};

export const removeFromCart = (productId) => (dispatch) => {
  dispatch({
    type: 'REMOVE_FROM_CART',
    payload: productId
  });
};

export const updateCartItemQuantity = (productId, quantity) => (dispatch) => {
  dispatch({
    type: 'UPDATE_CART_ITEM_QUANTITY',
    payload: {
      productId,
      quantity
    }
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_CART'
  });
};

export const applyDiscount = (discountCode, discountAmount) => (dispatch) => {
  dispatch({
    type: 'APPLY_DISCOUNT',
    payload: {
      code: discountCode,
      amount: discountAmount
    }
  });
};

export const removeDiscount = () => (dispatch) => {
  dispatch({
    type: 'REMOVE_DISCOUNT'
  });
};

export const saveCart = (cartItems) => async (dispatch) => {
  try {
    const response = await fetch('/api/cart/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ items: cartItems })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'SAVE_CART_SUCCESS',
        payload: data.cart
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving cart:', error);
    return false;
  }
};

export const loadCart = () => async (dispatch) => {
  dispatch({ type: 'LOAD_CART_START' });
  try {
    const response = await fetch('/api/cart', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'LOAD_CART_SUCCESS',
        payload: data.cart.items
      });
    } else {
      dispatch({
        type: 'LOAD_CART_FAILURE',
        payload: data.message || 'Failed to load cart'
      });
    }
  } catch (error) {
    dispatch({
      type: 'LOAD_CART_FAILURE',
      payload: error.message
    });
  }
};

export const validateCart = (cartItems) => async (dispatch) => {
  try {
    const response = await fetch('/api/cart/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items: cartItems })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'VALIDATE_CART_SUCCESS',
        payload: data.validatedItems
      });
      return true;
    } else {
      dispatch({
        type: 'VALIDATE_CART_FAILURE',
        payload: data.message || 'Cart validation failed'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'VALIDATE_CART_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const calculateCartTotal = (cartItems, discountAmount = 0) => (dispatch) => {
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax - discountAmount;
  
  dispatch({
    type: 'CALCULATE_CART_TOTAL',
    payload: {
      subtotal,
      tax,
      discount: discountAmount,
      total
    }
  });
};

export const setDeliveryAddress = (address) => (dispatch) => {
  dispatch({
    type: 'SET_DELIVERY_ADDRESS',
    payload: address
  });
};

export const setDeliveryDate = (date) => (dispatch) => {
  dispatch({
    type: 'SET_DELIVERY_DATE',
    payload: date
  });
};

export const validatePromoCode = (promoCode) => async (dispatch) => {
  dispatch({ type: 'VALIDATE_PROMO_START' });
  try {
    const response = await fetch('/api/promo/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: promoCode })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'VALIDATE_PROMO_SUCCESS',
        payload: data.promo
      });
      return data.promo;
    } else {
      dispatch({
        type: 'VALIDATE_PROMO_FAILURE',
        payload: data.message || 'Invalid promo code'
      });
      return null;
    }
  } catch (error) {
    dispatch({
      type: 'VALIDATE_PROMO_FAILURE',
      payload: error.message
    });
    return null;
  }
};

export const syncLocalStorageCart = (cartItems) => (dispatch) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    dispatch({
      type: 'SYNC_CART'
    });
  } catch (error) {
    console.error('Error syncing cart to localStorage:', error);
  }
};
