function Header(props) {
    return (
        <div id="header">
            <h1>Memory Card Game</h1>
            <p className="score">
                <span>Score: </span>
                <span id="score-value">{props.scores.score}</span>
            </p>
            <p className="best-score">
                <span>Best Score: </span>
                <span id="best-score-value">{props.scores.bestScore}</span>
            </p>
        </div>
    )
}

export default Header