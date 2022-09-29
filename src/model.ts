export interface ICard {
    cardName: string,
    id: number,
    trump: string,
    value: number
}
export interface ICardProps {
    card: ICard | null
    isBack: boolean
}

export interface IGameReducerState {
    userCards: ICard[],
    computerCards: ICard[],
    noBitoCards: ICard[],
    gameTrump: ICard | null
}