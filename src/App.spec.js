import App from "./App";
import Logo from './layout/Logo';
import Configurator from './configurator/Configurator';
import renderTemplate from '@local/system/renderTemplate';

jest.mock('@local/system/renderTemplate');

describe('view', () => {
    it('passes a Logo to renderTemplate', () => {
        const app = new App();
        app.view();
        expect(renderTemplate).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({ logo: expect.any(Logo) })
        );
        app.cleanup();
    })
    it('passes a Configurator to renderTemplate', () => {
        const app = new App();
        app.view();
        expect(renderTemplate).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({ configurator: expect.any(Configurator) })
        );
        app.cleanup();
    })
})