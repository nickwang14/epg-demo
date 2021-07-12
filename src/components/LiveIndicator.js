import React from 'react'
import PropTypes from 'prop-types'
import './LiveIndicator.scss'

const LiveIndicator = React.forwardRef(({ position }, ref ) => {
  return( <div className='LiveIndicator' style={{marginLeft: `${position}px`}} ref={ref}>
    <header/>
  </div>)
})

LiveIndicator.displayName = 'LiveIndicator'

LiveIndicator.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  position: PropTypes.number,
}

export default LiveIndicator
