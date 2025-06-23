import styles from './Navbar.module.css'

import { NavLink } from 'react-router-dom'
import { useAuthentication } from '../../hook/useAuthentication'
import { useAuthValue } from '../../context/AuthContext'

function Navbar() {
    const { user } = useAuthValue();

    const { logout } = useAuthentication();

    return (
        <nav className={styles.navbar}>
            <NavLink to='/' className={styles.brand}>
                Mini <span>Blog</span>
            </NavLink>

            <ul className={styles.link_list}>
                <li>
                    <NavLink to='/' className={({isActive}) => (isActive ? styles.active : '')} >Ínicio</NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink to='/login' className={({isActive}) => (isActive ? styles.active : '')} >Login</NavLink>
                        </li>
                        <li>
                            <NavLink to='/register' className={({isActive}) => (isActive ? styles.active : '')} >Registrar</NavLink>
                        </li>
                    </>                    
                )}

                {user && (
                    <>
                        <li>
                            <NavLink to='/post/create' className={({isActive}) => (isActive ? styles.active : '')} >Novo Post</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard' className={({isActive}) => (isActive ? styles.active : '')} >Dashboard</NavLink>
                        </li>
                    </>                    
                )}

                <li>
                    <NavLink to='/about' className={({isActive}) => (isActive ? styles.active : '')}>Sobre</NavLink>
                </li>

                {user && (
                    <button onClick={logout}>Sair</button>
                )}
                
            </ul>
        </nav>
    )
}

export default Navbar