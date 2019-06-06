import excludeProperties from '../excludeProperties';

it('does not copy over the excluded properties', () => {
    const object = { foo: 'foo' };
    const exclude = 'foo';
    const result = excludeProperties([exclude], object);
    expect(result[exclude]).toBe(undefined);
})

it('does copy over all other properties', () => {
    const object = { foo: 'foo', bar: 'bar' };
    const exclude = 'foo';
    const result = excludeProperties([exclude], object);
    expect(result.bar).toBe(object.bar);
})