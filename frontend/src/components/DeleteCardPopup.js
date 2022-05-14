import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup(props) {
    const { onClose, onDeleteCard, card } = props;

    function handleSubmit(e) {
        e.preventDefault();

        onDeleteCard(card);
    }

    return (
        <PopupWithForm
            onClose={onClose}
            isOpen={!!card}
            name='card-delete'
            title='Are you sure?'
            submitBtn='Yes'
            onSubmit={handleSubmit}
        />
    );
}
