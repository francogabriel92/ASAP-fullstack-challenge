const axios = require('axios')
const { EXTERNAL_API_URI, EXTERNAL_API_TOKEN } = require('../utils/constants')
const { processData } = require('../services/files')

// Fetch Data from external API
const fetchFilesData = async () => {
  const response = await axios.get(`${EXTERNAL_API_URI}/files`, {
    headers: {
      Authorization: EXTERNAL_API_TOKEN
    }
  })
  return response.data.files
}

// Get all files
const getFiles = async () => {
  const files = await fetchFilesData()
  const filesData = await Promise.all(files.map(async (file) => {
    try {
      const fileData = await axios.get(`${EXTERNAL_API_URI}/file/${file}`, {
        headers: {
          Authorization: EXTERNAL_API_TOKEN
        }
      })
      return processData(fileData.data)
    } catch (error) {
      return null
    }
  }))
  // Discard null values
  return filesData.filter((file) => file !== null)
}

// Get a single file
const getFile = async (fileName) => {
  try {
    const fileData = await axios.get(`${EXTERNAL_API_URI}/file/${fileName}`, {
      headers: {
        Authorization: EXTERNAL_API_TOKEN
      }
    })
    return processData(fileData.data)
  }
  catch (error) {
    return null
  }
}

// Get list of files
const getList = async () => {
  const files = await fetchFilesData()
  return { files }
};

module.exports = {
  getFile,
  getFiles,
  getList
}
