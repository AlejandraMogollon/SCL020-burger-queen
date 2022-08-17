import React, {Fragment} from 'react'
import { auth } from '../firebase/init'
import { Redirect } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
  return (
    <Fragment>
        { auth.currentUser ? children : <Redirect to={'/'} /> }

    </Fragment>
  )
}

export default PrivateRoutes