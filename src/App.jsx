import './App.css'
import Header from './components/Header'
import LogInPage from './components/LogInPage'
import PlaylistForm from './components/PlaylistForm'
import BrowsePage from './components/BrowsePage'
import { Routes, Route } from "react-router-dom";
import ViewPlaylist from "./components/ViewPlaylist"


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<BrowsePage />} />
        <Route path="/log-in" element={<LogInPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/playlist-form" element={<PlaylistForm />} />
        <Route path="/playlist/:playlistKey" element={<ViewPlaylist />} />
      </Routes>

    </>
  )
}

export default App
