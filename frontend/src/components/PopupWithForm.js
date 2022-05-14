import Popup from "./Popup";
import Form from "./Form";

export default function PopupWithForm(props) {
    const { isOpen, onClose, children, name, title, submitBtn, onSubmit } = props;

    return (
        <Popup onClose={onClose} isOpen={isOpen}>
            <Form name={name} title={title} submitBtn={submitBtn} onSubmit={onSubmit}>
                {children}
            </Form>
        </Popup >
    );
}