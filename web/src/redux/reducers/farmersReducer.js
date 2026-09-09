const initialState = {
  farmers: [],
  loading: false,
  error: null,
  selectedFarmer: null,
  farmerProducts: []
};

export default function farmersReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_FARMERS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_FARMERS_SUCCESS':
      return {
        ...state,
        farmers: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_FARMERS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'SET_SELECTED_FARMER':
      return {
        ...state,
        selectedFarmer: action.payload.farmer,
        farmerProducts: action.payload.products || []
      };
    case 'FETCH_FARMER_PRODUCTS_START':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_FARMER_PRODUCTS_SUCCESS':
      return {
        ...state,
        farmerProducts: action.payload,
        loading: false
      };
    case 'FETCH_FARMER_PRODUCTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'UPDATE_FARMER_PROFILE':
      return {
        ...state,
        farmers: state.farmers.map(farmer =>
          farmer.id === action.payload.id ? action.payload : farmer
        ),
        selectedFarmer: state.selectedFarmer?.id === action.payload.id
          ? action.payload
          : state.selectedFarmer
      };
    case 'ADD_FARMER_PRODUCT':
      return {
        ...state,
        farmerProducts: [...state.farmerProducts, action.payload]
      };
    case 'REMOVE_FARMER_PRODUCT':
      return {
        ...state,
        farmerProducts: state.farmerProducts.filter(product => product.id !== action.payload)
      };
    case 'UPDATE_FARMER_PRODUCT':
      return {
        ...state,
        farmerProducts: state.farmerProducts.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    default:
      return state;
  }
}
