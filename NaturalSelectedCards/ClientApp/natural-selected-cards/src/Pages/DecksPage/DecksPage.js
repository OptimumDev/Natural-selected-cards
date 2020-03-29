import React from "react";

export default function Decks({isMine, onPlay}) {
    return (
        <div>
            {isMine ? 'My Decks' : 'Standard Decks'}
            <button onClick={() => onPlay(`id-123-${isMine ? 'mine' : 'standard'}`)}>
                Играть
            </button>
        </div>
    );
}