import {httpGet, httpDelete, httpPost, httpPut} from "./fetchHelper";
import * as ApiUrls from '../Constants/ApiUrls'

export const authorizeUser = authCode => httpPost(ApiUrls.auth, authCode);
export const getUserInfo = () => httpGet(ApiUrls.me);
export const logoutUser = () => httpPost(ApiUrls.logout);

export const getUserDecks = () => httpGet(ApiUrls.decks);
export const getStandardDecks = () => httpGet(ApiUrls.standardDecks);
export const getDeck = id => httpGet(ApiUrls.deck(id));
export const updateDeckTitle = (id, title) => httpPut(ApiUrls.deck(id), {title});
export const deleteDeck = id => httpDelete(ApiUrls.deck(id));
export const createDeck = id => httpPost(ApiUrls.deck(id));
export const copyDeck = id => httpPost(ApiUrls.copy(id));
export const getGameCards = id => httpGet(ApiUrls.game(id));

export const createCard = deckId => httpPost(ApiUrls.cards, {deckId});
export const deleteCard = id => httpDelete(ApiUrls.card(id));
export const updateCard = (id, question, answer) => httpPut(ApiUrls.card(id), {question, answer});
export const answerCard = (id, isRight) => httpPost(ApiUrls.card(id), isRight);
