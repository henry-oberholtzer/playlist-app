import { useDispatch } from "react-redux";
import { changePage } from "./redux/slices/userInterfaceSlice";
import { pageDirectory } from "./redux/slices/userInterfaceSlice";

const Header = () => {
    const dispatch = useDispatch()

    const handleNavClick = (pageNum) => {
        dispatch(changePage(pageNum))
    }

    return (
        <>
        <h1>Playlist App</h1>
        <hr />
        <button 
        className="navButton"
        onClick={() => handleNavClick(pageDirectory.BrowsePage)}>Browse Playlists</button>
        <button 
        className="navButton"
        onClick={() => handleNavClick(pageDirectory.LogInPage)}>Log In</button>
        <button
        className="navButton"
        onClick={() => handleNavClick(pageDirectory.PlaylistCreateForm)}
        >Add Playlist</button>
        </>
    );
};

export default Header;