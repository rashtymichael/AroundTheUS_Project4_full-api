import Popup from "./Popup";
import { useNavigate } from "react-router-dom";

export default function InfoTooltip(props) {
    const { isOpen, onClose, modalType, modalMessage, endPoint } = props;
    const navigate = useNavigate();

    const handleClose = () => {
        onClose();
        if (endPoint) {
            navigate(endPoint);
        }
    }

    return (
        <Popup isOpen={isOpen} onClose={handleClose}>
            <div className={`popup__feedback-image popup__feedback_type_${modalType}`} alt={modalType}></div>
            <h2 className='popup__feedback-text'>{modalMessage}</h2>
        </Popup>
    )
}