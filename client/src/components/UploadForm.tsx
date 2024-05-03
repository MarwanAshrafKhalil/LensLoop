import { ChangeEvent, FormEvent, useState } from "react";
import { useAppSelector } from "../redux/app/hooks";
import "../styles/uploadForm.css";

type userType = {
  _id: string;
  username: string;
  email: string;
  DOB: string;
  uploads: string[];
};

export default function UploadForm() {
  const [file, setFile] = useState<File | null>();
  const [caption, setCaption] = useState<string>("");
  const maxSize = 3;

  const userFetch = useAppSelector(
    (state) => state.user.currentUser
  ) as userType;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (file) {
      formData.append("media", file);

      formData.append("caption", caption);
      formData.append("userId", userFetch._id);

      if (file.type.includes("video")) {
        await fetch("/api/video/upload", {
          method: "POST",
          body: formData,
          headers: {},
          credentials: "include",
        });
      } else if (file.type.includes("image")) {
        await fetch("/api/image/upload", {
          method: "POST",
          body: formData,
          headers: {},
          credentials: "include",
        });
      }
    }
  };

  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > maxSize) {
      alert(`File size exceeds the limit of ${maxSize}MB`);
    }
    setFile(file);
  };
  return (
    <form onSubmit={submit} className="uploadForm">
      <h3 className="text-3xl text-blue-900 font-bold text-center">
        Upload Media
      </h3>
      <div className=" flex flex-col ">
        <label htmlFor="label"> Choose File</label>
        <div className=" rounded-md mt-2 hover:ring-2">
          <input
            className="upload_Area"
            onChange={fileSelected}
            type="file"
            title=" "
            accept="image/*, video/*"
          ></input>
        </div>
        <span className="text-sm text-orange-500 mt-2">
          -images format: PNG, JPG and JPEG
        </span>
        <span className="text-sm text-orange-500">
          -videos format: MP4 only
        </span>
      </div>

      <label htmlFor="label"> Caption </label>
      <input
        className="caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        type="text"
        placeholder="Caption"
      ></input>
      <button className=" bg-slate-600 text-white " type="submit">
        Submit
      </button>
    </form>
  );
}
