export interface ICard {
    cardName: string,
    id: number,
    trump: string,
    value: number
}
export interface ICardProps {
    card: ICard | null
    isBack: boolean
    index: number | null
}

export interface IGameReducerState {
    userCards: ICard[],
    computerCards: ICard[],
    noBitoCards: ICard[],
    gameTrump: ICard | null,
    gameStart: string
}
export interface IInGameTable {
    inTableCards: string
}
export enum GAME_VALUES {
    START_STEP_COMPUTER= 'START_STEP_COMPUTER',
    START_STEP_USER='START_STEP_USER'
}