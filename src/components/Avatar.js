// styles
import './Avatar.css'

// src'yi bir prop olarak ekledik
export default function Avatar({ src }) {
  return (
    <div className='avatar'>
      <img src={src} alt='user avatar' />
    </div>
  )
}
