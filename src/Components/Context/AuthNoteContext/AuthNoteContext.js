import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
export let AuthNoteContext = createContext(null)

export default function AuthNoteContextProvider(props){
  const [userData, setUserData] = useState(null);
  const saveUserData = () => {
    let token = localStorage.getItem("token");
    if (token) {
      let decodedToken = jwtDecode(token);
      return setUserData(decodedToken);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) return saveUserData();
  }, []);

//==============================================================================================================================
    return <AuthNoteContext.Provider value={{ userData , logout , saveUserData}}>

        {props.children}

    </AuthNoteContext.Provider>
}