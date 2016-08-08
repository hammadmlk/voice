import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { getBaseUrl, isBlankString } from 'helpers/utils'

CreateTopicDialog.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  updateCreateTopicSlugValue: PropTypes.func.isRequired,
  updateCreateTopicTitleValue: PropTypes.func.isRequired,
  closeCreateTopicModal: PropTypes.func.isRequired,
  createAndHandleTopic: PropTypes.func.isRequired,
}

export default function CreateTopicDialog (props) {
  const actions = [
    <FlatButton
      label = 'Cancel'
      onTouchTap = {() => (props.closeCreateTopicModal())} />,
    <FlatButton
      label = 'Submit'
      primary = {true}
      disabled = {isBlankString(props.slug) || isBlankString(props.username)}
      onTouchTap = {() => (props.createAndHandleTopic(props.username, props.slug, props.title))} />,
  ]

  return (
    <Dialog
      title = 'Create a new discussion topic'
      actions = {actions}
      open = {props.isModalOpen}
      onRequestClose = {() => (props.closeCreateTopicModal())}>

      <TextField
        floatingLabelText = {'Topic Title'}
        hintText = {'The topic of discussion'}
        value = {props.title}
        onChange = {(event) => (props.updateCreateTopicTitleValue(event.target.value))}
        multiLine = {true}
        rows = {1}
        rowsMax = {3}/>

      <TextField
        floatingLabelText = {'Topic URL Slug'}
        hintText = {'Will be part of the URL'}
        value = {props.slug}
        onChange = {(event) => (props.updateCreateTopicSlugValue(event.target.value))}
        required = {true} />

      <div>
        <small>{` ${getBaseUrl()}/${props.username}/${props.slug}`}</small>
      </div>

    </Dialog>
  )
}
