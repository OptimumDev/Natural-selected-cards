const server =  process.env.NODE_ENV === 'development' ? "https://localhost:5001" : "https://nscards.herokuapp.com";
const api = `${server}/api/v1`;

const users = `${api}/users`;
export const auth = `${users}/auth`;
export const me = `${users}/me`;
export const logout = `${users}/logout`;

export const decks = `${api}/decks`;
export const standardDecks = `${decks}/standard`;
export const deck = id => `${decks}/${id}`;
export const copy = id => `${deck(id)}/copy`;
export const game = id => `${deck(id)}/game`;

export const cards = `${api}/cards`;
export const card = id => `${cards}/${id}`;
export const answer = id => `${card(id)}/answer`;
