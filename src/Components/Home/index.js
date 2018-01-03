import React from 'react'
import { DatePicker, Button } from 'antd'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        Hola
        <DatePicker />
        <Button type="primary">Primary</Button>
      </div>
    )
  }
}
