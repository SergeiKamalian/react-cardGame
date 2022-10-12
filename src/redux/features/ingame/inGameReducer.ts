import { ICard, IInGameTable } from "../../../model";
import { SET_CLICKD_CARD, SET_CLICKED_USER_CARD, SET_COMPUTER_STATE, SET_COMP_COMMENT, SET_INTABLE_CARDS, SET_USER_STATE } from "./inGameTypes";


const INITIAL_STATE: IInGameTable = {
    inTableCards: [],
    userState: '',
    computerState: '',
    compComment: false,
    clickedTableCard: null,
    clickedUserCard: null
};

const inGameReducer = (state = INITIAL_STATE, action: { type: string; payload: ICard[][] | string | boolean | ICard }) => {
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
        case SET_USER_STATE:
            return {
                ...state,
                userState: action.payload as string,
            };
        case SET_COMP_COMMENT:
            return {
                ...state,
                compComment: action.payload as boolean,
            };
        case SET_CLICKD_CARD:
            return {
                ...state,
                clickedTableCard: action.payload as ICard,
            };
        case SET_CLICKED_USER_CARD:
            return {
                ...state,
                clickedUserCard: action.payload as ICard,
            };
        default:
            return state;
    }
};
export default inGameReducer;
