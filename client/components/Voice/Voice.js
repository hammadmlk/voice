import React, { PropTypes } from 'react'
import {CardActions, CardHeader, CardText} from 'material-ui/Card'
import CommentIcon from 'material-ui/svg-icons/communication/comment'
import IconButton from 'material-ui/IconButton'
import {ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

Voice.propTypes = {
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'response']),
}

export default function Voice (props) {
  return (
    props.type === 'primary'
      ? <section>
          <CardHeader title={props.username} />
          <CardText style={{whiteSpace: 'pre-wrap'}}>
            {props.text}
          </CardText>
          <CardActions >
            <IconButton>
              <CommentIcon/>
            </IconButton>
          </CardActions>
        </section>
      : <ListItem
          leftAvatar = {<Avatar />}
          primaryText = {props.username}
          secondaryText = {<p style={{height: '', whiteSpace: 'pre-wrap'}}>{props.text}</p>}
          disabled={true}/>
  )
}
