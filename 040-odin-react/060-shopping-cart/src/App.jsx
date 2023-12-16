import './App.css'
import Navigation from '../components/Navigation'
import { Outlet } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react';

const OutletContext = createContext(null);

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let ignore = false;

    if (ignore)
      return;

    const newItems = [];

    fetch('https://fakestoreapi.com/products?limit=10')
      .then(res => res.json())
      .then(json => {
        for (let j of json) {
          newItems.push({
            uid: crypto.randomUUID(),
            title: j.title,
            src: j.image,
            alt: j.description,
            qty: 0,
          });
        }
      })

    setItems(newItems);

    return () => ignore = true;
  }, [])

  return (
    <>
      <Navigation count={items.map(a => a.qty).reduce((a, b) => { return a + b }, 0)} />
      <OutletContext.Provider value={{ items, setItems }}>
        <Outlet />
      </OutletContext.Provider>
    </>
  )
}

export { OutletContext }
export default App