import App from "./App";
import Logo from './layout/Logo';
import Sidebar from './layout/Sidebar';
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
            expect.objectContaining({ sidebar: expect.any(Sidebar) })
        );
        app.cleanup();
    })
})