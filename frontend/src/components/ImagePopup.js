import Popup from "./Popup";

export default function ImagePopup(props) {
    const { card, onClose } = props;
    const { name, link } = card || {};

    return (
        <Popup isOpen={!!card} onClose={onClose} typeClassName='popup__container_type_picture'>
            <img className='popup__card-image' src={link} alt='Popup Card' />
            <p className='popup__card-text'>{name}</p>
        </Popup>
    );
}