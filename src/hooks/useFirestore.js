import { useEffect, useReducer, useState } from "react"
import { fireProject, zamanPulu } from "../firebase/config"

let ilkDurum = {
  document: null,
  yukleniyor: false,
  error: null,
  success: null
}

const fireRedükleyici = (state, action) => {
  switch (action.type) {
    // (2) dökümanEkle
    case 'YUKLENIYOR':
      return { yukleniyor: true, document: null, error: null, success: null }
    // (5) dökümanEkle
    case 'DOC_EKLE':
      return { yukleniyor: false, document: action.payload, success: true, error: null }
    case 'DOC_SIL':
        // "document: action.payload" u null olarak değiştirdik, döküman taşımadığımız için
        return { yukleniyor: false, document: null, success: true, error: null }
    case 'ERROR':
      return { yukleniyor: false, document: null, success: null, error: action.payload }
    default:
      return state
  }
}

export const useFirestore = (koleksiyon) => {
  // AuthContext'te response yerine state kullanmıştık
  const [response, dispatch] = useReducer(fireRedükleyici, ilkDurum)
  // clean-up altyapısı
  const [süreçİptali, süreçİptalAksiyonu] = useState(false);

  // koleksiyon referansı
  const referans = fireProject.collection(koleksiyon);

  // clean-up korumalı dispatch fonksiyonu
  const cancelYoksaDispatchle = (aksiyon) => {
    if (!süreçİptali) {
      dispatch(aksiyon)
    }
  }

  // döküman ekle
  // döküman object niteliğindedir
  const dökümanEkle = async (döküman) => {
    // (1) dökümanEkle
    dispatch({ type: 'YUKLENIYOR' });
    
    try {
      // (3) dökümanEkle
      // öncelikle mevcut tarihi içeren bir firestore zamanpulu oluşturup const ta saklamak istiyoruz
      const oluşturmaZamanı = zamanPulu.fromDate(new Date())
      const eklenenDöküman = await referans.add({ ...döküman, oluşturmaZamanı });
      // (4) dökümanEkle
      cancelYoksaDispatchle({ type: 'DOC_EKLE', payload: eklenenDöküman})
    } catch (err) {
      cancelYoksaDispatchle({ type: 'ERROR', payload: err.message })
    }
  }

  // döküman sil
  // silmek için ID'ye ihtiyaç duyulur
  const dökümanSil = async (id) => {
    dispatch({ type: 'YUKLENIYOR' })
    try {
      // dökümanı muhafaza etmek istemediğimiz için baştaki "const silinmişDöküman" kısmını sildik
      await referans.doc(id).delete();
      // dökümanı muhafaza etmeyeceğimiz için "payload: silinmişDöküman" kısmını sildik
      cancelYoksaDispatchle({ type: 'DOC_SIL' })
    } catch (err) {
      cancelYoksaDispatchle({ type: 'ERROR', payload: err.message + 'yani silemedim' })
    }
  }

  // clean-up
  useEffect(() => {
    return () => süreçİptalAksiyonu(true);
  }, [])

  return { dökümanEkle, dökümanSil, response}

}