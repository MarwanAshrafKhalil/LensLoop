import { useEffect, useState } from "react";
import { FaPlus, FaUser } from "react-icons/fa6";
import { useAppSelector } from "../redux/app/hooks";
import "../styles/uploadMenu.css";
import UploadDialogue from "./UploadDialogue";

type userType = {
  _id: string;
  username: string;
  email: string;
  DOB: string;
  uploads: string[];
};

const CircularButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [signedin, setSignedIn] = useState<boolean>(false);
  const userFetch = useAppSelector(
    (state) => state.user.currentUser
  ) as userType;

  useEffect(() => {
    if (Object.keys(userFetch).length != 0) {
      setSignedIn((prev) => !prev);
    }
  }, [userFetch]);

  return (
    <div>
      <button className="uploadButton" onClick={onClick}>
        {signedin ? (
          <FaPlus className="uploadButton_icon" />
        ) : (
          <FaUser className="uploadButton_icon" />
        )}
      </button>
    </div>
  );
};

export default function UploadButton() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleButtonClick = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div>
      <CircularButton onClick={handleButtonClick} />

      {menuOpen && <UploadDialogue />}
      {/* <CircleMenu isOpen={menuOpen} /> */}
    </div>
  );
}
