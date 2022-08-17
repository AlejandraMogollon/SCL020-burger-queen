import React from 'react'
import ViewOrder from '../stickers/VIEW-ORDER.png'
import MakeOrder from '../stickers/STICKER-CREAT-ORDER.png'
import { withRouter } from 'react-router-dom'

const WelcomeWaiter = ({history}) => {

    const goToMakeOrder = ()=>{
            history.push('/makeorder');
    }

    const goToSeeOrders = () =>{
        history.push('/orderswaiter')
    }

    return (
        <div className='containerbtn'>
            <div className='btnCheffunction'>
                <img src={MakeOrder} className="sticker-fit" alt='makeorder' onClick={()=>goToMakeOrder()}/>
                <div className='textFunctionbtn'>REALIZAR PEDIDO</div>
            </div>
            <div className='btnCheffunction' >
                <img src={ViewOrder} className="sticker-fit" alt='vieworder' onClick={()=>goToSeeOrders()}/>
                <div className='textFunctionbtn' >VER PEDIDOS</div>
            </div>
            
        </div>
    )
}

export default withRouter(WelcomeWaiter)