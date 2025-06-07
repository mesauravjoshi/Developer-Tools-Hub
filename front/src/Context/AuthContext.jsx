import { createContext, useState, useEffect, Children } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    console.log('calling...........');
    const getUserData = localStorage.getItem('user_data');
    const userData = JSON.parse(getUserData);
    setUsername(userData.username);
    setUserId(userData._id);
    setEmail(userData.email);
  }, [])

  return (
    <AuthContext.Provider value={{ username, userId, email }}>
      {children}
    </AuthContext.Provider>
  )
}