import { ICard } from "../../model";
import { SET_ALL_CARDS } from "./cards/cardsTypes";
import { SET_BITO_CARDS, SET_COMPUTER_CARDS, SET_GAME_TRUMP, SET_USER_CARDS, SET_GAME_STARTER, SET_INTABLE_CARDS } from "./game/gameTypes";
import { SET_CLICKD_CARD, SET_CLICKED_USER_CARD, SET_COMPUTER_STATE, SET_COMP_COMMENT, SET_USER_STATE } from "./ingame/inGameTypes";

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
	type: SET_BITO_CARDS,
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

export const setInTableCards = (cards: ICard[][] | []) => ({
	type: SET_INTABLE_CARDS,
	payload: cards
})

export const setComputerState = (state: string) => ({
	type: SET_COMPUTER_STATE,
	payload: state
})
export const setUserState = (state: string) => ({
	type: SET_USER_STATE,
	payload: state
})
export const setCompComment = (bool: boolean) => ({
	type: SET_COMP_COMMENT,
	payload: bool
})
export const setClickedCard = (card: ICard) => ({
	type: SET_CLICKD_CARD,
	payload: card
})
export const setUserClickedCard = (card: ICard) => ({
	type: SET_CLICKED_USER_CARD,
	payload: card
})