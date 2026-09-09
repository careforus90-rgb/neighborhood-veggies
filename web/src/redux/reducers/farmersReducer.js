const initialState = {
  farmers: [],
  selectedFarmer: null,
  farmerDetails: null,
  farmerProducts: [],
  farmerStats: null,
  loading: false,
  error: null
};

const farmersReducer = (state = initialState, action) => {
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
        loading: false
      };
    case 'FETCH_FARMERS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'FETCH_FARMER_DETAILS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_FARMER_DETAILS_SUCCESS':
      return {
        ...state,
        farmerDetails: action.payload,
        loading: false
      };
    case 'FETCH_FARMER_DETAILS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'FETCH_FARMER_PRODUCTS_START':
      return {
        ...state,
        loading: true,
        error: null
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
        error: action.payload,
        loading: false
      };
    case 'FILTER_FARMERS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FILTER_FARMERS_SUCCESS':
      return {
        ...state,
        farmers: action.payload,
        loading: false
      };
    case 'FILTER_FARMERS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'SET_SELECTED_FARMER':
      return {
        ...state,
        selectedFarmer: action.payload
      };
    case 'ADD_FARMER_REVIEW':
      return {
        ...state,
        farmerDetails: {
          ...state.farmerDetails,
          reviews: [...(state.farmerDetails.reviews || []), action.payload.review]
        }
      };
    case 'FOLLOW_FARMER':
      return {
        ...state,
        farmers: state.farmers.map(farmer =>
          farmer.id === action.payload
            ? { ...farmer, isFollowed: true }
            : farmer
        )
      };
    case 'UNFOLLOW_FARMER':
      return {
        ...state,
        farmers: state.farmers.map(farmer =>
          farmer.id === action.payload
            ? { ...farmer, isFollowed: false }
            : farmer
        )
      };
    case 'FETCH_FARMER_STATS_SUCCESS':
      return {
        ...state,
        farmerStats: action.payload
      };
    default:
      return state;
  }
};

export default farmersReducer;
