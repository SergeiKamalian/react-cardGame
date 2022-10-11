import { ICard, IInGameTable } from "../../../model";
import { SET_COMPUTER_STATE, SET_COMP_COMMENT, SET_INTABLE_CARDS } from "./inGameTypes";


const INITIAL_STATE: IInGameTable = {
    inTableCards: [],
    userState: 'attacking',
    computerState: 'protecting-ok',
    compComment: false
};

const inGameReducer = (state = INITIAL_STATE, action: { type: string; payload: ICard[][] | string | boolean }) => {
    switch (action.type) {

        case SET_INTABLE_CARDS:
            return {
                ...state,
                inTableCards: action.payload as ICard[][] | [],
            };
        case SET_COMPUTER_STATE:
            return {
                ...state,
                computerState: action.payload as string,
            };
        case SET_COMP_COMMENT:
            return {
                ...state,
                compComment: action.payload as boolean,
            };
        default:
            return state;
    }
};
export default inGameReducer;
