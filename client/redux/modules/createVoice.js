// import { createVoice } from 'helpers/ioCommunicator'
// import { openSnackbar } from 'redux/modules/snackbar'

const CREATE_VOICE_OPEN_MODAL = 'CREATE_VOICE_OPEN_MODAL'
const CREATE_VOICE_CLOSE_MODAL = 'CREATE_VOICE_CLOSE_MODAL'

const CREATE_VOICE_UPDATE_TITLE_VALUE = 'CREATE_VOICE_UPDATE_TITLE_VALUE'
const CREATE_VOICE_UPDATE_TEXT_VALUE = 'CREATE_VOICE_UPDATE_TEXT_VALUE'

const CREATE_VOICE_FETCHING = 'CREATE_VOICE_FETCHING'
const CREATE_VOICE_FETCHING_FAILURE = 'CREATE_VOICE_FETCHING_FAILURE'
const CREATE_VOICE_FETCHING_SUCCESS = 'CREATE_VOICE_FETCHING_SUCCESS'

//
// Action Creators
//

export function openModal () {
  return {
    type: CREATE_VOICE_OPEN_MODAL,
  }
}

export function closeModal () {
  return {
    type: CREATE_VOICE_CLOSE_MODAL,
  }
}

export function updateTitleValue (newValue) {
  return {
    type: CREATE_VOICE_UPDATE_TITLE_VALUE,
    newValue: newValue,
  }
}

export function updateTextValue (newValue) {
  return {
    type: CREATE_VOICE_UPDATE_TEXT_VALUE,
    newValue: newValue,
  }
}

export function fetching () {
  return {
    type: CREATE_VOICE_FETCHING,
  }
}

export function fetchingFailure (error) {
  return {
    type: CREATE_VOICE_FETCHING_FAILURE,
    error: error,
  }
}

export function fetchingSuccess () {
  return {
    type: CREATE_VOICE_FETCHING_SUCCESS,
  }
}

//
// End Action Creators
//
