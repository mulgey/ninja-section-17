// styles
import './Login.css'

import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin'

export default function Login() {
  const [email, mailAksiyonu] = useState('');
  const [şifre, şifreAksiyonu] = useState('');

  const { giriş, yüklüyor, hata } = useLogin()

  const girişFormuFonksiyonu = (aksiyon) => {
    aksiyon.preventDefault();
    giriş(email, şifre);
  }

  return (
    <form className="auth-form" onSubmit={girişFormuFonksiyonu}>
      <h2>Giriş yap</h2>
      <label>
        <span>Email:</span>
        <input
          required
          type='email'
          onChange={(e) => mailAksiyonu(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Şifre:</span>
        <input
          required
          type='password'
          onChange={(e) => şifreAksiyonu(e.target.value)}
          value={şifre}
        />
      </label>
      {!yüklüyor && <button className='btn'>Giriş yap</button>}
      {yüklüyor && <button className='btn' disabled>Bekleyiniz...</button>}
      {hata && <div className='error'>{hata}</div>}
    </form>
  )
}
