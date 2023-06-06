import { useEffect, useMemo, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import './FilesTable.css'
import { useSelector } from 'react-redux'

const FilesTable = () => {
  const data = useSelector(state => state.files.files);
  const files = useMemo(() => parseFiles(data), [data])
  const loading = useSelector(state => state.files.loading)
  const error = useSelector(state => state.files.error)
  const file = useSelector(state => state.files.file)

  useEffect(() => {

  }, [error, loading])

  const dataToShow = () => {
    if(loading) return <tr><td colSpan='4'>Loading...</td></tr>
    if(error) return <tr><td colSpan='4'>{error}</td></tr>
    if(file) return file.lines.map( (line, i) => (
      <tr key={i}>
        <td>{file.file}</td>
        <td>{line.text}</td>
        <td>{line.number}</td>
        <td>{line.hex}</td>
      </tr>
    ))
    return files.map( (file, i) => (
      <tr key={i}>
        <td>{file.fileName}</td>
        <td>{file.text}</td>
        <td>{file.number}</td>
        <td>{file.hex}</td>
      </tr>
    ))
  }
  
  return (
    <Container className='my-3 overflow-scroll'>
      <Table 
        className='result-table'
        striped
        bordered
      >
        <thead className='border-bottom'>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {dataToShow()}
        </tbody>
      </Table>
    </Container>
  )
}

const parseFiles = (data) => {
  if(!data) return []
  let files = []
    data.forEach(file => {
      const parsedData = file.lines.map(line => {
        return {
          fileName: file.file,
          text: line.text,
          number: line.number,
          hex: line.hex
        }
      })
      files = [...files, ...parsedData]
    })
  return files;
};

export default FilesTable