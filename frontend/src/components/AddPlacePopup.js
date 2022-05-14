import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

export default function AddPlacePopup(props) {
    const { isOpen, onClose, onAddPlaceSubmit } = props;

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen])

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlaceSubmit({
            name,
            link
        });
    }


    return (
        <PopupWithForm
            onClose={onClose}
            isOpen={isOpen}
            name='add-card'
            title='New place'
            submitBtn='Create'
            onSubmit={handleSubmit}
        >
            <Input
                value={name}
                onChange={handleNameChange}
                type='text'
                placeholder='Title'
                name='title'
                minLength='1'
                maxLength='30'
            />
            <Input
                value={link}
                onChange={handleLinkChange}
                type='url'
                placeholder='Image link'
                name='link'
            />
        </PopupWithForm>
    );
}
