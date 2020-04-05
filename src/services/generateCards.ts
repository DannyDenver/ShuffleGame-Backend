import {cards} from '../gameConfig';

export function generateCards(): string[] {
    return cards;
}

exports.generateCards = () => generateCards();