import React from 'react'
import OrdersChef from '../components/OrdersChef'

const SeeOrdersChef = ({orderWithId, }) => {
  return (
    <div>
        <OrdersChef orderWithId={orderWithId}  />
    </div>
  )
}

export default SeeOrdersChef