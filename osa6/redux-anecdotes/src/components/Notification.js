import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const {notification} = props
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification){
  return (
    <div style={style}>
      {notification}
    </div>
  )
  }
  return (<></>)
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotifications = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotifications