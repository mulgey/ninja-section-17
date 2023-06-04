import { useCollection } from '../hooks/useCollection'

// components
import Avatar from './Avatar'

// styles
import './OnlineUsers.css'

export default function OnlineUsers() {
  const { hata, dökümanlar } = useCollection('users')

  return (
    <div className='user-list'>
      <h2>Bütün Kullanıcılar</h2>
      {hata && <div className='error'>{hata}</div>}
      {dökümanlar && dökümanlar.map(kullanıcı => (
        <div key={kullanıcı.id} className='user-list-item'>
          {kullanıcı.online && <span className='online-user'></span>}
          <span>{kullanıcı.displayName}</span>
          <Avatar src={kullanıcı.photoURL} />
        </div>
      ))}
    </div>
  )
}
