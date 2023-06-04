// bu sayfanın detaylı açıklaması bir önceki dersin "ThemeContext" dosyasında mevcut

import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const Authİçeriği = createContext()

// sonrasında başka bir dosyada kullanma ihtimaline karşın export'ladık
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_HAZIR_KITA':
      // önceki properties üstüne, kullanıcıyı mevcut olarak ve durumu hazır olarak güncelle
      return { ...state, user: action.payload, authHazırKıta: true }
    default:
      return state
  }
}

// children, ileride AuthSağlayıcı'nın sardığı bütün komponentleri temsil edecektir (= entire App)
// bunu index.js dosyası içerisinde yaparız
export const AuthSağlayıcı = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    // app.js içerisinde, hazır olmadan içeriği göstermemek için kullanacağız
    authHazırKıta: false
  })

  // sadece bir kez çalışacak authHazırKıta fonksiyonu
  useEffect(() => {
    // auth statusünde değişim olduğu zaman çalışacak bir fonk.
    // eğer kullanıcı varsa çalışacak, yoksa null olduğu için çalışmayacak
    const unsub = projectAuth.onAuthStateChanged((user) => {
      // AuthSağlayıcı içerisindeki user'ı da doğru veri ile güncellemiş oluruz
      dispatch({ type: 'AUTH_HAZIR_KITA', payload: user})
      // "const unsub" ekleyerek sadece 1 kez çalışmasını garantiledik
      unsub()
    })
  }, [])

  console.log('Authcontext state', state)

  return (
    // başka yerlerde kullanma durumuna karşın state sonrası dispatch'ı tercih ettik
    <Authİçeriği.Provider value={{...state, dispatch}}>
      { children }
    </Authİçeriği.Provider>
  )

}