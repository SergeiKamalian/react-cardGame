import { GAME_VALUES, ICard } from "../model";

export const decideAttacker = (userCards: ICard[], compCards: ICard[], gameTrump: ICard | null) => {
    const smallUserTrump = userCards.filter((card) => card.trump === gameTrump?.trump).sort((a, b) => a.value - b.value)[0]
    const smallCompTrump = compCards.filter((card) => card.trump === gameTrump?.trump).sort((a, b) => a.value - b.value)[0]

    if (smallCompTrump?.value && smallUserTrump?.value) {

        if (smallCompTrump?.value > smallUserTrump?.value) {
            console.log('начинает юзер');
            return GAME_VALUES.START_STEP_USER
        } else if (smallCompTrump?.value < smallUserTrump?.value) {
            console.log('начинает комп');
            return GAME_VALUES.START_STEP_COMPUTER
        }
    } else if (smallCompTrump?.value || smallUserTrump?.value) {

        if (smallCompTrump?.value && !smallUserTrump?.value) {
            console.log('начинает комп потому что у юзера нема козыра');
            return GAME_VALUES.START_STEP_COMPUTER
        } else if (!smallCompTrump?.value && smallUserTrump?.value) {
            console.log('начинает юзер потому что у компа нема козыра');

            return GAME_VALUES.START_STEP_USER
        }
    } else {
        console.log('nothing');
    }
}

export const decideAttackerInMoment = () => {

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
