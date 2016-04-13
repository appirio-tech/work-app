import { combineReducers } from 'redux'

import entities from './entities'
import stepsByProject from './stepsByProject'
import user from './user'
import { reducer as form } from 'redux-form'
import attachments from './attachments'
import fileUploader from './fileUploader'
import projectSearch from './projectSearch'

const rootReducer = combineReducers({
  entities,
  stepsByProject,
  user,
  form,
  attachments,
  fileUploader,
  projectSearch
})

export default rootReducer