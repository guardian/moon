import { cta, icon } from './style.css';

export default props => (
    <a href={props.href} style={cta}>
        {props.children}
        <props.icon style={icon} />
    </a>
);
