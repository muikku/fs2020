import Confirm from './Confirm'
import { useHistory } from 'react-router-dom'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../reducers/userReducer'
import { MenuItem } from '@material-ui/core'


const RemoveUserButton = ({ handleClick }) => {
  const history = useHistory()
  const loggedUser = useSelector(state => state.login)
  const user = useSelector(state => state.users.find(u => u.username === loggedUser.username))
  const dispatch = useDispatch()



  const RemoveAccount = () => {
    dispatch(deleteUser(user, user.id))
    history.push('/blogs')
  }

  return(
    <div>
      <Confirm
        buttonText={<MenuItem onClick={() => handleClick()}>remove</MenuItem>}
        dialogTitle="Remove accout"
        dialogText={`You are about to delete your account ${loggedUser.name}. All your blogs and information will be removed. This action cannot be reverted.`}
        confirmButtonName="Remove Account"
        cancelButtonName="Cancel"
        action={RemoveAccount}
      />
    </div>
  )
}

export default RemoveUserButton