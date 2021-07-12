import React from 'react'
import './DateTime.scss'
import { generateTimes } from '../util'

const DateTime = () => (
  <section className='DateTime'>
    <aside className='label'>Time</aside>

    <div className='times' >
      {
        generateTimes().map(hour => {
          return (
            <div className='time' key={hour}>
              { hour }
            </div>
          )
        })
      }
    </div>
  </section>
)

export default DateTime
