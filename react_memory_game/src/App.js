import { useState, useEffect } from 'react'
import SingleCard from './components/SingleCard';
import './App.css'



function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled,setDisabled]=useState(false);



  const cardImages = [

    { "src": "/img/helmet-1.png", matched: false },
    { "src": "/img/potion-1.png", matched: false },
    { "src": "/img/ring-1.png", matched: false },
    { "src": "/img/scroll-1.png", matched: false },
    { "src": "/img/shield-1.png", matched: false },
    { "src": "/img/sword-1.png", matched: false }

  ]


  const handleChoice = (card) => {

    firstChoice ? setSecondChoice(card) : setFirstChoice(card);


  }


  useEffect(() => {

   

    if (firstChoice && secondChoice) {

      setDisabled(true);

      if (firstChoice.src === secondChoice.src) {

        setCards(prevCards => {

          return prevCards.map(card => {

            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            }

            else {

              return card;

            }

          })



        })


        resetTurns();

      }


      else {


        setTimeout(()=>{
          resetTurns();
        },1000);
       


      }

    }





  }, [firstChoice, secondChoice])


  useEffect(()=>{
    shuffleCards();
  },[]);



  const resetTurns = () => {


    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(prevTurns => prevTurns + 1);
     setDisabled(false);



  }



  const shuffleCards = () => {


    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setFirstChoice(null);
    setSecondChoice(null);
    setCards(shuffledCards);
    setTurns(0);

  }

  console.log(cards, turns);

  return (
    <div className="App">

      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (


          <SingleCard

            key={card.id}

            card={card}

            handleChoice={handleChoice}

            disabled={disabled}

            flipped={card===firstChoice || card===secondChoice || card.matched}





          />



        ))}
      </div>

 
       <p>Turns-{turns}</p>

    </div>

  );

}



export default App



