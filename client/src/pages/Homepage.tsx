import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MediaCard from "../components/MediaCard";
import UploadButton from "../components/UploadButton";
import "../styles/homepage.css";
import { fetchMedia } from "../utils/fetchFunction";

type Media = {
  caption: string;
  type: string;
  Url: string;
  _id: string;
};

export default function Homepage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mediaData = await fetchMedia();
        setMedia(mediaData);
        setTimeout(() => setLoading(false), 2000);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <UploadButton />

      <div className="homepage">
        {loading ? (
          <SkeletonTheme baseColor="#D3D3D3" highlightColor="#3c4147">
            <div className="skeleton-container">
              <Skeleton height={180} />
              <Skeleton height={70} width="100%" />
            </div>
          </SkeletonTheme>
        ) : (
          media.map((doc, index) => (
            <MediaCard
              key={index}
              caption={doc.caption}
              type={doc.type}
              url={doc.Url}
              mediaId={doc._id}
            />
          ))
        )}
      </div>
    </>
  );
}
