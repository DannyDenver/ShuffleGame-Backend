export function shuffleCards(deck: string[]): string[] {
    for (var i = deck.length - 1; i > 0; i--) {
        const swapIndex = Math.floor(Math.random() * (i + 1))
        const currentCard = deck[i]
        const cardToSwap = deck[swapIndex]
        deck[i] = cardToSwap
        deck[swapIndex] = currentCard
      }

    return deck;
}

exports.shuffleCards = (deck: string[]) => shuffleCards(deck);
