const server =  process.env.NODE_ENV === 'development' ? "https://localhost:5001" : "https://nscards.herokuapp.com";
const api = `${server}/api/v1`;

const users = `${api}/users`;
const decks = `${api}/decks`;

export const auth = `${users}/auth`;
export const me = `${users}/me`;
export const logout = `${users}/logout`;

export const standardDecks = `${decks}/standard`;
