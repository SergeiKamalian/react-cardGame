import { ICard, IGameReducerState } from "../../../model";
import { SET_COMPUTER_CARDS, SET_GAME_TRUMP, SET_USER_CARDS } from "./gameTypes";


const INITIAL_STATE: IGameReducerState = {
    userCards: [],
    computerCards: [],
    noBitoCards: [],
    gameTrump: null
};

const gameReducer = (state = INITIAL_STATE, action: { type: string; payload: ICard[] | ICard }) => {
    switch (action.type) {
        case SET_USER_CARDS:
            return {
                ...state,
                userCards: action.payload as ICard[],
            };

        case SET_COMPUTER_CARDS:
            return {
                ...state,
                computerCards: action.payload as ICard[],
            };

        case SET_GAME_TRUMP:
            return {
                ...state,
                gameTrump: action.payload as ICard,
            };
        default:
            return state;
    }
};
export default gameReducer;
