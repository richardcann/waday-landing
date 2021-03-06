// @flow
import { fromJS } from 'immutable';
import type { State } from './types';

// The initial state of the App
const initialState = fromJS({
  search: null,
  battleMode: false,
  winner: null,
  challenger: null,
  loading: false,
  animateLoss: false,
  error: false,
  recommended: null,
  currentRating: null,
  homeGifLeft: null,
  homeGifRight: null,
  trends: [],
  data: {
    gifs: false,
  }
});

function homeReducer(state : State, action) {
  state = state || initialState;
  switch (action.type) {
    case 'SEARCH_CATEGORY':
      return state.set('loading', true)
        .set('error', false)
        .setIn(['data', 'gifs'], false);
    case 'SET_HOMEGIFLEFT':
      return state.set('homeGifLeft', action.gif);
    case 'SET_HOMEGIFRIGHT':
      return state.set('homeGifRight', action.gif);
    case 'SET_RECOMMENDATIONS':
      return state.set('recommended', action.recommendations);
    case 'SET_RATING':
      return state.set('currentRating', action.rating);
    case 'SET_TRENDS':
      return state.set('trends', action.trends);
    case 'ERROR_CLOSE':
      return state.set('error', false);
    case 'FETCH_SUCCESS':
      return state.set('loading', false)
        .set('battleMode', true)
        .set('winner', 0)
        .set('currentRating', 2.5)
        .set('challenger', 1)
        .setIn(['data', 'gifs'], action.data);
    case 'SET_CATEGORY':
      return state.set('search', action.category)
        .set('error', false);
    case 'ANIMATE_LOSS':
      return state.set('animateLoss', action.loser);
    case 'FETCH_FAILURE':
      return state.set('loading', false)
        .set('error', action.err);
    case 'ENTER_BATTLEMODE':
      return state.set('battleMode', true)
        .set('winner', action.champion)
        .set('animateLoss', false)
        .set('challenger', action.challenger);
    case 'EXIT_BATTLEMODE':
      return state.set('battleMode', false)
        .set('winner', null)
        .set('animateLoss', false)
        .set('challenger', null);
    default:
      return state;
  }
}

export default homeReducer;
