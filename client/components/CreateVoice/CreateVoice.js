import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import CreateIcon from 'material-ui/svg-icons/content/create'
import { isBlankString } from 'helpers/utils'

CreateVoice.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  topicCreator: PropTypes.string.isRequired,
  topicSlug: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary']),
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,

  // Action Dispatchers and Thunks
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateTextValue: PropTypes.func.isRequired,
  createAndHandleVoice: PropTypes.func.isRequired,
}

const createButtonStyle = {
  position: 'fixed',
  right: '1rem',
  bottom: '1rem',
}

export default function CreateVoice (props) {
  const actions = [
    <FlatButton
      label = 'Cancel'
      onTouchTap = {() => (props.closeModal())} />,
    <FlatButton
      label = 'Submit'
      primary = {true}
      disabled = {isBlankString(props.text) || props.isFetching}
      onTouchTap = {() => (props.createAndHandleVoice(props.topicCreator,
                                                      props.topicSlug,
                                                      props.username,
                                                      props.text,
                                                      props.type))} />,
  ]
  return (
    <div>
      <FloatingActionButton onClick={() => props.openModal()} style={createButtonStyle}>
        <CreateIcon/>
      </FloatingActionButton>

      <Dialog
        actions = {actions}
        open = {props.isModalOpen}
        autoScrollBodyContent={true}
        onRequestClose = {() => (props.closeModal())}>

        {props.isFetching
        ? <CircularProgress />
        : <section>
            <p>{`Add your voice to '${props.topicCreator}/${props.topicSlug}'`}</p>

            <TextField
              floatingLabelText = {'Say something ...'}
              hintText = {'Speak your mind'}
              value = {props.text}
              onChange = {(event) => (props.updateTextValue(event.target.value))}
              fullWidth = {true}
              multiLine = {true} />
          </section>}
      </Dialog>
    </div>
  )
}
