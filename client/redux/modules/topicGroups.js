import { push } from 'react-router-redux'
import { getTopicGroup } from 'helpers/ioCommunicator'
import { openSnackbar } from 'redux/modules/snackbar'

const TOPIC_GROUPS_FETCHING_GROUP = 'TOPIC_GROUPS_FETCHING_GROUP'
const TOPIC_GROUPS_FETCHING_GROUP_FAILURE = 'TOPIC_GROUPS_FETCHING_GROUP_FAILURE'
const TOPIC_GROUPS_FETCHING_GROUP_SUCCESS = 'TOPIC_GROUPS_FETCHING_GROUP_SUCCESS'

//
// Action Creators
//

function topicGroupsFetchingGroup (groupName) {
  return {
    type: TOPIC_GROUPS_FETCHING_GROUP,
    groupName: groupName,
  }
}

function topicGroupsFetchingGroupFailure (groupName, error) {
  console.warn(error)
  return {
    type: TOPIC_GROUPS_FETCHING_GROUP_FAILURE,
    groupName: groupName,
    error: error,
  }
}

function topicGroupsFetchingGroupSuccess (groupName, topicList) {
  return {
    type: TOPIC_GROUPS_FETCHING_GROUP_SUCCESS,
    groupName: groupName,
    topicList: topicList,
  }
}

//
// End Action Creators
//

//
// Reducers
//

const initialState = {
  /*
  [groupName]: {
    error: '',
    topicList: [],
    isFetching: true,
  }
  */
}

export const initialGroupState = {
  error: '',
  topicList: [],
  isFetching: true,
}

export default function topicGroupReducer (state = initialState, action) {
  switch (action.type) {
    case TOPIC_GROUPS_FETCHING_GROUP :
      return {
        ...state,
        [action.groupName]: {
          ...initialGroupState,
          ...state[action.groupName],
          isFetching: true,
        },
      }
    case TOPIC_GROUPS_FETCHING_GROUP_FAILURE :
      return {
        ...state,
        [action.groupName]: {
          ...state[action.groupName],
          isFetching: false,
          error: action.error,
        },
      }
    case TOPIC_GROUPS_FETCHING_GROUP_SUCCESS :
      return {
        ...state,
        [action.groupName]: {
          ...state[action.groupName],
          isFetching: false,
          topicList: action.topicList,
        },
      }
    default :
      return state
  }
}

//
// End Reducers
//

//
// Thunks
//

export function gotoTopic (creator, slug) {
  return function (dispatch) {
    dispatch(push(`${creator}/${slug}`))
  }
}

export function fetchAndHandleTopicGroup (groupName) {
  return function (dispatch, getState) {
    dispatch(topicGroupsFetchingGroup(groupName))

    getTopicGroup(groupName)
      .then((topicList) => {
        dispatch(topicGroupsFetchingGroupSuccess(groupName, topicList))
      })
      .catch((error) => {
        dispatch(topicGroupsFetchingGroupFailure(groupName, error))
        dispatch(openSnackbar(error))
      })
  }
}

//
// End Thunks
//
