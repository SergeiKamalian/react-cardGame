import { ICard } from "../../model";
import { SET_ALL_CARDS } from "./cards/cardsTypes";
import { SET_NOBITO_CARDS, SET_COMPUTER_CARDS, SET_GAME_TRUMP, SET_USER_CARDS, SET_GAME_STARTER, SET_INTABLE_CARDS } from "./game/gameTypes";

export const setUserCards = (cards: ICard[]) => ({
	type: SET_USER_CARDS,
	payload: cards
})
export const setAllCards = (cards: ICard[]) => ({
    type: SET_ALL_CARDS,
    payload: cards
})
export const setComputerCards = (cards: ICard[]) => ({
	type: SET_COMPUTER_CARDS,
	payload: cards
})

export const setBitoCards = (cards: ICard[]) => ({
	type: SET_NOBITO_CARDS,
	payload: cards
})

export const setGameTrump = (trump: ICard) => ({
	type: SET_GAME_TRUMP,
	payload: trump
})
export const setGameStarter = (value: string) => ({
	type: SET_GAME_STARTER,
	payload: value
})

export const setInTableCards = (cards: ICard[][]) => ({
	type: SET_INTABLE_CARDS,
	payload: cards
})