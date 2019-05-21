import App from "./App";
import Logo from './layout/Logo';
import renderTemplate from '@local/system/renderTemplate';

jest.mock('@local/system/renderTemplate');

describe('view', () => {
    it('passes a Logo to renderTemplate', () => {
        const app = new App();
        app.view();
        expect(renderTemplate).toHaveBeenCalledWith(expect.any(String), { logo: expect.any(Logo) });
        app.cleanup();
    })
})