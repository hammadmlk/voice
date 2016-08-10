import React from 'react'
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const sampleCard = (
  <Card containerStyle={{marginBottom: '1rem'}}>
    <CardHeader
      title='URL Avatar'
      subtitle='Subtitle'/>
    <CardTitle title='Card title' subtitle='Card subtitle' />
    <CardText>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.`}
    </CardText>
    <CardActions>
      <FlatButton label='Action1' />
    </CardActions>
  </Card>)

const VoiceFeedContainer = React.createClass({
  render () {
    return (
      <div>
        {sampleCard}
        {sampleCard}
        {sampleCard}
        {sampleCard}
      </div>
    )
  },
})
export default VoiceFeedContainer
