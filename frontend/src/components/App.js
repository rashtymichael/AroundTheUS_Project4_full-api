import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import api from "../utils/api";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardForDelete, setCardForDelete] = useState(null);

    const [currentUser, setCurrentUser] = useState({});

    const [cards, setCards] = useState([]);

    const [userEmail, setUserEmail] = useState('');

    const [token, setToken] = useState(localStorage.getItem('token'));

    const navigate = useNavigate();

    useEffect(() => {
        checkTokenValidity();
    }, [])

    useEffect(() => {
        async function getUserInfo() {
            try {
                const userInfo = await api.getUserInfo();

                setCurrentUser(userInfo);
            } catch (error) {
                console.log(error);
            }
        }

        getUserInfo();
    }, []);

    useEffect(() => {
        async function getInitialCards() {
            try {
                const items = await api.getInitialCards();
                setCards(items);
            } catch (error) {
                console.log(error);
            }
        }

        getInitialCards();
    }, []);

    useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', closeByEscape)

        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])

    function checkTokenValidity() {
        auth.checkToken(token)
            .then((res) => {
                if (res) {
                    setUserEmail(res.data.email);
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleRegisterFormSubmit(values) {
        auth
            .register(values)
            .then(() => {
                setIsRegistrationSuccess(true);
            })
            .catch((err) => {
                setIsFail(true);
                console.log(err);
            })
    }

    function handleLogInSubmit(values) {
        auth
            .authorize(values)
            .then((data) => {
                if (data.token) {
                    setToken(data.token);
                    api.updateAuthorization(data.token);
                    setUserEmail(values.email);
                    navigate('/');
                }
            })
            .catch((err) => {
                setIsFail(true);
                console.log(err);
            })
    }


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map(
                    (c) => c._id === card._id ? newCard : c)
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleCardDeleteSubmit(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter(
                    (c) => c._id !== card._id)
                );
                closeAllPopups();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleCardDeleteClick = (card) => {
        setCardForDelete(card);
    }


    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }


    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser({ name, about }) {
        api.editUserInfo(name, about)
            .then((updatedUser) => {
                setCurrentUser(updatedUser);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleUpdateAvatar({ avatar }) {
        api.editProfileImage(avatar)
            .then((updateAvatar) => {
                setCurrentUser(updateAvatar);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleAddPlaceSubmit({ name, link }) {
        api.addCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsRegistrationSuccess(false);
        setIsFail(false);
        setSelectedCard(null);
        setCardForDelete(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='root__page-container'>
                <Routes>
                    <Route path="signin" element={<Login onSubmit={handleLogInSubmit} />} />
                    <Route path="signup" element={<Register onSubmit={handleRegisterFormSubmit} />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute isLoggedIn={token}>
                                <Main
                                    onEditProfileClick={handleEditProfileClick}
                                    onAddPlaceClick={handleAddPlaceClick}
                                    onEditAvatarClick={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onDeleteCardClick={handleCardDeleteClick}
                                    userEmail={userEmail}
                                />
                            </ProtectedRoute>
                        }
                    />
                </Routes>

                <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} onAddPlaceSubmit={handleAddPlaceSubmit} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <DeleteCardPopup card={cardForDelete} onClose={closeAllPopups} onDeleteCard={handleCardDeleteSubmit} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <InfoTooltip
                    isOpen={isRegistrationSuccess}
                    onClose={closeAllPopups}
                    endPoint='/signin'
                    modalType='success'
                    modalMessage='Success! You Have now been registered.'
                />
                <InfoTooltip
                    isOpen={isFail}
                    onClose={closeAllPopups}
                    modalType='fail'
                    modalMessage='Oops, something went wrong! Please try again.'
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
