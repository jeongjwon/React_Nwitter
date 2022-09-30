import { useEffect, useState } from "react";
import { addDoc,collection, query ,orderBy, onSnapshot} from "@firebase/firestore";
import { dbService } from "fbase";
import Nweet from "../components/Nweet";


function Home({userObj}) {

    
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
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
            const docRef = await addDoc(collection(dbService, "nweets"), {
                text:nweet,
                createdAt: Date.now(),
                creatorId:userObj.uid, //-> 누가 작성했는지 알 수 있음
            }); 
            console.log("Document written with ID: ", docRef.id);
            
        } catch (error) {
            console.error("Error adding document: ", error);
        }   
        setNweet("");
    }
    const onChange = (event) => {
        const { target: { value }, } = event;
        setNweet(value);

    }
    // console.log(nweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120} />
                <input type="submit" value="Nweet"
                />
                
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