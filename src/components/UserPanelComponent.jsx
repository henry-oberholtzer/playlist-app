import { Link } from 'react-router-dom';

const UserPanelComponent = (user) => {
	return (
		<div>
			<img src={user.photoURL} />
			<p>{user.displayName}</p>
			<p>{user.email}</p>
			<p onClick={() => }>Log Out</p>
      <Link to={`/profile/${user.uid}`}><p>Profile</p></Link>
		</div>
	);
};

export default UserPanelComponent;
