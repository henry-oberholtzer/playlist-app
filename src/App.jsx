import './App.css'
import Header from './components/Header'
import LogInPage from './components/LogInPage'
import PlaylistForm from './components/PlaylistForm'
import { useSelector} from 'react-redux'
import { userInterfaceSelector } from './components/redux/slices/userInterfaceSlice'
import { pageDirectory } from './components/redux/slices/userInterfaceSlice'
import BrowsePage from './components/BrowsePage'

function App() {
  const page = useSelector(userInterfaceSelector)
  
const visibleState = (num) => {
  switch(num) {
    case (pageDirectory.BrowsePage): 
    console.log("HELLLLO")
      return (
        <BrowsePage />
      )
    case (pageDirectory.LogInPage):
    console.log("LOOGGED IN")  
    return (
        <LogInPage />
      )
    case (pageDirectory.PlaylistCreateForm):
      return (
        <PlaylistForm />
      )
  }
}


  return (
    <>
      <Header />
      {visibleState(page.page)}
    </>
  )
}

export default App
