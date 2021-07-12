import React from 'react'
import PropTypes from 'prop-types'
import { isLive } from '../util'
import './Program.scss'

const Program = ({ title, id, startDate, endDate, startTime, endTime, duration, currentDate }) => {
  let showIsLive = isLive({ currentDate, startDate, endDate }) ? 'live' : ''
  let showIsAd = title === 'Ad' ? 'ad' : ''

  return(
    <li
      className={`Program ${showIsLive} ${showIsAd}`}
      id={id}
      style={{width: `${400* duration/60*2}px`}}
      tabIndex='0'
    >
      <div className='header'>
        <div className='title'>{title}</div>
        <div className='liveTag'>{showIsLive}</div>
      </div>
      
      <div>{startTime} - {endTime}</div>
    </li>
  )
}

Program.propTypes = {
  title: PropTypes.string,
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  currentDate: PropTypes.instanceOf(Date),
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  duration: PropTypes.number,
  id: PropTypes.string,
}

export default Program

