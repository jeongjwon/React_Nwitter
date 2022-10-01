import { authService } from '../fbase';
import React, {useState} from "react";
import {  
    GithubAuthProvider, 
    GoogleAuthProvider, 
    signInWithPopup
} from 'firebase/auth';

import AuthForm from 'components/AuthForm';

function Auth() {
  
    const [newAccount, setNewAccount] = useState(true);
   
    const toggleAccount = () => setNewAccount((prev) => !prev);
    
    const onSocialClick = async (event) => {
        const {target: {name},
        } = event ;
        let provider;

        if(name === "google"){
            provider = new GoogleAuthProvider();
        }else if(name === "github"){
            provider = new GithubAuthProvider();
        }

        const data = await signInWithPopup(authService, provider);
        console.log(data);
    };
    return (
    <div>
        <AuthForm />
        <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
        <div>
            <button onClick={onSocialClick} name="google">
                Continue with Google
            </button>
            <button onClick={onSocialClick} name="github">
                Continue with Github
            </button>
        </div>
    </div>
    );


}
export default Auth;