import React, { useState } from 'react';
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc} from "firebase/firestore";
import { deleteObject , ref} from 'firebase/storage';
import { storageService } from '../fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
 
function Nweet({ nweetObj, isOwner }) {
    //isOwner 자신의 nweetObj의 uid와 같다면 삭제와 수정 가능
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
    

    //Delete Nweet Click!
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log(ok);
        if (ok) {
            //delete nweet
            await deleteDoc(NweetTextRef); //nweet 삭제
            await deleteObject(ref(storageService, nweetObj.attachmentUrl));
            //url에 uuid 랜덤이라 알지 못하기 때문에 ref 로 사진의 주소를 가져와 url 삭제
        }
    }

    const toggleEditing = () => {
        //editing 이 false 인지 true 인지 edit 버튼을 누를때 마다 바뀜
        //true 일 경우에만 return에서 보여짐
        setEditing(prev => !prev);
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        console.log(nweetObj, newNweet);
        await updateDoc(NweetTextRef, { text: newNweet });
        //NweetTextRef를 text만 수정해줌
        setEditing(false);
        //submit 을 하면 다시 editing을 false 로
        
    }
    const onChange = (event) => {
        const { target: { value }, } = event;
        setNewNweet(value);
        

    }
    return (
        <div key={nweetObj.id} className="nweet">
            {
                editing ? 
                    (
                        <>
                            <form onSubmit={onSubmit} className="container nweetEdit">
                                <input
                                    type="text"
                                    placeholder="Edit your nweet"
                                    value={newNweet}
                                    onChange={onChange}
                                    className="formInput"
                                    autoFocus
                                    required />
                                <input type="submit" value="Update Nweet" className='formBtn'/>
                        </form>
                        {/* <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button> */}
                       <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                        </span>
                        </>
                    ) :
                    (
                        <>
                            <h4>{nweetObj.text}</h4>
                            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                     {isOwner && (
                              
                                    <div className='nweet__actions'>
                                        {/* <button onClick={onDeleteClick}> Delete Nweet</button>
                                        <button onClick={toggleEditing}> Edit Nweet</button> */}
                                         <span onClick={onDeleteClick}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </span>
                                        <span onClick={toggleEditing}>
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </span>
                                    </div>
                    
  
                )
                            }
                        </>
                        
                    )
            }
        </div>
    );

}
export default Nweet;