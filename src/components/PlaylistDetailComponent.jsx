import { PropTypes } from 'prop-types'
import { setVisibleTracklist, visibleTracklistSelector } from './redux/slices/userInterfaceSlice'
import { useDispatch, useSelector } from 'react-redux'
import './css/playlistDetailComponent.css'
import CD from './../assets/images/CD_autolev_crop_new.jpeg'

const PlaylistDetailComponent = (props) => {
    const dispatch = useDispatch()
    const visibleTracklist = useSelector(visibleTracklistSelector)
    const list = props.playlist

    const renderTracklist = (list) => {
        return (
            <div className="playlistDetailDesc">
                <p>{list.description}</p>
                <ol className="playlistDetailComponentTracklistArea">
                    {list.tracklist.map((track, i) => {
                        return (
                            <li key={i}>{track.artist} - {track.title} <em className="playlistDetailAlbum">{track.album}</em></li>
                        )
                    })}
                </ol>
            </div>
        )
    }

    const tracklistArea = (visibleKey) => {
        if (visibleKey === list.key) {
            return renderTracklist(list)
        } else {
            return <></>
        }
    }

    return (
        <div
            className="playlistDetailComponent"
            key={list.key}
            onClick={() => {
                if (visibleTracklist === list.key) {
                    dispatch(setVisibleTracklist(""))
                } else {
                    dispatch(setVisibleTracklist(list.key))
                }
            }}>
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

            <div className="playlistDetailComponentTracklist">
                {tracklistArea(visibleTracklist)}
            </div>
        </div>
    )
}

PlaylistDetailComponent.propTypes = {
    playlist: PropTypes.object,
}

export default PlaylistDetailComponent;