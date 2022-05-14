import { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

export default function EditAvatarPopup(props) {
    const { isOpen, onClose, onUpdateAvatar } = props;
    const [avatar, setAvatar] = useState('');

    function handleAvatarChange(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({ avatar });
    }

    return (
        <PopupWithForm
            onClose={onClose}
            isOpen={isOpen}
            name='profile-image'
            title='Change profile picture'
            submitBtn='Save'
            onSubmit={handleSubmit}
        >
            <Input value={avatar || ''}
                onChange={handleAvatarChange}
                type='text'
                placeholder='Title'
                name='title'
            />
        </PopupWithForm>
    );
}
