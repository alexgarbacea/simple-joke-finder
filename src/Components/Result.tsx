import { ResultProps } from 'Interfaces/PropsInterface'
import React from 'react'

const Result = ({data}: ResultProps) => {
  return (
    <section className='result-wrapper'>
        <h2>Here { data.length > 1 ? 'are' : 'is' } { data.length } unique joke{ data.length > 1 ? 's' : '' }</h2>
        {
            data.map((val: string, i: number) => {
                return(
                    <div key={val + i} className='result-single'>
                        {val}
                    </div>
                )
            })
        }
    </section>
  )
}

export default Result