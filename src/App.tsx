import Result from 'Components/Result';
import SearchBar from 'Components/SearchBar';
import { Joke } from 'Interfaces/JokeApiInterface';
import React, { useState } from 'react';
import './App.css';

function App() {
  const JOKE_API = 'https://api.chucknorris.io/jokes/random?category='

  const [loading, setLoading] = useState<boolean>(false)
  const [jokesResult, setJokesResult] = useState<string[]>([])
  
  const fetchJoke = (categ: string): Promise<Joke> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          fetch(`${JOKE_API}${categ}`)
          .then((result: Response) => {
            if (!result.ok) return reject('Error')
            if (result.status !== 200) return reject('Error')
            return resolve(result.json())
          })
        }, 2000
      )
    })
}

const getJoke = (categ: string): void => {
  setLoading(true)
  setJokesResult([])
  Promise.all(Array.from({ length: 5 }, () => fetchJoke(categ)
    .then((result:Joke) => {
      setJokesResult((prev: string[]) => (Array.from(new Set(prev).add(result.value))))
    })
    .catch((error: string) => {
      setJokesResult([])
      console.log(error)
    })
    .finally(() => {
      setLoading(false)
    })
  ))
}

  return (
    <div className="App">
      <h1>JOKE FINDER</h1>
      <SearchBar getJoke = {getJoke} />
      {
        loading ?
        <span className="loader"></span> :
        jokesResult.length > 0 && <Result data = {jokesResult} />
      }
    </div>
  );
}

export default App;
