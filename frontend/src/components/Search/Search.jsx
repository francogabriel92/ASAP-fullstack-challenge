import { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { fetchFile } from '../../services/files';
import { useDispatch } from 'react-redux';
import { setFile, setLoading, setError } from '../../reducers/filesSlice';

const Search = () => {
  const [keyword, setKeyword] = useState('')
  const [ isSubmitted, setIsSubmitted ] = useState(false)
  const dispatch = useDispatch()
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setError(null))
    if(isSubmitted) {
      handleReset()
      return;
    }
    if(keyword.trim()) {
      dispatch(setLoading(true))
      setIsSubmitted(true)
      const file = await fetchFile(keyword)
      if(file) {
        dispatch(setFile(file))
        dispatch(setLoading(false))
      } else {
        dispatch(setFile(null))
        dispatch(setError('File not found'))
        dispatch(setLoading(false))
      }
    }
  }

  const handleReset = () => {
    setKeyword('')
    formRef.current.reset()
    dispatch(setFile(null))
    dispatch(setError(null))
  }

  const handleChange = (e) => {
    if(isSubmitted) {
      setIsSubmitted(false)
    }
    setKeyword(e.target.value)
  };

  return (
    <Form 
      className="d-flex pt-2 pt-md-0 ms-md-auto" 
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <Form.Control
        type="search"
        className="me-2"
        aria-label="Search"
        onChange={handleChange}
      />
      <Button type='submit' variant="light" className='text-uppercase'>
        {isSubmitted ? 'Reset' : 'Search'}
      </Button>
    </Form>
  )
}

export default Search