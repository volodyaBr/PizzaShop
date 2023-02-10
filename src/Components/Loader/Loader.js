import loaderGif from "../../assets/gif/loader.gif"

const Loader = (props) => {
    return (
        <div className="loader">
            <img src={loaderGif} alt="Loading..."/>
        </div>
    )
}


export default Loader
