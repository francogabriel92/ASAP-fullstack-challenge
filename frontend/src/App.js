import { useEffect } from "react"
import { fetchFiles } from "./services/files"
import { useDispatch } from "react-redux"
import { setError, setFiles, setLoading } from "./reducers/filesSlice"
import Navbar from "./components/Navbar/Navbar"
import FilesTable from "./components/FilesTable/FilesTable"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true))
      const files = await fetchFiles()
      dispatch(setLoading(false))
      if(!files) {
        dispatch(setError('Error fetching files'))
        return
      }
      dispatch(setFiles(files))
    };
    fetchData()
  }, [])

  return (
    <>
      <Navbar />
      <FilesTable />
    </>
  )
}

export default App
