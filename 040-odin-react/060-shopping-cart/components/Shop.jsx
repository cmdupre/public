import { useContext } from 'react'
import { OutletContext } from '../src/App.jsx';
import Item from './Item.jsx'

function Shop() {
    const context = useContext(OutletContext);
    const items = context.items;
    const setItems = context.setItems;

    function updateQty(uid, qty) {
        const newItems = [];
        for (let item of items) {
            if (item.uid === uid)
                item.qty = qty;
            newItems.push(item);
        }
        setItems(newItems);
    }

    return (
        <div id="shop">
            <div className="items">
                {items.length < 1
                    ? <span>Nothing to see here...</span>
                    : items.map((item) => <Item key={item.uid} item={item} updateQty={updateQty} />)
                }
            </div>
        </div>
    )
}

export default Shop