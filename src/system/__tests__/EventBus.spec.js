import EventBus from '../EventBus';

describe('constructor', () => {
    it('sets up an [events] object', () => {
        const eventBus = new EventBus();
        expect(eventBus).toHaveProperty('events');
    })
});

it('runs all listeners when an event is emitted', () => {
    // Arrange
    const event = 'some-event';
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    const eventBus = new EventBus();

    // Act
    eventBus.on(event, listener1);
    eventBus.on(event, listener2);
    eventBus.emit(event);

    // Assert
    expect(listener1).toHaveBeenCalled();
    expect(listener2).toHaveBeenCalled();
})

describe('emit', () => {
    it('passes any arguments to the listeners', () => {
        const event = 'some-event';
        const args = ['foo', 2, { foo: 'bar'}, ['foo', 'bar'], false];
        const eventBus = new EventBus();
        const listener = jest.fn();
        eventBus.on(event, listener);
        eventBus.emit(event, ...args);
        expect(listener).toHaveBeenCalledWith(...args);
    });
});

describe('remove', () => {
    it('stops the registered listener from being called when the event is emitted', () => {
        const event = 'some-event';
        const eventBus = new EventBus();
        const listener = jest.fn();
        eventBus.on(event, listener);
        eventBus.remove(event, listener);
        eventBus.emit(event);
        expect(listener).not.toHaveBeenCalled();
    });
    it('still allows other listeners to be called', () => {
        // Arrange
        const event = 'some-event';
        const listener1 = jest.fn();
        const listener2 = jest.fn();
        const eventBus = new EventBus();

        // Act
        eventBus.on(event, listener1);
        eventBus.remove(event, listener1);
        eventBus.on(event, listener2);
        eventBus.emit(event);

        // Assert
        expect(listener1).not.toHaveBeenCalled();
        expect(listener2).toHaveBeenCalled();
    })
});