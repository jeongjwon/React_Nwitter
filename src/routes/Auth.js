import { authService } from '../fbase';
import React, {useState} from "react";
import {  
    GithubAuthProvider, 
    GoogleAuthProvider, 
    signInWithPopup
} from 'firebase/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import {
   faTwitter,
   faGoogle,
   faGithub,
 } from "@fortawesome/free-brands-svg-icons";
import AuthForm from 'components/AuthForm';

function Auth() {
  
   
    
    
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
    <div className='authContainer'>
        <AuthForm />
       
        <div className='authBtns'>
            <button onClick={onSocialClick} name="google" className='authBtn'>
                Continue with Googlee <FontAwesomeIcon icon={faGoogle} />
            </button>
            <button onClick={onSocialClick} name="github" className='authBtn'>
                Continue with Github <FontAwesomeIcon icon={faGithub} />
            </button>
        </div>
    </div>
    );


}
export default Auth;