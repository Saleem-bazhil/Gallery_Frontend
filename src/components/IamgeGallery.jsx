import { useEffect, useState } from "react";
import { Search, Heart, Image as ImageIcon, Map, Upload } from "lucide-react";
import api, { BASE_URL } from "../api.jsx"; // Make sure BASE_URL is exported from api.js
import { Link } from "react-router-dom";

export default function ImageGallery() {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [categories, setCategories] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loadingId, setLoadingId] = useState(null);


  const getPhotoUrl = (path) => `${BASE_URL}${path}`;

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await api.get("/gallery/photos/");
      setPhotos(res.data);

      const uniqueCategories = Array.from(
        new Set(res.data.map((photo) => photo.category))
      );
      setCategories(uniqueCategories);
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle favorite
  const toggleFavorite = async (photoId) => {
    setLoadingId(photoId);
    try {
      const res = await api.post(`/gallery/photos/${photoId}/toggle-favorite/`);

      setPhotos((prev) =>
        prev.map((p) =>
          p.id === photoId ? { ...p, is_favorite: res.data.is_favorite } : p
        )
      );

      if (selectedPhoto && selectedPhoto.id === photoId) {
        setSelectedPhoto((prev) => ({
          ...prev,
          is_favorite: res.data.is_favorite,
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  // Filter photos
  const filteredPhotos = photos
    .filter((photo) => {
      if (activeTab === "favorites") return photo.is_favorite;
      if (activeTab === "all") return true;
      return activeTab === photo.category;
    })
    .filter((photo) =>
      photo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-background lg:p-12">
      {/* Title */}
      <div className="text-center my-5 mt-20 lg:mt-10">
        <h4 className="text-3xl md:text-6xl py-4 mt-8 gradient-text bebas-neue-regular">
          Explore Your Photo Collection
        </h4>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border rounded-xl m-4 lg:m-0">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-2xl font-bold gradient-text text-center lg:text-left">
            SmartGallery AI
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-box pl-10 pr-3 py-2 placeholder:text-sm"
                placeholder=""
              />
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <section className="container mx-auto px-4 py-4 flex gap-3 lg:gap-4 border-b border-border flex-wrap">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition my-2 ${
            activeTab === "all" ? "bg-primary text-background" : "btn"
          }`}
        >
          <ImageIcon className="h-4 w-4" /> All Photos
        </button>

        <button
          onClick={() => setActiveTab("favorites")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition my-2 ${
            activeTab === "favorites" ? "bg-primary text-background" : "btn"
          }`}
        >
          <Heart className="h-4 w-4" /> Favorites
        </button>

        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(cat)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition my-2 ${
              activeTab === cat ? "bg-primary text-background" : "btn"
            }`}
          >
            <Map className="h-4 w-4" /> {cat}
          </button>
        ))}

        <button className="px-4 py-2 rounded-xl transition my-2 btn">
          <Link to="/image-upload" className="flex items-center gap-2">
            <Upload /> Upload Image
          </Link>
        </button>
      </section>

      {/* Photo Grid */}
      <main className="container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square rounded-xl overflow-hidden group hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={getPhotoUrl(photo.image)}
                alt={photo.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              {/* Overlay with name, date, favorite */}
              <div className="absolute bottom-0 w-full bg-black/40 text-white p-2 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{photo.name}</p>
                  <p className="text-xs">
                    {new Date(photo.date).toLocaleString()}
                  </p>
                </div>
                <button
                  disabled={loadingId === photo.id}
                  className="text-red-500 hover:text-red-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(photo.id);
                  }}
                >
                  {photo.is_favorite ? "★" : "☆"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <ImageIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-lg text-gray-500">No photos found</p>
            <p className="text-sm text-gray-400 mt-2">Try a different search</p>
          </div>
        )}
      </main>

      {/* Full-view Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={getPhotoUrl(selectedPhoto.image)}
              alt={selectedPhoto.name}
              className="max-w-[90vw] max-h-[90vh] rounded-xl"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={() => setSelectedPhoto(null)}
            >
              &times;
            </button>
            <div className="text-white mt-2 text-center">
              <p className="font-semibold">{selectedPhoto.name}</p>
              <p className="text-sm">
                {new Date(selectedPhoto.date).toLocaleString()}
              </p>
              <button
                disabled={loadingId === selectedPhoto.id}
                className="mt-2 text-red-500 hover:text-red-400"
                onClick={() => toggleFavorite(selectedPhoto.id)}
              >
                {selectedPhoto.is_favorite
                  ? "★ Remove Favorite"
                  : "☆ Add Favorite"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
