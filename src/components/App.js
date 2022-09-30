
import React, { useState, useEffect } from 'react';
import { authService } from '../fbase';
import AppRouter from './Router';
function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  useEffect(() => {
    //사용자의 변화를 관찰하는 관찰자
    authService.onAuthStateChanged((user) =>{
      if (user) {
        //이미 user가 있다면 login이 되었다고 수정
        // setIsLoggedIn(true);
        setUserObj(user);
      }
      // else {
      //  setIsLoggedIn(false);
      // }
      setInit(true);
    });
  }, []);
  return (
     <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    <footer> &copy;  {new Date().getFullYear() } Nwitter</footer>
  </>
  );
}

export default App;
