export default function Input(props) {
    const { type, name, typeClassName, placeholder, value, onChange, minLength, maxLength } = props;

    return (
        <>
            <input
                value={value}
                type={type}
                name={name}
                className={`form__input ${typeClassName}`}
                placeholder={placeholder}
                onChange={onChange}
                minLength={minLength}
                maxLength={maxLength}
                required
            />
            <span className='form__error'></span>
        </>
    );
}