// styles
import './Signup.css'

import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {
  const [email, mailAksiyonu] = useState('');
  const [şifre, şifreAksiyonu] = useState('');
  const [displayName, displayNameAksiyonu] = useState('');
  const [foto, fotoAksiyonu] = useState(null);
  const [fotoHatası, fotoHatasıAksiyonu] = useState(null);
  const { kayıt, yüklüyor, hata } = useSignup();

  const kayıtFormuFonksiyonu = (aksiyon) => {
    aksiyon.preventDefault();
    // buradaki argümanların sırası useSignup içerisindeki sıra ile aynı olmalıdır
    kayıt(email, şifre, displayName, foto);
  }

  const uploadKontrol = (e) => {
    // önceden bir hikaye varsa sıfırlayalım
    fotoAksiyonu(null);
    // seçilenlerin array ine ulaşırız. biz ilkini istiyoruz
    // bu şekilde multiple seçimleri de engellemiş olduk
    let seçilen = e.target.files[0];
    console.log(seçilen)

    if (!seçilen) {
      fotoHatasıAksiyonu('Lütfen dosya seçmeden gitmeyin')
      return
    }
    if (!seçilen.type.includes('image')) {
      fotoHatasıAksiyonu('Seçtiğin dosya resim türevi olursa sevinirim')
      return
    }
    if (seçilen.size > 100000) {
      fotoHatasıAksiyonu('Güzel seçtin ama büyük seçtin, bu bana fazla =)')
      return
    }

    // testleri geçtiğine göre hata değerini bu noktada sıfırlayabiliriz
    fotoHatasıAksiyonu(null);
    fotoAksiyonu(seçilen);
    console.log('Resim yüklendi')
  }

  return (
    <form className="auth-form" onSubmit={kayıtFormuFonksiyonu}>
      <h2>Kayıt Ol</h2>
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
      <label>
        <span>Kullanıcı Adı:</span>
        <input
          required
          type='text'
          onChange={(e) => displayNameAksiyonu(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profil Fotoğrafı:</span>
        <input
          required
          type='file'
          onChange={uploadKontrol}
          // value={foto}
        />
        {fotoHatası && <div className='error'>{fotoHatası}</div>}
      </label>
      {!yüklüyor && <button className='btn'>Kayıt ol</button>}
      {yüklüyor && <button className='btn' disabled>Bekleyiniz...</button>}
      {hata && <div className='error'>{hata}</div>}
    </form>
  )
}
