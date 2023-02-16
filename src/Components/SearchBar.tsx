import { SearchBarProps } from 'Interfaces/PropsInterface'
import React, { useState, useEffect } from 'react'

const SearchBar = ({ getJoke }: SearchBarProps) => {
    const CATEG_API = 'https://api.chucknorris.io/jokes/categories'

    const [searchInput, setSearchInput] = useState<string>('')
    const [focusedInput, setFocusedInput] = useState<boolean>(false)
    const [jokeList, setJokeList] = useState<string[]>([])

    const setCategoriesState = async(): Promise<void> => {
        try {
            await fetch(`${CATEG_API}`)
            .then((res: Response) => res.json())
            .then((data: string[]) => setJokeList(data.filter((val: string) => val !== 'explicit')))
            return
        }
        catch(e: any) {
            setJokeList([])
            console.log(e.message)
            return
        }
    }

    useEffect(() => {
        setCategoriesState()
    }, [])

    const startSearch = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        if (new Set(jokeList).has(searchInput.toLowerCase())) {
            getJoke(searchInput.toLowerCase())
            setSearchInput('')
        }
    }

    return (
        <>
            <form onSubmit={startSearch}>
                <input value={searchInput} onChange = {(e) => setSearchInput(e.target.value)}
                onFocus = {() => setFocusedInput(true)}
                onBlur = {() => setFocusedInput(false)}
                id='search' type='text' placeholder='Category..' />
            </form>
            <section className={`dropdown-list${focusedInput ? ' open' : ''}`}>
                {
                    jokeList.filter((val: string) => val.includes(searchInput))
                    .map((joke: string, i: number) => {
                        return (
                            <div onClick={() => getJoke(joke)} key={`${joke}-${i}`}>{joke}</div>
                        )
                    })
                }
            </section>
        </>
    )
}

export default SearchBar