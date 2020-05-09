import {get, post} from "./fetchHelper";
import * as ApiUrls from '../Constants/ApiUrls'

export const authorizeUser = authCode => post(ApiUrls.auth, authCode);
export const getUserInfo = () => get(ApiUrls.me);
export const logoutUser = () => post(ApiUrls.logout);
export const getStandardDecks = () => get(ApiUrls.standardDecks);