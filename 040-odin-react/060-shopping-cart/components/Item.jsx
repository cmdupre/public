import { useState } from "react";

function Item(props) {
    const [count, setCount] = useState(props.item.qty);

    function updateCount(e) {
        switch (e.target.className) {
            case "minus":
                if (count > 0)
                    setCount(count - 1);
                return;
            case "plus":
                setCount(count + 1);
                return;
            default:
                const qty = parseInt(e.target.value);
                if (isNaN(qty))
                    setCount(0);
                else
                    setCount(qty);
                return;
        }
    }

    function updateQty() {
        props.updateQty(props.item.uid, count);
    }

    return (
        <div className="item">
            <div className="title">{props.item.title}</div>
            <img src={props.item.src} alt={props.item.alt} />
            <span className="quantity">
                <button className="minus" onClick={updateCount}>-</button>
                <input type="text" className="qty" autoComplete="off" value={count} onChange={updateCount} />
                <button className="plus" onClick={updateCount}>+</button>
                <button className="cart" onClick={updateQty}>Update Cart</button>
            </span>
        </div>
    )
}

export default Item