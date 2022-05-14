import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
    const { isOpen, onClose, onUpdateUser } = props;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            onClose={onClose}
            isOpen={isOpen}
            name='edit-profile'
            title='Edit Profile'
            submitBtn='Save'
            onSubmit={handleSubmit}
        >
            <Input
                value={name || ''}
                onChange={handleNameChange}
                type='text'
                placeholder='Name'
                name='name'
                minLength='2'
                maxLength='40'
            />
            <Input
                value={description || ''}
                onChange={handleDescriptionChange}
                type='text'
                placeholder='About me'
                name='about'
                minLength='2'
                maxLength='200'
            />
        </PopupWithForm>
    );
}
