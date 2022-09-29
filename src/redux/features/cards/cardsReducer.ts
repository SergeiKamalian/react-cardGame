import { ICard } from "../../../model";
import { SET_ALL_CARDS } from "./cardsTypes";


const allCards: ICard[] = [
    { cardName: 'A-heart', id: 1, trump: 'heart', value: 14 },
    { cardName: '6-heart', id: 2, trump: 'heart', value: 6 },
    { cardName: '7-heart', id: 3, trump: 'heart', value: 7 },
    { cardName: '8-heart', id: 4, trump: 'heart', value: 8 },
    { cardName: '9-heart', id: 5, trump: 'heart', value: 9 },
    { cardName: '10-heart', id: 6, trump: 'heart', value: 10 },
    { cardName: 'J-heart', id: 7, trump: 'heart', value: 11 },
    { cardName: 'Q-heart', id: 8, trump: 'heart', value: 12 },
    { cardName: 'K-heart', id: 9, trump: 'heart', value: 13 },

    { cardName: 'A-spade', id: 10, trump: 'spade', value: 14 },
    { cardName: '6-spade', id: 11, trump: 'spade', value: 6 },
    { cardName: '7-spade', id: 12, trump: 'spade', value: 7 },
    { cardName: '8-spade', id: 13, trump: 'spade', value: 8 },
    { cardName: '9-spade', id: 14, trump: 'spade', value: 9 },
    { cardName: '10-spade', id: 15, trump: 'spade', value: 10 },
    { cardName: 'J-spade', id: 16, trump: 'spade', value: 11 },
    { cardName: 'Q-spade', id: 17, trump: 'spade', value: 12 },
    { cardName: 'K-spade', id: 18, trump: 'spade', value: 13 },

    { cardName: 'A-diamond', id: 19, trump: 'diamond', value: 14 },
    { cardName: '6-diamond', id: 20, trump: 'diamond', value: 6 },
    { cardName: '7-diamond', id: 21, trump: 'diamond', value: 7 },
    { cardName: '8-diamond', id: 22, trump: 'diamond', value: 8 },
    { cardName: '9-diamond', id: 23, trump: 'diamond', value: 9 },
    { cardName: '10-diamond', id: 24, trump: 'diamond', value: 10 },
    { cardName: 'J-diamond', id: 25, trump: 'diamond', value: 11 },
    { cardName: 'Q-diamond', id: 26, trump: 'diamond', value: 12 },
    { cardName: 'K-diamond', id: 27, trump: 'diamond', value: 13 },

    { cardName: 'A-club', id: 28, trump: 'club', value: 14 },
    { cardName: '6-club', id: 29, trump: 'club', value: 6 },
    { cardName: '7-club', id: 30, trump: 'club', value: 7 },
    { cardName: '8-club', id: 31, trump: 'club', value: 8 },
    { cardName: '9-club', id: 32, trump: 'club', value: 9 },
    { cardName: '10-club', id: 33, trump: 'club', value: 10 },
    { cardName: 'J-club', id: 34, trump: 'club', value: 11 },
    { cardName: 'Q-club', id: 35, trump: 'club', value: 12 },
    { cardName: 'K-club', id: 36, trump: 'club', value: 13 },
];

const INITIAL_STATE = {
    allCards: allCards
};

const cards = (state = INITIAL_STATE, action: { type: string; payload: ICard[] }) => {
    switch (action.type) {
        case SET_ALL_CARDS:
            return {
                ...state,
                allCards: action.payload as ICard[],
            };
        default:
            return state;
    }
};
export default cards;
