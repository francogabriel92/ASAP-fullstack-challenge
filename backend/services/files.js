const FILE_START_LINE = 'file,text,number,hex'

const processData = (data) => {
  if (data.error) return null

  // Split data by line
  const splittedData = data.split('\n')

  // Check if first line is the correct one
  if (splittedData[0] !== FILE_START_LINE) return null

  let fileName = ''
  // Parse the lines
  const lines = splittedData.reduce((acc, line, i) => {
    if (line.length === 0) return acc
    // Discard first line
    if (i === 0 && line === FILE_START_LINE) return acc

    const splittedLine = line.split(',')

    // Assign file name if it's not assigned yet
    if (fileName === '') fileName = splittedLine[0]

    // Check if file has 4 lines and if it doesn't have empty values
    if (splittedLine.length !== 4 || splittedLine.some(el => el === '')) return acc

    const parsedLine = {
      text: splittedLine[1],
      number: splittedLine[2],
      hex: splittedLine[3]
    }

    return [...acc, parsedLine]
  }, [])

  // Discard files with no lines
  if (!fileName || lines.length === 0) return null

  return {
    file: fileName,
    lines
  }
}

module.exports = {
  processData
}
