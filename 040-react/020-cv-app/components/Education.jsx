import { useState } from 'react'

function Education() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [submitted, setSubmitted] = useState(false);

    function onChangeName(e) {
        setName(e.target.value);
    }

    function onChangeTitle(e) {
        setTitle(e.target.value);
    }

    function onChangeDate(e) {
        setDate(e.target.value);
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
            <form id="education">
                <label htmlFor="name">School Name:</label>
                <input type="text" id="name" value={name} onChange={onChangeName} autoComplete='off' autoFocus />
                <label htmlFor="title">Title of Study:</label>
                <input type="text" id="title" value={title} onChange={onChangeTitle} autoComplete='off' />
                <label htmlFor="date">Date of Study:</label>
                <input type="date" id="date" value={date} onChange={onChangeDate} autoComplete='off' />
                <button type="submit" onClick={onSubmit}>Submit</button>
            </form>
        )
    }

    return (
        <div>
            <p>{name}</p>
            <p>{title}</p>
            <p>{date}</p>
            <button type="button" onClick={onEdit}>Edit</button>
        </div>
    )
}

export default Education