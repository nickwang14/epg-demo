import axios from 'axios'

const getPrograms = async () => {
  console.log('Fetching Data')
  return await axios.get(`/epg`)
    .then(parseJSON)
}

const parseJSON = (response) => response.data

const Client = { getPrograms }
export default Client
