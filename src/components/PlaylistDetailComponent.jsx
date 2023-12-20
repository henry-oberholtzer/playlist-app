import { PropTypes } from 'prop-types'
import './css/playlistDetailComponent.css'
import CD from './../assets/images/CD_autolev_crop_new.jpeg'
import { Link } from 'react-router-dom'
import pigside from './../assets/images/pig-side.png'

const PlaylistDetailComponent = (props) => {
    const list = props.playlist

    const upvote = (e) => {
        e.preventDefault()
        console.log("Rootin!")
    }

    const downvote = (e) => {
        e.preventDefault()
        console.log("Tootin :(")
    }

    return (
        <div
            className="playlistDetailComponent"
            id={list.vibe}
            key={list.key}
        >
            <div className="playlistDetailAbout">
                <Link to={`/playlist/${list.key}`}>
                    <img className="playlistDetailImage" src={list.artworkURL === "" ? CD : list.artworkURL} alt={list.description} />
                </Link>
                <div className="playlistDetailComponentAbout">
                    <Link to={`/playlist/${list.key}`}>
                        <div className='detailMiddle'>
                            <h3>{list.title}</h3>
                            <p>by {list.author} - {list.vibe.charAt(0).match(/[aeiou]/i) ? "An" : "A"} <em>&quot;{list.vibe.replace(/-/, " ")}&quot;</em> vibe</p>
                            <p>{list.tracklist.length} {
                                list.tracklist.length > 1 ? "tracks" : "track"} long</p>
                        </div>
                        <hr />
                    </Link>
                </div>
                <img src={pigside} alt="side pig" className='sidePigImage' />
                <div id='pigButtons'>
                    <button title='This Playlist is Rootin!' id='rootin' type='click' onClick={(e) => upvote(e)}>Rootin</button>
                    <br></br>
                    <button title='This Playlist is Tootin :(' id='tootin' type='click' onClick={(e) => downvote(e)}>Tootin</button>
                </div>
            </div>

        </div>
    )
}

PlaylistDetailComponent.propTypes = {
    playlist: PropTypes.object,
}

export default PlaylistDetailComponent;