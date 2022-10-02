import React, {useState} from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword ,
} from 'firebase/auth';
import { authService } from '../fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function AuthForm() {
    
    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (event) => {
        
        const {target: {name, value},
        } = event;
        
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }

    };

    const onSubmit = async(event) => {
        event.preventDefault(); //기본 행위가 실행 x
        try{
            let data;
            
            if(newAccount){
                //create account
                //promise -> await async
                data = await createUserWithEmailAndPassword(authService, email, password)
            }else {
                //Log in
                data = await signInWithEmailAndPassword(authService, email, password)
            }
            console.log(data);

        }catch(error){
            setError(error.message);
        }
        
    };
     const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <>
            
            {/* <nav style={
                { marginBottom: "10px"}
            }>
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x"/>
           
            </nav> */}
              <form onSubmit={onSubmit} className="container">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Log In"}
                    className="authInput authSubmit"/>
                {error && <span className="authError">{error}</span>}
            </form>
            <span
                onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign in" : "Create Account"}
            </span>
            
            
        </>
    );
}
export default AuthForm;