import { PropTypes } from 'prop-types'
import './css/playlistDetailComponent.css'
import CD from './../assets/images/CD_autolev_crop_new.jpeg'
import { Link } from 'react-router-dom'

const PlaylistDetailComponent = (props) => {
    const list = props.playlist

    return (
        <div
            className="playlistDetailComponent"
            key={list.key}>
                <Link to={`/playlist/${list.key}`}>
            <div className="playlistDetailAbout">
                <img className="playlistDetailImage" src={list.artworkURL === "" ? CD : list.artworkURL} alt={list.description} />
                <div className="playlistDetailComponentAbout">
                    <h3>{list.title}</h3>
                    <p>by {list.author} - {list.vibe.charAt(0).match(/[aeiou]/i) ? "An" : "A"} <em>&quot;{list.vibe.replace(/-/, " ")}&quot;</em> vibe</p>
                    <p>{list.tracklist.length} {
                        list.tracklist.length > 1 ? "tracks" : "track"} long</p>
                    
                    <hr />
                </div>
            </div>
            </Link>
        </div>
    )
}

PlaylistDetailComponent.propTypes = {
    playlist: PropTypes.object,
}

export default PlaylistDetailComponent;