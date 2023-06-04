// bu dosya sayesinde "context" içerisindeki "AuthContext" dosyasını çağırmayız
// aracı olarak bu dosyayı kullanırız ve kapsam içerisinde kullanılıp kullanılmadığının kontrolünü de yaparız

import { useContext } from "react"
import { Authİçeriği } from "../context/AuthContext"

export const useAuthContext = () => {
  // createContext'i useContext takip eder. aynı ismi kullanırız
  // içerik = ".Provider" tag'ı içerisinde verdiğimiz value olur
  const içerik = useContext(Authİçeriği);

  // önceki (içerik === null) idi
  if (!içerik) {
    throw new Error("useAuthContext(), AuthSağlayıcı'nın kapsamı içerisinde kullanılmalıdır")
  }

  return içerik
} 