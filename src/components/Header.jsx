import { Link } from 'react-router-dom';
import pig from './../assets/images/202103_Pig.png';
import './css/Header.css';
import PropTypes from 'prop-types';
import { auth } from '../firebase';
import { useSelector } from 'react-redux';
import { authSelector } from './redux/slices/userInterfaceSlice';

const Header = () => {
	const authBoolean = useSelector(authSelector);

	return (
		<div className="headerPig">
			<img
				className="pigLogo"
				src={pig}
				alt="the music pig herself"
			/>
			<Link to="/browse">
				<h1 className="headerTitle">musicpiggy</h1>
			</Link>
			<ul className="headerNav">
				<Link to="/browse">
					<li>Browse Playlists</li>
				</Link>
				<Link to={authBoolean ? '/playlist-form' : '/log-in'}>
					<li>Add a Playlist</li>
				</Link>
				{authBoolean ? (
					<Link to={`/profile/${auth.currentUser.uid}`}>
						<li>{auth.currentUser.displayName}</li>
					</Link>
				) : (
					<Link to="/log-in">
						<li>Log In</li>
					</Link>
				)}
			</ul>
		</div>
	);
};

Header.propTypes = {
	auth: PropTypes.bool,
};

export default Header;
