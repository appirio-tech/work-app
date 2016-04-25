import { SET_USER } from '../actions/user.js'

export default function user(state = {}, action) {
  if (action.type === SET_USER) {
    state = action.user
  }

  return state
}