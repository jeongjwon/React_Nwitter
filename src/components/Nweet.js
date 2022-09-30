import React from 'react';

function Nweet({ nweetObj, isOwner }) {
    //isOwner 자신의 nweetObj의 uid와 같다면 삭제와 수정 가능
    return (
        <div key={nweetObj.id}>
            <h4>{nweetObj.text}</h4>
            {isOwner && (
                <> < button > Delete Nweet</button>
                    < button > Edit Nweet</button> </>
                    )
                }
        </div>
    );

}
export default Nweet;