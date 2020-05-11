let currentHref = window.location.href;
if (currentHref.slice(-1) === '/')
    currentHref = currentHref.slice(0, -1);

const server =  process.env.NODE_ENV === 'development' ? "https://localhost:5001" : currentHref;
const api = `${server}/api/v1`;

const users = `${api}/users`;
const decks = `${api}/decks`;

export const auth = `${users}/auth`;
export const me = `${users}/me`;
export const logout = `${users}/logout`;

export const standardDecks = `${decks}/standard`;
