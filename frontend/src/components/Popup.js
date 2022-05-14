export default function Popup(props) {
    const { isOpen, onClose, children, typeClassName } = props;
    return (
        <section className={`popup ${isOpen ? 'popup_open' : ''}`}>
            <div className={`popup__container ${typeClassName}`}>
                <button onClick={onClose} className='popup__close-button' type='button'></button>
                {children}
            </div>
        </section>
    );
}
