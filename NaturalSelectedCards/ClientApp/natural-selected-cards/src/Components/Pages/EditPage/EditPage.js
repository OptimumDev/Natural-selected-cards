import React from "react";

export default function EditPage({deckId}) {
    return (
        <div className='page'>
            <div className='page-name'>
                Edit page
            </div>
            <div>
                id: {deckId}
            </div>
        </div>
    );
}