import { useEffect, useState } from "react";
import { collection, query ,orderBy, onSnapshot} from "@firebase/firestore";
import { dbService } from "fbase";

import Nweet from "../components/Nweet";
import NweetFactory from "components/NweetFactory";

//npm i uuid
function Home({userObj}) {

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
   
    
    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
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