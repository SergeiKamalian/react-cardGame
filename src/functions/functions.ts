import { GAME_VALUES, ICard } from "../model";

export const decideAttacker = (userCards: ICard[], compCards: ICard[], gameTrump: ICard | null) => {
    const smallUserTrump = userCards.filter((card) => card.trump === gameTrump?.trump).sort((a, b) => a.value - b.value)[0]
    const smallCompTrump = compCards.filter((card) => card.trump === gameTrump?.trump).sort((a, b) => a.value - b.value)[0]

    if (smallCompTrump?.value && smallUserTrump?.value) {

        if (smallCompTrump?.value > smallUserTrump?.value) {
            return GAME_VALUES.START_STEP_USER
        } else if (smallCompTrump?.value < smallUserTrump?.value) {
            return GAME_VALUES.START_STEP_COMPUTER
        }
    } else if (smallCompTrump?.value || smallUserTrump?.value) {

        if (smallCompTrump?.value && !smallUserTrump?.value) {
            return GAME_VALUES.START_STEP_COMPUTER
        } else if (!smallCompTrump?.value && smallUserTrump?.value) {

            return GAME_VALUES.START_STEP_USER
        }
    }
}

export const setUserAndCompCards = (allCards: ICard[], trump: ICard | null) => {

    allCards = allCards.filter((card) => card.id !== trump?.id)

    let arr: ICard[] = []

    allCards.forEach(() => {

        if (arr.length < 6) {
            const rand = Math.floor(Math.random() * allCards.length);
            if (trump?.cardName! !== allCards[rand].cardName) {
                arr.push(allCards[rand])
                allCards.splice(rand, 1)
            }
        }
    })
    return { allCards: allCards, newArr: arr };
}

export const randomArr = (array: ICard[]) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
export const getMinCloseCard = (array: ICard[], trump: ICard | null, inTableCardArr: ICard[]) => {
    let minItems = array.filter((arrItem) => arrItem.trump === inTableCardArr[0].trump)
    let minCard: ICard;
    if (minItems.length) {
        minCard = minItems.reduce((previous, current) => {
            return current.value < previous.value ? current : previous;
        });
    } else {
        minCard = array.reduce((previous, current) => {
            return current.value < previous.value ? current : previous;
        });
    }
    return minCard;
}
export const sortCardsFnc = (arr: ICard[]) => {
    return arr.sort(function (a, b) {
        var textA = a.trump.toUpperCase();
        var textB = b.trump.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
}

export const getNewCards = (array: ICard[], allCards: ICard[], gameTrump: ICard | null) => {
    // gameTrump && array.push(gameTrump)

    if (array.length < 6) {
        if (!allCards.find((card) => card.id === gameTrump?.id) && allCards.length > 0) {
            gameTrump && allCards.unshift(gameTrump)
        }
        for (let i = 0; i < 24; i++) {
            if (array.length < 6) {
                const newCard = allCards.pop()
                newCard && array.push(newCard)
            }
        }
    }
    return array;
}

export const attackMinCompCard = (array: ICard[], gameTrump: ICard | null) => {
    const allArray = array;
    array = array.filter((item) => item.trump !== gameTrump?.trump)
    let minCard: ICard | null = null;
    if (allArray.length) {
        if (array.length) {
            minCard = array.reduce((previous, current) => {
                return current.value < previous.value ? current : previous;
            });
        } else {
            minCard = allArray.reduce((previous, current) => {
                return current.value < previous.value ? current : previous;
            });
        }
    }
    return minCard
}