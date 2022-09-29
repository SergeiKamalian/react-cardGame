import { ICard } from "../model";

export const setUserAndCompCards = (allCards: ICard[], trump: ICard | null) => {

    allCards = allCards.filter((card) => card.id != trump?.id)
    console.log(trump);
    console.log(allCards);
    
    
    
    let arr: ICard[] = []

    allCards.forEach((card) => {

        if (arr.length < 6) {
            const rand = Math.floor(Math.random() * allCards.length);
            if (trump?.cardName! != allCards[rand].cardName) {
                arr.push(allCards[rand])
                allCards.splice(rand, 1)
            }
        }
    })
    return { allCards: allCards, newArr: arr };
}

export const randomArr = (array: ICard[]) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
