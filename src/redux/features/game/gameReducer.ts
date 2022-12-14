import { ICard, IGameReducerState } from "../../../model";
import { SET_BITO_CARDS, SET_COMPUTER_CARDS, SET_GAME_STARTER, SET_GAME_TRUMP, SET_GAME_WIN, SET_USER_CARDS } from "./gameTypes";


const INITIAL_STATE: IGameReducerState = {
    userCards: [],
    computerCards: [],
    bitoCards: [],
    gameTrump: null,
    gameStart: '',
};

const gameReducer = (state = INITIAL_STATE, action: { type: string; payload: ICard[] | ICard | string }) => {
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
        case SET_GAME_STARTER:
            return {
                ...state,
                gameStart: action.payload as string,
            };

        case SET_BITO_CARDS:
            return {
                ...state,
                bitoCards: action.payload as ICard[],
            };
        // case SET_GAME_WIN:
        //     return {
        //         ...state,
        //         win: action.payload as string,
        //     };

        default:
            return state;
    }
};
export default gameReducer;
