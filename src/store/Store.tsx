export let recipesStore: any[] = [
    {
        id: 0,
        name: 'Son Go Ku',
        imageUrl: 'data:image/jpeg;base64,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',
        description: 'Son Go Ku - Dragon Ball',
        ingredients: [{name: 'Book', amount: 1}, {name: 'Movie', amount: 378}]
    }
];

export const ingredients: any[] = []