const initialState = {
  orders: [],
  loading: false,
  error: null,
  selectedOrder: null,
  orderHistory: []
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_ORDERS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_ORDERS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'FETCH_ORDER_HISTORY_START':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_ORDER_HISTORY_SUCCESS':
      return {
        ...state,
        orderHistory: action.payload,
        loading: false
      };
    case 'FETCH_ORDER_HISTORY_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'CREATE_ORDER_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'CREATE_ORDER_SUCCESS':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        orderHistory: [...state.orderHistory, action.payload],
        loading: false
      };
    case 'CREATE_ORDER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'SET_SELECTED_ORDER':
      return {
        ...state,
        selectedOrder: action.payload
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        ),
        orderHistory: state.orderHistory.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        )
      };
    case 'CANCEL_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload
            ? { ...order, status: 'cancelled' }
            : order
        ),
        orderHistory: state.orderHistory.map(order =>
          order.id === action.payload
            ? { ...order, status: 'cancelled' }
            : order
        )
      };
    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
        orderHistory: state.orderHistory.filter(order => order.id !== action.payload)
      };
    default:
      return state;
  }
}
