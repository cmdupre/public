import { useContext } from "react"
import { OutletContext } from "../src/App";

function Checkout() {
    const context = useContext(OutletContext);
    const items = context.items;

    const renderItems = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].qty < 1) continue;
        renderItems.push(<tr key={items[i].uid}><td>{items[i].title}</td><td>{items[i].qty}</td></tr>);
    }

    return (
        <div id="checkout">
            {renderItems.length < 1
                ? <span>Nothing to see here...</span>
                :
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderItems}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default Checkout