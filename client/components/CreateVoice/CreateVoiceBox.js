import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import {Card} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import SendIcon from 'material-ui/svg-icons/content/send'
import { isBlankString } from 'helpers/utils'
import Avatar from 'material-ui/Avatar'

CreateVoiceBox.propTypes = {
  type: PropTypes.oneOf(['primary', 'response']),
  text: PropTypes.string.isRequired,
  handleUpdateTextValue: PropTypes.func.isRequired,
  handleCreateVoice: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default function CreateVoiceBox (props) {
  const submitButton = (
    <IconButton
      disabled={isBlankString(props.text) || props.disabled}
      onTouchTap = {() => (props.handleCreateVoice())}>
      <SendIcon/>
    </IconButton>
  )

  const hintText = props.type === 'primary' ? 'Add your voice ...' : 'Add a response ...'

  const textField = (
    <TextField
      hintText = {hintText}
      fullWidth = {true}
      multiLine = {true}
      value = {props.text}
      onChange = {(event) => (props.handleUpdateTextValue(event.target.value))}/>)

  const zDepth = props.type === 'primary' ? 1 : 0

  return (
    <Card containerStyle={{marginBottom: '1rem'}} zDepth={zDepth}>
      <List>
        <ListItem
          innerDivStyle={{paddingTop: 0, paddingBottom: 0}}
          leftAvatar={<Avatar />}
          primaryText={textField}
          rightIconButton={submitButton}
          disabled = {true}/>
      </List>
    </Card>
  )
}
