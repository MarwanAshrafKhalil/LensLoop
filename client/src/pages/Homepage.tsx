import MediaCard from "../components/MediaCard";
import UploadMenu from "../components/UploadMenu";
import "../styles/homepage.css";

export default function Homepage() {
  return (
    <>
      <UploadMenu />

      <div className="homepage">
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
      </div>
    </>
  );
}
