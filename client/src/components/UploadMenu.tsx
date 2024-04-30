import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdVideoCameraBack, MdPhotoCamera } from "react-icons/md";
import "../styles/uploadMenu.css";

const CircularButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div>
      <button className="uploadButton" onClick={onClick}>
        <FaPlus className="uploadButton_icon" />
      </button>
    </div>
  );
};

const CircleMenu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <div
      className={`fixed bottom-0 right-32 mb-2  h-20 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex w-full h-full gap-5 ">
        <button className="uploadMenu_Button ">
          <MdPhotoCamera className="uploadButton_icon" />
        </button>
        <button className="uploadMenu_Button">
          <MdVideoCameraBack className="uploadButton_icon" />
        </button>
      </div>
    </div>
  );
};
export default function UploadMenu() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleButtonClick = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div>
      <CircularButton onClick={handleButtonClick} />
      <CircleMenu isOpen={menuOpen} />
    </div>
  );
}
