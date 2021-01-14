const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../lib/zookeepers.js');
const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: 'Josh', id: '19'},
        zookeepers
    );

    expect(zookeeper.name).toBe('Josh');
    expect(zookeeper.id).toBe('19');
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: '19',
            name: 'Josh',
            age: 27,
            favoriteAnimal: 'monkey',
        },
        {
            id: "20",
            name: "Jane",
            age: 45,
            favoriteAnimal: "dolphin",
        },
    ];
    
    const updatedZookeepers = filterByQuery({ favoriteAnimal: 'monkey' }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: '19',
            name: 'Josh',
            age: 27,
            favoriteAnimal: 'monkey',
        },
        {
            id: "20",
            name: "Jane",
            age: 45,
            favoriteAnimal: "dolphin",
        },
    ];

    const result = findById('19', startingZookeepers);

    expect(result.name).toBe('Josh');
});

test('validates favorite animal', () => {
    const zookeeper = {
        id: '19',
        name: 'Josh',
        age: 27,
        favoriteAnimal: 'monkey',
    };

    const invalidZookeeper = {
        id: '19',
        name: 'Josh',
        age: 27,
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});