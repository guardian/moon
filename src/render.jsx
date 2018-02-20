import { server } from '@guardian/guui';

import head from 'components/head';
import Body from 'components/body';

// TODO: this should be managed by a route somehow
import Application from 'views/404';

// TODO: this should be passed from the Play application
import props from 'config/props.json';

const app = server();

export function render() {
    const body = app.renderToString(
        <Body {...props}>
            <Application {...props} />
        </Body>
    );
    const css = app.extractCriticalCss(body);

    return `
        <!DOCTYPE html>
        <html lang="en">
            ${head(props, css)}
            ${body}
        </html>
        `.trim();
}
