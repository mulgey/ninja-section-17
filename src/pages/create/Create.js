import { useState } from 'react'

// styles
import './Create.css'

export default function Create() {
  // form alan bilgileri
  const [isim, isimAksiyonu] = useState('')
  const [detay, detayAksiyonu] = useState('')
  const [sonTarih, sonTarihAksiyonu] = useState('')
  const [kategori, kategoriAksiyonu] = useState('')
  const [atananlar, atananlarAksiyonu] = useState([])

  const projeFormuFonksiyonu = (aksiyon) => {
    aksiyon.preventDefault();
    console.log(isim, detay, sonTarih)
  }

  return (
    <div className='create-form'>
      <h2 className='page-title'>Yeni bir proje oluştur</h2>
      <form onSubmit={projeFormuFonksiyonu}>
        <label>
          <span>Proje İsmi:</span>
          <input
            required
            type='text'
            onChange={(e) => isimAksiyonu(e.target.value)}
            value={isim}
          />
        </label>
        <label>
          <span>Proje Detayları:</span>
          <textarea
            required
            type='text'
            onChange={(e) => detayAksiyonu(e.target.value)}
            value={detay}
          ></textarea>
        </label>
        <label>
          <span>Son Tarih:</span>
          <input
            required
            type='date'
            onChange={(e) => sonTarihAksiyonu(e.target.value)}
            value={sonTarih}
          />
        </label>
        <label>
          <span>Proje kategorisi:</span>
          {/* kategori seçimi buraya */}
        </label>
        <label>
          <span>Projeye atananlar:</span>
          {/* projeye atananlar buraya */}
        </label>
        
        <button className='btn'>Projeyi Ekle</button>
      </form>
    </div>
  )
}
