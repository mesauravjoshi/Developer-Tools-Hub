import { createContext, useState, useEffect, Children } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // console.log('calling...........');
    const getUserData = localStorage.getItem('user_data');
    const userData = JSON.parse(getUserData);
    // console.log(getUserData);
    // console.log(userData);
    if (userData) {
      console.log('user data found in local storage:', userData);
      setUsername(userData.username);
      setUserId(userData._id);
      setEmail(userData.email);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ username, userId, email }}>
      {children}
    </AuthContext.Provider>
  )
}