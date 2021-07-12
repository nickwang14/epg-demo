import React from 'react'
import PropTypes from 'prop-types'
import './Now.scss'

const Now = React.forwardRef(( props, ref ) => {
  const { title } = props

  const handleOnClick = (ref) => ref.current.scrollIntoView({behavior: 'smooth', inline: 'center'})

  return (
    <button className='Now title'
      onClick={() => handleOnClick(ref)}
    >
      {title}
    </button>
  )
})

Now.displayName = 'Channel'

Now.propTypes = {
  title: PropTypes.string,
}

export default Now
