import cookies from "../assets/cookeis.jpg";
import "../styles/mediaCard.css";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
export default function MediaCard() {
  return (
    <div className="mediaCard">
      <div className="mediaCard_mediaData">
        <img className="mediaCard_image" src={cookies} alt="media" />
        <span className="mediaCard_span">
          caption will be here just for now
        </span>
      </div>
      <div className="mediaCard_actions">
        <AiFillLike className="like" />
        <AiFillDislike />
      </div>
    </div>
  );
}
