import React from 'react'
import { NavLink } from 'react-router-dom'
import { auth, signOut } from '../firebase/init'
import { withRouter } from 'react-router-dom'



const Navbar = ({history, firebaseUser}) => {

    const cerrarSesion = () => {
        signOut(auth)
            .then(() => {
                history.push('/login')
            })
    }

    return (
        <div className='navbar'>
            <p className='navbar-brand' >VERDEN FOOD</p>
            <div>
                <div className='d-flex'>
                    {/* <NavLink className="btn btn-dark mrg-2" to="/" exact>
                        Inicio
                    </NavLink> */}
                    {
                        firebaseUser !== null && firebaseUser.email === 'soychef@verdenfood.cl' ? (
                            <NavLink className="btn btn-light mrg-2" to="/welcomechef">
                                Inicio Chef
                            </NavLink>
                        ) : null
                    }

                    {
                        firebaseUser !== null && firebaseUser.email === 'soymesonero@verdenfood.cl' ? (
                            <NavLink className="btn btn-light mrg-2" to="/welcomewaiter">
                                Soy Mesonero
                            </NavLink>
                        ) : null
                    }

                    {
                        firebaseUser !== null ? (
                            <button className="btn btn-light" onClick={() => cerrarSesion()} >Cerrar Sesión</button>
                        ) : (
                            <NavLink className="btn btn-light mrg-2" to="/" exact>
                                Login
                            </NavLink>

                        )

                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)