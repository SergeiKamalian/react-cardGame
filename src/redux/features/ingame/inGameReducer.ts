import { ICard, IInGameTable } from "../../../model";
import { SET_INTABLE_CARDS } from "./inGameTypes";


const INITIAL_STATE: IInGameTable = {
    inTableCards: [],
};

const inGameReducer = (state = INITIAL_STATE, action: { type: string; payload: ICard[][] | string }) => {
    switch (action.type) {

        case SET_INTABLE_CARDS:
            return {
                ...state,
                inTableCards: action.payload as ICard[][],
            };
        default:
            return state;
    }
};
export default inGameReducer;
