import { useEffect, useRef, useState } from "react"
import { projectFirestore } from "../firebase/config";

export const useCollection = (koleksiyon, _whereQuery, _orderBy) => {
  const [ dökümanlar, dökümanlarAksiyonu] = useState(null);
  const [ hata, hataAksiyonu ] = useState(null);

  // array'imiz sonsuz loop'a girmesin diye useRef ekledik
  const whereQuery = useRef(_whereQuery).current;
  const orderBy = useRef(_orderBy).current;

  // başta çalışsın ve koleksiyon değiştiği zaman (listener)
  useEffect(() => {
    // ileride referans güncellenebileceği için const yerine let tercih ettik
    let referans = projectFirestore.collection(koleksiyon);

    // eğer bir sınırlama (query) varsa onu referans üzerinden where'leyelim
    // transaction'lar hangi kullanıcıya aitse ona gözüksün
    if (whereQuery) {
      // 3 nokta koyamamızın sebebi array içerisindeki her bir öğeyi işlemek
      referans = referans.where(...whereQuery)
    }

    if (orderBy) {
      referans = referans.orderBy(...orderBy)
    }

    // listener zamanı
    const unsubsr = referans.onSnapshot((anlıkPoz) => {
      let sonuçlar = [];
      // koleksiyondan geri gelen her döküman object i için
      anlıkPoz.docs.forEach((döküman) => {
        // sonuçlar array'i içerisinde data'sını enjekte ettik
        // id, user.uid ile aynı şey değil. dökümanın kendi ID'si
        sonuçlar.push({ ...döküman.data(), id: döküman.id })
      })

      // state'i güncelle
      dökümanlarAksiyonu(sonuçlar);
      hataAksiyonu(null)
    // onSnapshot için 2. argüman hata yönetimidir
    }, (err) => {
      hataAksiyonu(err.message + 'Yani veri çekemedim')
    })

    // unsub clean-up fonk
    return () => unsubsr()

  }, [koleksiyon, whereQuery, orderBy])

  return { dökümanlar, hata }
}