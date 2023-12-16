import { Link } from "react-router-dom"

function Navigation(props) {
    return (
        <nav id="navigation">
            <span className="title">Fake Shopping</span>
            <span className="menu">
                <Link to='home'>Home</Link>
                <Link to='shop'>Shop</Link>
                <Link to='checkout'>Checkout ({props.count})</Link>
            </span>
        </nav>
    )
}

export default Navigation