import { Link } from 'react-router-dom';

export default function Footer(props) {
    return (
        <footer className={props.footerClassName}>
            <p style={{ margin: 0 }}>
                {props.footerTextContent}
                <Link to={props.navLinkPath} className={props.NavLinkClassName}>{props.NavLinkText}</Link>
                {props.footerTextContentEnd}
            </p>
        </footer>
    );
}
