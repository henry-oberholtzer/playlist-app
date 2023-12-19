import { Link } from "react-router-dom";
import pig from './../assets/images/202103_Pig.png'
import './css/Header.css'

const Header = () => {
    return (
        <div className="headerPig">
            <img className="pigLogo" src={pig} alt="the music pig herself" />
            <Link to="/browse"><h1 className="headerTitle">musicPIG</h1></Link>
            <ul className="headerNav">
                <Link to="/log-in"><li>Log In</li></Link>
                <Link to="/browse"><li>Browse Playlists</li></Link>
                <Link to="/playlist-form"><li>Add a Playlist</li></Link>
            </ul>
        </div>
    );
};

export default Header;