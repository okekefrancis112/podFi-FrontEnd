import { useState } from "react"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SingleRecommendedPodcast from "./SingleRecommendedPodcast"
import { Link } from "react-router-dom"

const ProfileRecommendation = () => {
  const [showRecom, setShowRecom] = useState(false)
  const featured = [
    {
      id: 1,
      imageUrl: "/images/photo.jpg",
      title: "podcast1",
      listenings: 20,
      likes: 20,
    },
    {
      id: 2,
      imageUrl: "/images/photo.jpg",
      title: "podcast2",
      listenings: 20,
      likes: 20,
    },
    {
      id: 3,
      imageUrl: "/images/photo.jpg",
      title: "podcast3",
      listenings: 20,
      likes: 20,
    },
    {
      id: 4,
      imageUrl: "/images/photo.jpg",
      title: "podcast4",
      listenings: 20,
      likes: 20,
    },
    {
      id: 5,
      imageUrl: "/images/photo.jpg",
      title: "podcast5",
      listenings: 20,
      likes: 20,
    },
    {
      id: 6,
      imageUrl: "/images/photo.jpg",
      title: "podcast6",
      listenings: 20,
      likes: 20,
    },
  ]
  return (
    <div className="h-fit w-full rounded-3xl bg-neutral-200 dark:bg-neutral-700 p-4 xxs:p-8">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setShowRecom((prev) => !prev)}
      >
        <h2 className="text-lg text-sky-900 dark:text-blue-300 underline underline-offset-4">
          Featured Podcasts
        </h2>
        <div className="border-[12px] border-slate-900 border-l-0 border-y-transparent w-0 h-0 inline-block ms-auto"></div>
        <div className="bg-slate-900 w-8 h-6 rounded-tr-lg rounded-br-lg p-1 inline-flex justify-center items-center">
          <FontAwesomeIcon
            icon={showRecom ? faMinus : faPlus}
            className="w-full h-full text-white"
          />
        </div>
      </div>
      {showRecom ? (
        <div className="flex max-h-[370px] overflow-y-auto overflow-x-hidden flex-col gap-y-4 w-full my-4 p-4 sm:px-12 md:px-32 lg:px-48 sm:py-4 xl:p-4">
          {featured.map((podcast) => (
            <Link
              to={`/podcast/${podcast.id}`}
              className="hover:scale-110"
              key={podcast.id}
            >
              <SingleRecommendedPodcast podcast={podcast} />
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  )
}
export default ProfileRecommendation
