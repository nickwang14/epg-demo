import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { createEmptyProgram, MIDNIGHT, BEFORE_MIDNIGHT, AFTER_MIDNIGHT, LATER_MIDNIGHT, getDuration, getTime } from '../util'
import Program from './Program'
import './Channel.scss'

const Channel = ({id, schedules, title, currentDate }) => {
  const maxIndex = schedules.length

  return (
    <section className='Channel' key={id}>
      <aside className='label' >
        <p className='title'>{title}</p>
      </aside>
        
      <ul className='Programs'>
        {
          schedules.map((program, index, programsArray) => {
            let { startDate, endDate, startTime, endTime } = program
            let start = new Date(startDate)
            let end = new Date(endDate)

            let filler
            let fillAfter

            switch(index) {
            case 0:
              if(startTime === AFTER_MIDNIGHT || startTime === LATER_MIDNIGHT) filler = (
                <Program 
                  currentDate={currentDate}
                  {...createEmptyProgram({
                    startDate: Date.parse(new Date(
                      start.getUTCFullYear(), 
                      start.getUTCMonth(), 
                      start.getUTCDate(), 
                      start.getUTCHours(),
                      0
                    )),
                    endDate: Date.parse(new Date(
                      start.getUTCFullYear(), 
                      start.getUTCMonth(), 
                      start.getUTCDate(), 
                      start.getUTCHours(),
                      start.getUTCMinutes(),
                    )),
                    duration: getDuration({
                      startDate: Date.parse(new Date(
                        start.getUTCFullYear(), 
                        start.getUTCMonth(), 
                        start.getUTCDate(), 
                        start.getUTCHours(),
                        0
                      )),
                      endDate: Date.parse(new Date(
                        start.getUTCFullYear(), 
                        start.getUTCMonth(), 
                        start.getUTCDate(), 
                        start.getUTCHours(),
                        start.getUTCMinutes(),
                      )),
                    }),
                    startTime: MIDNIGHT,
                    endTime: startTime,
                  })}
                />
              )

              break;
            case maxIndex-1:
              if(endTime === BEFORE_MIDNIGHT) fillAfter = (
                <Program 
                  currentDate={currentDate}
                  {...createEmptyProgram({
                    startDate: Date.parse(new Date(
                      end.getUTCFullYear(), 
                      end.getUTCMonth(), 
                      end.getUTCDate(), 
                      end.getUTCHours(),
                      0
                    )),
                    endDate: Date.parse(new Date(
                      end.getUTCFullYear(), 
                      end.getUTCMonth(), 
                      end.getUTCDate()+1, 
                      0,
                      0,
                    )),
                    duration: 10,
                    startTime: endTime,
                    endTime: MIDNIGHT,
                  })}
                />
              )

              break;
            default:
              if (program.startTime !== programsArray[index-1].endTime) {
                let prevEnd = new Date(programsArray[index-1].endDate)
          
                let startDate = new Date(
                  prevEnd.getUTCFullYear(),
                  prevEnd.getUTCMonth(),
                  prevEnd.getUTCDate(),
                  prevEnd.getUTCHours(),
                  prevEnd.getUTCMinutes(),
                )
                
                let endDate = new Date(
                  start.getUTCFullYear(),
                  start.getUTCMonth(),
                  start.getUTCDate(),
                  start.getUTCHours(),
                  start.getUTCMinutes(),
                )

                filler =  (
                  <Program 
                    currentDate={currentDate}
                    {...createEmptyProgram({
                      startDate: Date.parse(startDate),
                      endDate: Date.parse(endDate),
                      duration: getDuration({startDate, endDate}),
                      startTime: getTime({date: startDate }),
                      endTime: getTime({date: endDate }),
                    })}
                  />
                )}
            }

            return(
              <Fragment key={index}>
                {
                  filler && filler
                }

                <Program {...program} currentDate={currentDate}/>

                {
                  fillAfter && fillAfter
                }
              </Fragment>
            )
          })
        }
      </ul>
    </section>
  )
}

Channel.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  schedules: PropTypes.array,
  images: PropTypes.object,
  currentDate: PropTypes.instanceOf(Date),
}

export default Channel

