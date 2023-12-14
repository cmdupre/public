import { useState, useEffect } from "react"
import Card from "./Card"

function Cards(props) {
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState({ inventory: [], visible: [] });
    const [cardsClicked, setCardsClicked] = useState([]);

    useEffect(() => {
        let ignore = false;

        if (!ignore) {
            fetch("https://www.deckofcardsapi.com/api/deck/new/draw/?count=52")
                .then((response) => response.json())
                .then((data) => {
                    const initCards = { inventory: [], visible: [] };
                    for (let c of data.cards)
                        initCards.inventory.push({ key: c.code, src: c.image });
                    for (let i = 0; i < 8; i++)
                        initCards.visible.push(initCards.inventory[getRandIndexNotVisible(initCards)]);
                    setCards(initCards);
                    setLoading(false);
                });
        }

        return () => ignore = true;
    }, [])

    function getRandIndexNotVisible(_cards) {
        while (true) {
            const randomIndex = Math.floor(Math.random() * _cards.inventory.length)
            if (_cards.visible.indexOf(_cards.inventory[randomIndex]) === -1)
                return randomIndex;
        }
    }

    function cardClicked(key) {
        if (cardsClicked.indexOf(key) === -1) {
            props.scores.setScore(props.scores.score + 1);
            setCardsClicked([...cardsClicked, key]);
        }
        else {
            if (props.scores.bestScore < props.scores.score)
                props.scores.setBestScore(props.scores.score);
            props.scores.setScore(0);
            setCardsClicked([]);
        }

        const newVisible = cards.visible.filter(c => c.key !== key);
        const randomIndex = getRandIndexNotVisible(cards);
        newVisible.push(cards.inventory[randomIndex]);
        setCards({ inventory: cards.inventory, visible: newVisible });
    }

    return (
        <div id="cards">
            {loading
                ? "Loading..."
                : cards.visible.map(c => <Card key={c.key} id={c.key} src={c.src} clicked={() => cardClicked(c.key)} />)}
        </div>
    )
}

export default Cards