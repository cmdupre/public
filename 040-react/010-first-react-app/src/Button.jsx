function Button(props) {
    const buttonStyle = {
        color: props.color,
        fontSize: props.fontSize + 'px'
    };

    return (
        <button style={buttonStyle}>{props.text}</button>
    )
}

Button.defaultProps = {
    text: "Click Me!",
    color: "blue",
    fontSize: 12
};

export default Button