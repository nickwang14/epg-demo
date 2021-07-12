export const isObjectEmpty = (o) => Object.keys(o).length !== 0
export const isArrayEmpty = (a) => a.length ===  0

export const getCurrentDateTime = () => (
  new Date().toLocaleDateString(
    'en-us',
    {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }
  )
)

export const isLive = ({ currentDate, startDate, endDate }) => {
  let start = new Date(startDate)
  let end = new Date(endDate)

  let startTest = currentDate.getTime() >= start.getTime()
  let endTest = currentDate.getTime() <= end.getTime()

  return startTest && endTest
}

export const generateTimes = () => {
  let items = []
  for (let hour = 0 ; hour < 24; hour++) {
    items.push([hour, 0])
    items.push([hour, 30])
  }

  const date = new Date()
  const formatter = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  })

  const range = items.map(time => {
    const [hour, minute] = time
    date.setHours(hour)
    date.setMinutes(minute)

    return formatter.format(date)
  })

  return range
}

export const MIDNIGHT ='0:00'
export const BEFORE_MIDNIGHT = '23:50'
export const AFTER_MIDNIGHT = '0:10'
export const LATER_MIDNIGHT = '0:20'

export const getDuration = ({ startDate, endDate }) => {
  let start = new Date(startDate)
  let end = new Date(endDate)

  // console.warn(start)
  // console.warn(end)
  // console.warn((end.getTime() - start.getTime())  / 1000 / 60)

  return (end.getTime() - start.getTime()) / 1000 / 60
}

export const getUTCTime = ({ date }) => `${date.getUTCHours()}:${date.getUTCMinutes() === 0 ? '00' : date.getUTCMinutes()}`
export const getTime = ({ date }) => `${date.getHours()}:${date.getMinutes() === 0 ? '00' : date.getMinutes()}`

const fixStartBeforeMidNightDuration = ({startDate, endDate}) => (getDuration({startDate, endDate}) - (60 - startDate.getUTCMinutes()))
const fixFinishAfterMidNightDuration = ({startDate}) => ((60 - startDate.getUTCMinutes()))


export const createEmptyProgram = ({ 
  startDate,
  endDate, 
  duration, 
  startTime,
  endTime, 
}) => {
  return {
    title: 'Ad',
    id:'filler-show-id', 
    startDate,
    endDate,
    duration,
    startTime,
    endTime,
  }
}

const sortSchedule = ({ schedule }) => {
  let startProgram = schedule.findIndex(program => (
    getUTCTime({date: new Date(program.start)}) === MIDNIGHT ||
    getUTCTime({date: new Date(program.start)}) === AFTER_MIDNIGHT  ||
    getUTCTime({date: new Date(program.start)}) === BEFORE_MIDNIGHT ||
    getUTCTime({date: new Date(program.start)}) === LATER_MIDNIGHT)
  )
  
  let laterHalf = schedule.slice(0, startProgram)
  let firstHalf = schedule.slice(startProgram)
  
  return firstHalf.concat(laterHalf)
}

const cleanDateTime = ({ program, currentDayOfMonth, currentYear, currentMonth, index, maxIndex }) => {
  const[
    startDate,
    endDate,
  ] = [
    new Date(program.start),
    new Date(program.end),
  ]

  program.startTime = getUTCTime({date: startDate})
  program.endTime = getUTCTime({date: endDate})

  startDate.setUTCDate(currentDayOfMonth)
  startDate.setUTCFullYear(currentYear)
  startDate.setUTCMonth(currentMonth)
  index === maxIndex-1 && endDate.getUTCHours() === 0 ?  endDate.setUTCDate(currentDayOfMonth+1) : endDate.setUTCDate(currentDayOfMonth)
  endDate.setUTCFullYear(currentYear)
  endDate.setUTCMonth(currentMonth)

  program.startDate = Date.parse(startDate)
  program.endDate = Date.parse(endDate)
  program.duration = getDuration({ startDate: program.startDate, endDate: program.endDate })

  return program
}

export const cleanAndSortChannels = (channelData) => {
  let currentDate = new Date()

  let [
    currentDayOfMonth,
    currentMonth,
    currentYear,
  ] = [
    currentDate.getUTCDate(),
    currentDate.getUTCMonth(),
    currentDate.getUTCFullYear(),
  ]

  let channels = isArrayEmpty(channelData) ? {} : channelData.map((channel) => {
    let programs = channel.schedules
    let maxIndex = programs.length
    let sortedPrograms = sortSchedule({ schedule: programs })
    
    channel.schedules = sortedPrograms.map((program, index) => {
      let cleanProgram = cleanDateTime({ program, currentDayOfMonth, currentMonth, currentYear, index, maxIndex })

      const [
        startDate,
        endDate,
        startTime,
        endTime,
      ] = [
        new Date(cleanProgram.start),
        new Date(cleanProgram.end),
        cleanProgram.startTime,
        cleanProgram.endTime,
      ]

      if(index === 0 && startTime === BEFORE_MIDNIGHT) cleanProgram.duration = fixStartBeforeMidNightDuration({startDate, endDate})
      if(index === maxIndex-1 && ( endTime === AFTER_MIDNIGHT || endTime === LATER_MIDNIGHT)) cleanProgram.duration = fixFinishAfterMidNightDuration({startDate})

      return cleanProgram
    })
    
    return channel
    
  })

  return channels
}

export const getScrollPosition = ({ element }) => {
  const isBrowser = typeof window !== `undefined`
  if (!isBrowser) return 0

  const target = element ? element.current : document.body
  const position = target.getBoundingClientRect()

  return position.left
}
