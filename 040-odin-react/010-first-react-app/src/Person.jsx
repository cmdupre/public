import { useState } from 'react'

function Person() {
    const [person, setPerson] = useState({ firstName: 'John', lastName: 'Smith', age: 100 });

    const handleIncreaseAge = () => {
        setPerson({ ...person, age: person.age + 1 });
    };

    function updateFirstName(e) {
        setPerson({ ...person, firstName: e.target.value });
    }

    function updateLastName(e) {
        setPerson({ ...person, lastName: e.target.value });
    }

    return (
        <>
            <input type="text" placeholder='First Name...' onChange={updateFirstName} />
            <input type="text" placeholder='Last Name...' onChange={updateLastName} />
            <h1>{person.firstName} {person.lastName}</h1>
            <h2>{person.age}</h2>
            <button onClick={handleIncreaseAge}>Increase age</button>
        </>
    );
}

export default Person