const day = 1000 * 60 * 60 * 24;

export const myDecks = [
    {
        name: 'Words',
        id: 'id-my-words',
        lastRepeatTime: new Date(),
        cardsCount: 10,
        gamesCount: 7,
        userRating: 0.99,
        cards: [
            {id: 'words1', front: 'noun', back: 'существительное'},
            {id: 'words2', front: 'verb', back: 'глагол'},
            {id: 'words3', front: 'adjective', back: 'прилагательное'},
        ]
    },
    {
        name: 'Colors',
        id: 'id-my-colors',
        lastRepeatTime: new Date(Date.now() - 3 * day),
        cardsCount: 12,
        gamesCount: 4,
        userRating: 0.64,
        cards: [
            {id : 'colors1', front: 'red', back: 'красный'},
            {id : 'colors2', front: 'green', back: 'зеленый'},
            {id : 'colors3', front: 'blue', back: 'синий'},
        ]
    }
];

export const standardDecks = [
    {
        name: 'Family',
        id: 'id-standard-family',
        lastRepeatTime: null,
        cardsCount: 37,
        gamesCount: 0,
        userRating: 0,
        cards: [
            {id : 'family1', front: 'mother', back: 'мама'},
            {id : 'family2', front: 'father', back: 'папа'},
            {id : 'family3', front: 'brother', back: 'брат'},
            {id : 'family4', front: 'sister', back: 'сестра'},
        ]
    },
    {
        name: 'School',
        id: 'id-standard-school',
        lastRepeatTime: null,
        cardsCount: 42,
        gamesCount: 0,
        userRating: 0,
        cards: [
            {id : 'school1', front: 'book', back: 'книга'},
            {id : 'school2', front: 'pen', back: 'ручка'},
            {id : 'school3', front: 'lesson', back: 'урок'},
        ]
    }
];