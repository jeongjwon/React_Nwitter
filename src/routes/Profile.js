import { authService } from "fbase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../fbase";
import { collection, getDoc, getDocs, query, where, orderBy } from "@firebase/firestore";
import { getNodeText } from "@testing-library/react";
import { updateProfile } from "firebase/auth";

function Profile({userObj, refreshUser}) {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    
    const onLogOutClick = () => {
         authService.signOut();
        navigate("/", { replace: true }); //go to home
    }
    
    const onChange = (event) => {
        const { target: { value }, } = event;
        
        setNewDisplayName(value);
    }
    
    const onSubmit = async (event) => {
        event.preventDefault();
   
        if (userObj.displayName !== newDisplayName) {
            //변경했다면
        //    await updateProfile(userObj, { displayName: newDisplayName });
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        }
       
            
        
    }
    const getMyNweets = async () => {
        //트윗 불러오기

        const q = query(collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt", "desc")
        );
        //nweets Docs 에서 userObj uid와 동일한 creatorId를 가진 문서를 내림차순으로 쿼리 생성
        //where 조건절안에서는 연산자들을 ,comma 로 나누어서 써야 함

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", JSON.stringify(doc.data()));
        });
        //쿼리 결과값 가져오기

    };
    useEffect(() => {
        //로그아웃

        getMyNweets();
    },[])
    return (
        <>
            <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                    <input
                    className="profileInput"
                    type="text"
                    placeholder="Display name"
                    onChange={onChange}
                    autoFocus
                    value={newDisplayName}
                />
                    <input
                        type="submit"
                        value="Update Profile"
                        className="formBtn"
                        style={{
                            marginTop: 10,
                        }}/>
            </form>
                {/* <button onClick={onLogOutClick} className="formBtn cancelBtn logOut">Log Out</button> */}
                 <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                    Log Out
                </span>
     
            </div>
        </>
    )
}

export default Profile;