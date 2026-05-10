import { useState } from "react";
import { uploadAvatar } from "./requests";
import {
  FaCamera,
  FaCloudUploadAlt,
  FaUserCircle,
} from "react-icons/fa";

const UploadProfile = ({
  userId,
}: {
  userId: string | undefined;
}) => {
  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image || !userId) return;

    try {
      setLoading(true);

      const response = await uploadAvatar(
        userId,
        image
      );

      console.log(response.data);

      alert("Upload successful");
    } catch (error) {
      console.error(error);

      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-4 relative overflow-hidden">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-[-120px] right-[-120px] w-72 h-72 bg-yellow-300/30 rounded-full blur-3xl" />

      <div className="absolute bottom-[-100px] left-[-100px] w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl" />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/40 p-8">

        {/* HEADER */}
        <div className="flex flex-col items-center text-center">

          <div className="relative">

            {/* PROFILE IMAGE */}
            <div className="w-36 h-36 rounded-full overflow-hidden border-[5px] border-yellow-400 shadow-xl bg-gray-100">

              {preview ? (
                <img
                  src={preview}
                  className="w-full h-full object-cover"
                  alt="preview"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaUserCircle
                    size={110}
                    className="text-gray-300"
                  />
                </div>
              )}

            </div>

            {/* CAMERA BUTTON */}
            <label className="absolute bottom-1 right-1 bg-yellow-500 hover:bg-yellow-600 transition w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg border-4 border-white">

              <FaCamera
                className="text-white text-lg"
              />

              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />

            </label>

          </div>

          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            Upload Profile Picture
          </h2>

          <p className="text-sm text-gray-500 mt-2 max-w-xs">
            Choose a clear photo to personalize your
            delivery profile.
          </p>

        </div>

        {/* IMAGE INFO */}
        {image && (
          <div className="mt-6 bg-yellow-50 border border-yellow-100 rounded-2xl p-4">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <FaCloudUploadAlt className="text-yellow-600 text-xl" />
              </div>

              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {image.name}
                </p>

                <p className="text-xs text-gray-400">
                  {(image.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

            </div>

          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading || !image}
          className={`mt-8 w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg ${
            loading || !image
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600 hover:scale-[1.02]"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">

              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

              Uploading...

            </div>
          ) : (
            "Save Profile Picture"
          )}
        </button>

      </div>
    </div>
  );
};

export default UploadProfile;