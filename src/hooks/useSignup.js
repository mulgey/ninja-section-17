import { useEffect, useState } from "react"
import { projectAuth, projectFirestore, projectStorage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [süreçİptali, süreçİptalAksiyonu] = useState(false);
  const [hata, hataAksiyonu] = useState(null);
  const [yüklüyor, yüklemeAksiyonu] = useState(false);
  const { dispatch } = useAuthContext();

  const kayıt = async (eposta, şifre, kullanıcı, foto) => {
    // önceden bir hata kaldı ise onu sıfırlıyoruz
    hataAksiyonu(null);
    yüklemeAksiyonu(true);

    try {
      // kayıt işlemini gerçekleştir
      const yanıt = await projectAuth.createUserWithEmailAndPassword(eposta, şifre);

      // bağlantı kötü veya hatalı ise manuel hata atarız
      if (!yanıt) {
        throw new Error('Kayıt işlemi tamamlanamadı')
      }

      // kullanıcı fotosunu yükle
      // her kullanıcının kendi ID'si ismindeki klasör için yolak hazırlıyoruz
      const uploadYolu = `thumbnails/${yanıt.user.uid}/${foto.name}`
      // o yolak için fotoyu "put" luyoruz
      const img = await projectStorage.ref(uploadYolu).put(foto);
      // fotoğraf içerisinden URL linkini çıkarıyoruz
      const imgURL = await img.ref.getDownloadURL()

      // kullanıcıya kullanıcıAdı eklemeyi eposta ve şifre eklemek dışında güncelleme ile yapabiliyoruz
      // eğer kullanıcı yerine displayName kullansaydık { displayName } yeterli olacaktı
      // diğer bir ekleme parametresi ise profil fotosu URL'i
      // fotoğraf upload edildikten sonra bu kod çalışmalı
      // buradaki "displayName" ve "photoURL" sabit parametreler, bizim türettiğimiz isimler değil
      await yanıt.user.updateProfile({ displayName: kullanıcı, photoURL: imgURL });

      // bir kullanıcı dökümanı oluştur
      // koleksiyonumuz yoktu, 'users' ile başladık
      // add dedikten sonra boş bırakarak rastgele bir ID vermesini istemedik. doc kullandık
      // sonrasında data'yı set'leriz
      await projectFirestore.collection('users').doc(yanıt.user.uid).set({
        online: true,
        displayName: kullanıcı,
        photoURL: imgURL
      })

      // login aksiyonunu dispatch le
      dispatch({ type: 'LOGIN', payload: yanıt.user })

      // eğer süreç takılmamış ise (clean-up)
      if (!süreçİptali) {
        yüklemeAksiyonu(false);
        hataAksiyonu(null);
      }
    
    // şifre çok kısa olabilir, email daha önce alınmış olabilir
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

  return { hata, yüklüyor, kayıt };
}