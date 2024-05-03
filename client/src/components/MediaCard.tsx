import { AiFillDislike, AiFillLike } from "react-icons/ai";
import "../styles/mediaCard.css";
import { useAppSelector } from "../redux/app/hooks";

type userType = {
  _id: string;
  username: string;
  email: string;
  DOB: string;
  uploads: string[];
};

export default function MediaCard({
  caption,
  type: fileType,
  url,
  mediaId,
}: {
  caption: string;
  type: string;
  url: string;
  mediaId: string;
}) {
  const userFetch = useAppSelector(
    (state) => state.user.currentUser
  ) as userType;

  const handleLike = async (like: string) => {
    if (Object.keys(userFetch).length === 0) {
      alert("Signin required, kindly click on Upload button");
    }

    const jsonData = {
      mediaId: mediaId,
      type: fileType,
    };

    const response = await fetch(`/api/inter/${like}`, {
      method: "POST",
      body: JSON.stringify(jsonData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      console.log("failed to find media");
    }
  };

  return (
    <div className="mediaCard">
      <div className="mediaCard_mediaData">
        {fileType === "image" ? (
          <img
            className="mediaCard_image"
            src={url}
            alt="media"
            loading="lazy"
          />
        ) : (
          <video className="mediaCard_image" controls preload="metadata">
            <source src={url} type="video/MP4" />
          </video>
        )}
        <span className="mediaCard_span">{caption} </span>
      </div>
      <div className="mediaCard_actions">
        <button onClick={() => handleLike("like")} className="action_button">
          <AiFillLike />
        </button>
        <button
          onClick={() => handleLike("dislike")}
          className="action_button text-red-400 hover:text-red-600"
        >
          <AiFillDislike />
        </button>
      </div>
    </div>
  );
}
