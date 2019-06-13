import { Component } from '@local/system';
import Configurator from "../Configurator";
import Monster from "../../Monster";


const monsterAttributes = {
    name: 'name',
    type: 'air',
    strength: 5,
    skinType: 'feathers',
    skinColor: 'blue',
    armType: 'wings',
    arms: 2,
    eyes: 2,
    legs: 2,
}

describe('isComplete', () => {
    it('returns [true] if everything is set', () => {
        const configurator = new Configurator();
        configurator.setState({ name: 'name' });
        expect(configurator.isComplete()).toBe(true);
        configurator.cleanup();
    })
    it('returns [false] if [name] is not set', () => {
        const configurator = new Configurator();
        configurator.setState({ name: '' });
        expect(configurator.isComplete()).toBe(false);
        configurator.cleanup();
    })
})

describe('setState', () => {
    it('calls the setState method on it\'s super', () => {
        const newState = { foo: 'foo', bar: 'bar' };
        const configurator = new Configurator();
        const spy = jest.spyOn(Component.prototype, 'setState');
        configurator.setState(newState);
        expect(spy).toHaveBeenCalledWith(newState);
        configurator.cleanup();
    })
    describe('when the [monster] state is updated', () => {
        it('copies the attributes from the monster into it\'s own state', () => {
            const configurator = new Configurator();
            const monster = new Monster(monsterAttributes);
            configurator.setState({ monster });
            expect(configurator.state).toMatchObject(monsterAttributes);
            monster.cleanup();
            configurator.cleanup();
        })
    })
    describe('when anything but the [monster] state is updated', () => {
        describe('when [isComplete] returns true', () => {
            describe('when there is no [monster] on state yet', () => {
                it('creates a monster with all of the attrubutes of the configurator', () => {
                    const configurator = new Configurator();
                    configurator.state.monster = null;
                    configurator.isComplete = jest.fn(() => true);
                    configurator.setState(monsterAttributes);
                    expect(configurator.state.monster.state).toEqual(monsterAttributes);
                    configurator.cleanup();
                })
            })
            describe('when there is already a [monster] on state', () => {
                it('sets the state of the monster with all of the attributes of the configurator', () => {
                    // Arrange
                    const configurator = new Configurator();
                    const monster = new Monster();
                    configurator.state.monster = monster;
                    configurator.isComplete = jest.fn(() => true);
        
                    // Act
                    configurator.setState(monsterAttributes);
        
                    // Assert
                    expect(monster.state).toEqual(monsterAttributes);
                    
                    // Cleanup
                    configurator.cleanup();
                    monster.cleanup();
                })
            })
        })
        describe('when [isComplete] returns false', () => {
            it('sets the [monster] property on state to null', () => {
                // Arrange
                const configurator = new Configurator();
                const monster = new Monster();
                configurator.state.monster = monster;
                configurator.isComplete = jest.fn(() => false);
    
                // Act
                configurator.setState(monsterAttributes);
    
                // Assert
                expect(configurator.state.monster).toBe(null);
                
                // Cleanup
                configurator.cleanup();
                monster.cleanup();
            })
        })
    })
})