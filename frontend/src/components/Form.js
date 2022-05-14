export default function Form(props) {

    const { name, onSubmit, authTitleClassName, title, children, authSubmitBtnClassName, submitBtn } = props;

    return (
        <form action='#' className='form' name={name} onSubmit={onSubmit}>
            <h2 className={`form__title ${authTitleClassName}`}>{title}</h2>
            {children}
            <button type='submit' className={`form__button ${authSubmitBtnClassName}`}>{submitBtn}</button>
        </form>
    );
}