function Card(props) {
    return (
        <div className="card">
            <img src={props.src} id={props.id} alt={props.id} onClick={props.clicked} />
        </div>
    )
}

export default Card