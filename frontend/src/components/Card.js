import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
    const { card, onCardClick, onCardLike, onDeleteCardClick } = props;

    const currentUser = useContext(CurrentUserContext);

    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteCardClick() {
        onDeleteCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button' : 'card__delete-button_visibility'}`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `card__like-button ${isLiked ? 'card__like-button-full' : 'like-button'}`
    );

    return (
        <div className="card">
            <img onClick={handleClick} className="card__image" src={card.link} alt={card.name} />
            <button onClick={handleDeleteCardClick} className={cardDeleteButtonClassName}></button>
            <div className="card__description">
                <p className="card__text">{card.name}</p>
                <div className="card__likes-container">
                    <button onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
                    <span className="card__likes-num">{card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}