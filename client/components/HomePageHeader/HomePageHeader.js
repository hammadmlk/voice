import React from 'react'
import {Card, CardTitle} from 'material-ui/Card'
import {cyan500} from 'material-ui/styles/colors'

const cardTextColorStyle = {color: cyan500}

export default function HomePageHeader (props) {
  return (
    <Card zDepth={0}>

      <CardTitle
        title= {'Voice'}
        subtitle= {'voice your opinion'}
        titleStyle={cardTextColorStyle} />

    </Card>
  )
}
