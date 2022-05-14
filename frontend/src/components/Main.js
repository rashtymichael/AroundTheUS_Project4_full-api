import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Header from "./Header";
import Footer from "./Footer";

export default function Main(props) {

    const {
        onEditAvatarClick,
        onEditProfileClick,
        onAddPlaceClick,
        onCardClick,
        cards,
        onCardLike,
        onDeleteCardClick,
        userEmail,
    } = props;

    const currentUser = useContext(CurrentUserContext);

    function onSignOut() {
        localStorage.removeItem('token');
    }

    return (
        <>
            <Header navLinkPath={"/signin"} onClick={onSignOut} navLinkTitle={"Log Out"} loggedInEmail={userEmail} />
            <main className='content'>
                <section className='profile'>
                    <div style={{display: 'flex'}}>
                        <div className='profile__image-container'>
                            <img className='profile__image' id='image-profile' alt='profile avatar' src={currentUser.avatar} />
                            <div className='profile-image-overlay'>
                                <button onClick={onEditAvatarClick} className='profile__image-edit-button' type='button'
                                    aria-label='Edit profile info'></button>
                            </div>
                        </div>
                        <div className='profile__info'>
                            <div className='profile__info-top-row'>
                                <h1 className='profile__info-name'>{currentUser.name}</h1>
                                <button onClick={onEditProfileClick} className='profile__edit-button' type='button' aria-label='Edit profile info'></button>
                            </div>
                            <p className='profile__info-about'>{currentUser.about}</p>
                        </div>
                    </div>
                    <button onClick={onAddPlaceClick} className='profile__add-button' type='button' aria-label='Add card'></button>
                </section>
                <section className='cards'>
                    {cards.map(card => (
                        <Card 
                            card={card}
                            onCardClick={onCardClick}
                            onDeleteCardClick={onDeleteCardClick}
                            onCardLike={onCardLike}
                            key={card._id}
                        />
                    ))}
                </section>
            </main>
            <Footer
                footerClassName={'footer__copyrights'}
                footerTextContent={`© ${new Date().getFullYear()} Around The U.S.`}
                navLinkPath={''}
            />
        </>

    );
}