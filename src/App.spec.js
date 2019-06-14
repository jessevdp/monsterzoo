import App from "./App";
import Logo from './common/Logo';
import Sidebar from './sidebar/Sidebar';
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
    it('passes a Sidebar to renderTemplate', () => {
        const app = new App();
        app.view();
        expect(renderTemplate).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({ sidebar: expect.any(Sidebar) })
        );
        app.cleanup();
    })
})