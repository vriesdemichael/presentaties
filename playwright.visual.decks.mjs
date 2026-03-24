export const decks = {
  'zeepkist-agentic-coding': {
    title: 'Agentic Coding - Deel 1',
    slides: [
      { no: 1, name: 'cover', readyText: 'Agentic coding' },
      { no: 2, name: 'agenda', readyText: 'Agenda (Deel 1)' },
    ],
  },
  'sprint-review-product-104-temporal': {
    title: 'Sprint Review - Product 104 Temporal',
    slides: [
      { no: 1, name: 'cover', readyText: 'Sprint review' },
      { no: 2, name: 'agenda', readyText: 'Agenda' },
    ],
  },
};

export function getDeckConfig(deckName) {
  const deck = decks[deckName];

  if (!deck) {
    throw new Error(`Unknown deck "${deckName}".`);
  }

  return deck;
}