import { useState } from 'react'
import "./State.css";

const COLORS = ["pink", "green", "blue", "yellow", "purple"];

function State() {
    const [backgroundColor, setBackgroundColor] = useState(COLORS[0]);
    const [count, setCount] = useState(0);

    const onButtonClick = (color) => () => {
        if (backgroundColor !== color)
            setCount(count + 1);
        setBackgroundColor(color);
    };

    return (
        <div
            className="State"
            style={{
                backgroundColor,
            }}
        >
            {COLORS.map((color) => (
                <button
                    type="button"
                    key={color}
                    onClick={onButtonClick(color)}
                    className={backgroundColor === color ? "selected" : ""}
                >
                    {color}
                </button>
            ))}

            <p style={{ backgroundColor: 'white' }}>
                Color changed {count} times            </p>
        </div>
    );
}

export default State;