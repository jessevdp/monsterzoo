import App from "./App";

it('renders correctly', () => {
    const app = new App();
    const result = app.view();
    expect(result).toMatchSnapshot();
    app.cleanup();
});