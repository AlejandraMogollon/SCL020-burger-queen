import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'


const Tables = ({ history, setTableRegister }) => {

    const goToMenu = (e) => {
        const tableName = e
        // console.log(tableName)
        setTableRegister(tableName)

        history.push('/menu')
    }




    return (
        <div className='containerOrder'>
            <div className='textSelectTable'>Selecciona la mesa</div>
            <div className='containerCircles'>
                <button type="button" className='circleTable boton-color' onClick={() => goToMenu(1)} value='1' >
                    <div className='tableNumbers'>1</div>
                </button>
                <button type="button" className='circleTable boton-color' onClick={() => goToMenu(2)} value='2'>
                    <div className='tableNumbers'>2</div>
                </button>
                <button type="button" className='circleTable boton-color' onClick={() => goToMenu(3)} value='3'>
                    <div className='tableNumbers'>3</div>
                </button>
                <button type="button" className='circleTable boton-color' onClick={() => goToMenu(4)} value='4'>
                    <div className='tableNumbers'>4</div>
                </button>
            </div>
        </div>
    )
}

export default withRouter(Tables)