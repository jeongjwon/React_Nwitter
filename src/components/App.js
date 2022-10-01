
import React, { useState, useEffect } from 'react';
import { authService } from '../fbase';
import AppRouter from './Router';
import { updateCurrentUser, updateProfile } from "firebase/auth";
function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.getUser);
  useEffect(() => {
    //사용자의 변화를 관찰하는 관찰자
    authService.onAuthStateChanged((user) =>{
      if (user) {
        //이미 user가 있다면 login이 되었다고 수정
        setIsLoggedIn(true);
        if (user.displayName === null) {
          //이메일로 가입했을 때 == null
          
          const name = user.email.split('@')[0];
          user.displayName = name;
          // user.updateProfile({ displayName: "User", });
        }
        
          //user가 큰 Object 이므로 작은 부분(diplayName, uid, updateProfile)을 가져옴
          setUserObj({
          displayNAme: user.displayName,
          uid: user.uid,
          // updateProfile:
          //   (arg) => updateProfile(user, {displayName:user.displayName}),
        });

      }
      else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = async() => {
    const user = authService.currentUser;
    await updateCurrentUser(authService, user);
    setUserObj(user);
    // setUserObj({
    //       displayNAme: user.displayName,
    //       uid: user.uid,
    //       updateProfile:
    //         (arg) => updateProfile(user, {displayName:user.displayName}),
    //     });
  };
  return (
     <>
      {init ? (
        <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    <footer> &copy;  {new Date().getFullYear() } Nwitter</footer>
  </>
  );
}

export default App;
