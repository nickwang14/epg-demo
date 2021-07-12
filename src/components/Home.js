import React, { useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import Loader from './Loader'
import DateTime from './DateTime'
import Channel from './Channel'
import Now from './Now'
import { connect } from 'react-redux'
import { fetchPrograms } from '../store/programSlice'
import { isObjectEmpty } from '../util'
import LiveIndicator from './LiveIndicator'
import './Home.scss'

const mapStateToProps = (state) => {
  const channelData = state.programs
  const areChannelsPopulated = isObjectEmpty(channelData.entities)

  return { 
    channels: channelData.entities,
    isLoading: channelData.loading && areChannelsPopulated }
}

const Home = ({ dispatch, channels, isLoading }) => {
  const positionRef = useRef()
  const [shouldRender, setShouldRender] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date(Date.now()))

  const calcMargin = ({hours, minutes}) => hours * 800 + minutes * 400 /30 + 200

  useEffect(() => {
    dispatch(fetchPrograms())
  }, [])

  useEffect(() => {
    let timerID = setInterval( () => setCurrentDate(new Date(Date.now())), 60000 )

    return function cleanup() {
      clearInterval(timerID)
    }
  })

  useEffect(() => {
    setShouldRender(!isLoading)
  })

  return (
    <div className='Home'>
      <LiveIndicator
        currentDate={currentDate} 
        position={calcMargin({
          hours: currentDate.getUTCHours(),
          minutes: currentDate.getMinutes()})}
        ref={positionRef}/>
      <DateTime/>
    
      {
        shouldRender ? Object.keys(channels).map((channel, index) => <Channel key={index} {...channels[channel]} currentDate={currentDate} /> ): <Loader/>
      }

      <Now ref={positionRef} title='now'/>
    </div>
  )}

Home.propTypes = {
  dispatch: PropTypes.func,
  channels: PropTypes.object,
  isLoading: PropTypes.bool,
}

export default connect(mapStateToProps)(Home)
