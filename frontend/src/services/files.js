import { API_URL } from "../utils/constants"

/**
 *  Fetch files from API if there's an error return null
 * @returns {Promise<Array | null>} Array of files
 */
export const fetchFiles = async () => {
  try {
    const response = await fetch(`${API_URL}/files/data/`)
    const files = await response.json()
    return files
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 *  Fetch file from API if there's an error return null
 * @returns {Promise<object | null>} File object
 */
export const fetchFile = async (fileName) => {
  try {
    const response = await fetch(`${API_URL}/files/data/?fileName=${fileName}`)
    const file = await response.json()
    return file
  } catch (error) {
    console.log(error)
    return null
  }
};