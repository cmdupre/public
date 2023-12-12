import { useState } from 'react'

function Experience() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [submitted, setSubmitted] = useState(false);

    function onChangeName(e) {
        setName(e.target.value);
    }

    function onChangeTitle(e) {
        setTitle(e.target.value);
    }

    function onChangeResponsibilities(e) {
        setResponsibilities(e.target.value);
    }

    function onChangeDateFrom(e) {
        setDateFrom(e.target.value);
    }

    function onChangeDateTo(e) {
        setDateTo(e.target.value);
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
            <form id="experience">
                <label htmlFor="name">Company Name:</label>
                <input type="text" id="name" value={name} onChange={onChangeName} autoComplete='off' autoFocus />
                <label htmlFor="title">Title of Position:</label>
                <input type="text" id="title" value={title} onChange={onChangeTitle} autoComplete='off' />
                <label htmlFor="resp">Responsibilities:</label>
                <textarea cols={30} rows={10} id="resp" value={responsibilities} onChange={onChangeResponsibilities} />
                <label htmlFor="dateFrom">Date From:</label>
                <input type="date" id="dateFrom" value={dateFrom} onChange={onChangeDateFrom} autoComplete='off' />
                <label htmlFor="dateTo">Date To:</label>
                <input type="date" id="dateTo" value={dateTo} onChange={onChangeDateTo} autoComplete='off' />
                <button type="submit" onClick={onSubmit}>Submit</button>
            </form>
        )
    }

    return (
        <div>
            <p>{name}</p>
            <p>{title}</p>
            <p>{responsibilities}</p>
            <p>{dateFrom} - {dateTo}</p>
            <button type="button" onClick={onEdit}>Edit</button>
        </div>
    )
}

export default Experience