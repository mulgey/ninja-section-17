import { useEffect, useState } from "react"
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [süreçİptali, süreçİptalAksiyonu] = useState(false)
  const [hata, hataAksiyonu] = useState(null);
  const [yüklüyor, yüklemeAksiyonu] = useState(false);
  const { dispatch } = useAuthContext();

  const giriş = async (eposta, şifre) => {
    // önceden bir hata kaldı ise onu sıfırlıyoruz
    hataAksiyonu(null);
    yüklemeAksiyonu(true);

    // logout işlemini dene
    try {
      const yanıt = await projectAuth.signInWithEmailAndPassword(eposta, şifre)
      // sisteme girdikten sonra online: true yapalım
      await projectFirestore.collection('users').doc(yanıt.user.uid).update({
        online: true
      })

      // login aksiyonunu dispatch la
      dispatch({ type: 'LOGIN', payload: yanıt.user })

      // eğer süreç takılmamış ise (clean-up)
      if (!süreçİptali) {
        yüklemeAksiyonu(false);
        hataAksiyonu(null);
      }

    } catch (err) {
      // eğer süreç takılmamış ise (clean-up)
      if (!süreçİptali) {
        hataAksiyonu(err.message)
        yüklemeAksiyonu(false);
      }
    }
  }

  useEffect(() => {
    // süreç iptal olursa (unmount) clean-up fonksiyonunu çalıştırıyoruz
    return () => süreçİptalAksiyonu(true);
  }, [])

  return { giriş, hata, yüklüyor }

}