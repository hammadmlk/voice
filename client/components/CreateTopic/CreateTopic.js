import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import {Card, CardText} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import CreateIcon from 'material-ui/svg-icons/content/create'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import { getBaseUrl, isBlankString } from 'helpers/utils'

CreateTopic.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  updateCreateTopicSlugValue: PropTypes.func.isRequired,
  updateCreateTopicTitleValue: PropTypes.func.isRequired,
  openCreateTopicModal: PropTypes.func.isRequired,
  closeCreateTopicModal: PropTypes.func.isRequired,
  createAndHandleTopic: PropTypes.func.isRequired,
}

const createButtonStyle = {
  position: 'fixed',
  right: '1rem',
  bottom: '1rem',
}

export default function CreateTopic (props) {
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
    <div>

      <Card containerStyle={{marginBottom: '1rem'}} onClick = {() => props.openCreateTopicModal()} >
        <CardText>
          <TextField hintText = {'Create a topic for discussion?'} fullWidth = {true} />
        </CardText>
      </Card>

      <FloatingActionButton onClick={() => props.openCreateTopicModal()} style={createButtonStyle}>
        <CreateIcon/>
      </FloatingActionButton>

      <Dialog
        title = 'Create a new discussion topic'
        actions = {actions}
        open = {props.isModalOpen}
        onRequestClose = {() => (props.closeCreateTopicModal())}>

        {props.isFetching
          ? <CircularProgress />
          : <section>
              <TextField
                floatingLabelText = {'Topic Title'}
                hintText = {'The topic of discussion'}
                value = {props.title}
                onChange = {(event) => (props.updateCreateTopicTitleValue(event.target.value))}
                autoFocus = {true}
                fullWidth = {true}
                multiLine = {true}
                rowsMax = {3}
                required = {true}/>

              <TextField
                floatingLabelText = {'Topic URL Slug'}
                hintText = {'Will be part of the URL'}
                value = {props.slug}
                onChange = {(event) => (props.updateCreateTopicSlugValue(event.target.value))}
                fullWidth = {true}
                required = {true} />

              <div>
                <small>{` ${getBaseUrl()}/${props.username}/${props.slug}`}</small>
              </div>
            </section>}
      </Dialog>

    </div>
  )
}
