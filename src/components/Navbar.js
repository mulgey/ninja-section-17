// styles & images
import './Navbar.css'

import { Link } from 'react-router-dom'
import Temple from '../assets/temple.svg'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
  const { user } = useAuthContext();
  const {çıkış, yüklüyor} = useLogout();

  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt='dojo logo' />
          <span>The Dojo</span>
        </li>

        {!user && <li><Link to='/login'>Login</Link></li>}
        {!user && <li><Link to='/signup'>Signup</Link></li>}
        
        {user && (<li>
          {yüklüyor && <button className='btn' onClick={çıkış} disabled>Bekleyiniz...</button>}
          {!yüklüyor && <button className='btn' onClick={çıkış}>Logout</button>}
        </li>)}
      </ul>
    </div>
  )
}
