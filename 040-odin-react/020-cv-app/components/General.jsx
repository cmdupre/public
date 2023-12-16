import { useState } from 'react'

function General() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [submitted, setSubmitted] = useState(false);

    function onChangeName(e) {
        setName(e.target.value);
    }

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    function onChangePhone(e) {
        setPhone(e.target.value);
    }

    function onSubmit(e) {
        setSubmitted(true);
        e.preventDefault();
    }

    function onEdit() {
        setSubmitted(false);
    }

    if (!submitted) {
        return (
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={onChangeName} autoComplete='off' autoFocus />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={onChangeEmail} autoComplete='off' />
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" value={phone} onChange={onChangePhone} autoComplete='off' />
                <button type="submit" onClick={onSubmit}>Submit</button>
            </form>
        )
    }

    return (
        <div id="general">
            <p>{name}</p>
            <p>{email}</p>
            <p>{phone}</p>
            <button type="button" onClick={onEdit}>Edit</button>
        </div>
    )
}

export default General