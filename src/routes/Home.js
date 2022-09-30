import { useEffect, useState } from "react";
import { addDoc,collection, query ,orderBy, onSnapshot} from "@firebase/firestore";
import { dbService } from "fbase";
import { ref, uploadString , getDownloadURL} from "@firebase/storage";
import Nweet from "../components/Nweet";
import { storageService } from "../fbase";

import { v4 as uuidv4 } from "uuid"; 
//npm i uuid
function Home({userObj}) {

    
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    //snapshot -> listener
    // const getNweets = async () => {
    //     const q = query(collection(dbService, "nweets"));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         const nweetObj = {
    //             ...doc.data(),
    //             id: doc.id,
                
    //         }
    //         setNweets(prev => [nweetObj, ...prev]);
    //     });
    // };
    useEffect(() => {
        // getNweets();
        const q = query(collection(dbService, "nweets"),
            orderBy("createdAt")); //"desc"));
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);

        });
    }, []);
   
    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            let attachmentUrl = ""; 
            if (attachment != "") {
                const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
                //file명에 대한 레퍼런스 , uuid는 랜덤이므로 우리가 알지 못한다

                const response = await uploadString(attachmentRef, attachment, "data_url");
                attachmentUrl = await getDownloadURL(response.ref);
            }
            
            const nweetObj = {
                //if attachment 가 있다면 attachmentUrl 추가
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
                attachmentUrl
            };
            await addDoc(collection(dbService, "nweets"), nweetObj);
            // const docRef = await addDoc(collection(dbService, "nweets"), {
            //     text:nweet,
            //     createdAt: Date.now(),
            //     creatorId:userObj.uid, //-> 누가 작성했는지 알 수 있음
            // });
            // console.log("Document written with ID: ", docRef.id);
            
            
        } catch (error) {
            console.error("Error adding document: ", error);
        }   
        setNweet("");
        setAttachment("");
    }
    const onChange = (event) => {
        const { target: { value }, } = event;
        setNweet(value);

    }
    
    const onFileChange = (event) => {
        const { target: { files }, 
        } = event;
        const theFile = files[0];

        //fileReader API 파일 이름을 읽음
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget : {result}, } = finishedEvent; //* */
            setAttachment(result);
        }//파일 로딩이 끝나거나 읽는 것이 끝나면 finishedEvent를 가진다

        reader.readAsDataURL(theFile); //그러고 thrFile을 문자 데이터 형테로 가져온다
        
        
    }

    const onClearAttachment= () => {
        setAttachment(null);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet"/>
                {attachment && 
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                }
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
       </div>
    )
}

export default Home;