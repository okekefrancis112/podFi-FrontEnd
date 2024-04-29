import { Link, useNavigate, useParams } from "react-router-dom"
import Accordion from "../components/Accordion"
import ProfileRecommendation from "../components/ProfileRecommendation"
import { users } from "../demoData"
import Share from "../components/Share"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"

// import required modules
import { Navigation } from "swiper/modules"
import { useEffect, useRef, useState } from "react"

const Profile = ({ user }) => {
  const { creatorUsername, activePodcastId } = useParams()

  const creatorData = users.find((user) => user.username === creatorUsername)
  if (!creatorData) {
    return (
      <p className=" dark:text-white pt-96 text-center min-h-screen text-3xl">
        NO SUCH USER
      </p>
    )
  }

  //active podcast navigation through links
  const navigate = useNavigate()

  //handle swiper
  const swiperRef = useRef(null)
  const handleSlideClick = (index) => {
    if (swiperRef) {
      swiperRef.current.slideTo(index)
    }
  }
  const handleSlideChange = (swiper) => {
    const activeSlideIndex = swiper.activeIndex
    const { creator, podcastId } = swiper.slides[activeSlideIndex]?.dataset
    navigate(`/profile/${creator}/${podcastId}`)
  }
  const handleActiveSlideOnLoad = (swiper) => {
    if (activePodcastId) {
      //find the slideIndex that contains the activePodcastId within its dataset
      const slideIndex = [...swiper.slides].findIndex(
        (slide) => slide?.dataset?.podcastId === activePodcastId
      )
      swiper.slideTo(slideIndex)
    }
  }

  useEffect(() => {
    if (!activePodcastId) {
      const podcastId =
        swiperRef.current?.slides[swiperRef.current.activeIndex]?.dataset
          ?.podcastId
      navigate(`/profile/${creatorData.username}/${podcastId ? podcastId : ""}`)
    }
  }, [])

  const [podcastData, setPodcastData] = useState(null)
  useEffect(() => {
    if (activePodcastId) {
      let tempPodcastData = creatorData.podcasts.find(
        (podcast) => podcast.id == activePodcastId
      )
      if (!tempPodcastData) {
        tempPodcastData = creatorData.podcasts.find(
          (podcast) =>
            podcast.id == swiperRef.current.slides[0]?.dataset?.podcastId
        )
      }

      if (tempPodcastData) {
        setPodcastData(tempPodcastData)
        swiperRef.current.slideTo(
          [...swiperRef.current.slides].findIndex(
            (slide) => slide.dataset.podcastId == activePodcastId
          )
        )
      }
    }
  }, [activePodcastId])


  const [isFollower, setIsFollower] = useState(
    creatorData.followers.find(follower=>follower.username === user.username)?true:false
  )
  return (
    <div className="font-futuraMd min-h-screen relative overflow-hidden px-4 xs:px-10 xl:px-20 z-0">
      {/* bg */}
      <div className="w-fit h-fit absolute -top-96 -right-[450px] -z-10">
        <img src="/images/profile_bg.svg" width={1000} height={1000} />
      </div>
      {/* page content */}
      <div className="w-full flex flex-col-reverse items-center xl:items-start gap-y-8 gap-x-4 justify-between mt-36 xl:flex-row">
        <div className="flex flex-col w-full xl:w-8/12 gap-y-16">
          {/* profile details */}
          <div className="w-full h-fit">
            {/* text */}
            <div className="flex flex-col px-0 xs:px-4 sm::px-8 py-4 w-full max-w-[600px] text-lg text-sky-900 dark:text-blue-300">
              {/* username/followers and follow/share btns */}
              <div className="flex flex-col xs:flex-row justify-between items-start gap-4">
                <div className="flex flex-col gap-y-4">
                  {/* username */}
                  <h2 className="text-2xl xxs:text-3xl">
                    {creatorData.username}
                  </h2>
                  {/* followers/followings */}
                  <div className="flex gap-x-12 pl-4">
                    {/* followers */}
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl font-bold">
                        {creatorData.followers.length}
                      </h2>
                      <span className="text-cyan-600 text-sm">Followers</span>
                    </div>
                    {/* following */}
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl font-bold">
                        {creatorData.followings.length}
                      </h2>
                      <span className="text-cyan-600 text-sm">Following</span>
                    </div>
                  </div>
                </div>
                {/* follow/edit/share profile */}
                <div className="flex items-center gap-x-2 w-full xs:w-fit">
                  {/* follow/edit profile btn */}
                  {creatorData.username === user.username ? (
                    <button onClick={()=>navigate(`/profile/${creatorData.username}/edit`)} className="bg-blue-500 hover:bg-blue-600 text-white px-8 w-full py-2 rounded-xl">
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={()=>{
                        // send req to add/remove current user to the followers' list of creatorProfile
                        setIsFollower(prev=>!prev)
                      }}
                      className={
                        isFollower
                          ? "border-2 border-blue-500 hover:border-cyan-500 text-blue-500 hover:text-cyan-500 px-8 w-full py-2 rounded-xl"
                          : "bg-blue-500 hover:bg-blue-600 text-white px-8 w-full py-2 rounded-xl"
                      }
                    >
                      {isFollower ? "Unfollow" : "Follow"}
                    </button>
                  )}
                  {/* profile share btn */}
                  <div
                    onClick={(e) =>
                      e.currentTarget.querySelector(".share-modal").showModal()
                    }
                    className="w-fit h-fit cursor-pointer rounded-xl border-2 fill-sky-900 dark:fill-blue-300 dark:hover:fill-sky-500 hover:fill-sky-500 border-blue-500 hover:border-sky-500 p-2"
                  >
                    <svg
                      className="fill-inherit"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16.6667 4.16808C16.6667 3.06263 17.1057 2.00247 17.8871 1.2208C18.6685 0.439135 19.7283 0 20.8333 0C21.9384 0 22.9982 0.439135 23.7796 1.2208C24.561 2.00247 25 3.06263 25 4.16808C24.9995 4.86997 24.8218 5.56038 24.4834 6.17525C24.145 6.79013 23.6569 7.30956 23.0642 7.68537C22.4716 8.06117 21.7937 8.28119 21.0934 8.32501C20.3932 8.36883 19.6931 8.23503 19.0583 7.93602L15.2167 12.5392L18.6133 17.3042C19.2437 16.9072 19.9688 16.6865 20.7134 16.665C21.4579 16.6436 22.1946 16.8222 22.8467 17.1822C23.4989 17.5423 24.0426 18.0706 24.4213 18.7122C24.8 19.3538 24.9998 20.0853 25 20.8304C25.0002 21.4838 24.8469 22.1281 24.5524 22.7113C24.2579 23.2945 23.8305 23.8002 23.3046 24.1877C22.7787 24.5753 22.1691 24.8337 21.525 24.9422C20.8809 25.0506 20.2204 25.0061 19.5966 24.8122C18.9729 24.6182 18.4035 24.2803 17.9343 23.8257C17.4652 23.3712 17.1094 22.8126 16.8958 22.1951C16.6822 21.5777 16.6167 20.9186 16.7045 20.2712C16.7924 19.6238 17.0312 19.006 17.4017 18.4679L13.7433 13.3395H8.24833C8.03739 14.3482 7.46049 15.2431 6.62893 15.8514C5.79737 16.4598 4.77006 16.7385 3.74517 16.6339C2.72028 16.5293 1.77043 16.0487 1.07884 15.2849C0.387251 14.5211 0.00292512 13.5281 0 12.4976C0.00102746 11.4646 0.385426 10.4689 1.07867 9.70337C1.77191 8.93785 2.72462 8.4571 3.75207 8.35432C4.77952 8.25154 5.80852 8.53405 6.63957 9.14709C7.47062 9.76013 8.04452 10.66 8.25 11.6723H13.77L17.72 6.93735C17.0401 6.17545 16.665 5.18941 16.6667 4.16808Z" />
                    </svg>
                    <Share
                      shareUrl={`${window.location.origin}/profile/${creatorData.username}`}
                    />
                  </div>
                </div>
              </div>

              {/* bio */}
              <p className="py-4">{creatorData.bio}</p>
            </div>
            {/* podcast container */}
            <div className="w-full h-fit rounded-3xl bg-neutral-200 dark:bg-neutral-900 p-4 xxs:p-8 flex flex-col gap-y-4">
              {/* new podcast */}
              <div className="w-full px-0 xs:px-8 h-fit flex flex-col xxs:flex-row justify-between items-start xxs:items-center">
                <h1 className="text-xl font-bold text-sky-900 dark:text-blue-300">
                  Podcasts
                </h1>
                {creatorData?.username === user?.username ? (
                  <Link
                    to={`/profile/${creatorData.username}/create-podcast`}
                    className="text-lg w-fit flex text-nowrap gap-x-4 my-4 items-center text-blue-500 dark:text-sky-500 hover:scale-110"
                  >
                    <img src="/images/plus_icon.svg" width={25} height={25} />
                    Create New Podcast
                  </Link>
                ) : (
                  ""
                )}
              </div>
              {/* swiper */}
              {creatorData.podcasts.length ? (
                <Swiper
                  ref={swiperRef}
                  centeredSlides={true}
                  slidesPerView={2}
                  spaceBetween={20}
                  breakpoints={{
                    440: {
                      slidesPerView: 2,
                      spaceBetween: 40,
                    },
                    900: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                  }}
                  navigation={true}
                  modules={[Navigation]}
                  onSwiper={(swiperInstance) =>
                    (swiperRef.current = swiperInstance)
                  }
                  onSlideChange={handleSlideChange}
                  onInit={handleActiveSlideOnLoad}
                  className="profile-swiper w-full h-fit py-6"
                >
                  {creatorData.podcasts.map((podcast, index) => (
                    <SwiperSlide
                      data-podcast-id={podcast.id}
                      data-creator={podcast.creator}
                      data-slide-index={index}
                      key={podcast.id}
                      onClick={() => handleSlideClick(index)}
                      className="cursor-pointer w-full h-32 xxs:h-52 rounded-3xl overflow-hidden"
                    >
                      <img
                        src={podcast.imageUrl}
                        className="w-full h-full object-cover object-center"
                      ></img>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="my-16">
                  <div className="flex items-center justify-center gap-x-4 w-full m-auto">
                    <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
                    <span className="text-sm text-nowrap xxs:text-xl text-zinc-700 dark:text-zinc-500">
                      No Podcasts Yet
                    </span>
                    <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
                  </div>
                </div>
              )}
              {podcastData ? (
                <div className=" text-sky-900 dark:text-blue-300 flex flex-col gap-y-2 mt-6">
                  <h1 className="font-bold text-2xl">{podcastData.title}</h1>
                  <p className="text-lg">{podcastData.description}</p>
                  <Link
                    to="#episodes"
                    className="w-fit text-lg underline underline-offset-2 hover:text-sky-600 hover:dark:text-blue-200"
                  >
                    {podcastData.episodes.length
                      ? `${podcastData.episodes.length} episode${
                          podcastData.episodes.length > 1 ? "s" : ""
                        }`
                      : "No episodes yet"}
                  </Link>
                  <div className="flex flex-wrap justify-center xs:justify-end items-center gap-4 xs:gap-x-8 mt-6 xs:mt-4">
                    {/* listening */}
                    <div className="text-nowrap flex items-center gap-x-2">
                      <svg
                        className="fill-[#0A1640] dark:fill-blue-500"
                        width="26"
                        height="22"
                        viewBox="0 0 26 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.02988 10.5926C9.34824 10.5926 10.6126 10.0346 11.5448 9.04134C12.477 8.04809 13.0008 6.70096 13.0008 5.2963C13.0008 3.89163 12.477 2.5445 11.5448 1.55125C10.6126 0.558001 9.34824 0 8.02988 0C6.71152 0 5.44716 0.558001 4.51494 1.55125C3.58272 2.5445 3.059 3.89163 3.059 5.2963C3.059 6.70096 3.58272 8.04809 4.51494 9.04134C5.44716 10.0346 6.71152 10.5926 8.02988 10.5926ZM16.7282 18.977C17.5388 19.3307 18.5697 19.5556 19.882 19.5556C26 19.5556 26 14.6667 26 14.6667C26 14.0186 25.7585 13.3971 25.3286 12.9388C24.8986 12.4804 24.3155 12.2227 23.7073 12.2222H16.6287C17.2298 12.9979 17.5908 13.9904 17.5908 15.0741V15.6542C17.5877 15.7914 17.579 15.9285 17.5648 16.0649C17.4616 17.0831 17.1767 18.0712 16.7282 18.977ZM23.7073 6.51852C23.7073 7.59903 23.3044 8.63529 22.5873 9.39932C21.8702 10.1634 20.8976 10.5926 19.8835 10.5926C18.8694 10.5926 17.8968 10.1634 17.1797 9.39932C16.4626 8.63529 16.0598 7.59903 16.0598 6.51852C16.0598 5.43801 16.4626 4.40175 17.1797 3.63771C17.8968 2.87368 18.8694 2.44444 19.8835 2.44444C20.8976 2.44444 21.8702 2.87368 22.5873 3.63771C23.3044 4.40175 23.7073 5.43801 23.7073 6.51852ZM0 15.4815C0 14.6171 0.322287 13.7881 0.895961 13.1768C1.46964 12.5656 2.24771 12.2222 3.059 12.2222H13.0008C13.8121 12.2222 14.5901 12.5656 15.1638 13.1768C15.7375 13.7881 16.0598 14.6171 16.0598 15.4815C16.0598 15.4815 16.0598 22 8.02988 22C0 22 0 15.4815 0 15.4815Z" />
                      </svg>

                      <h3>{podcastData.listening} Listening</h3>
                    </div>
                    {/* likes */}
                    <div className="text-nowrap flex items-center gap-x-2">
                      <svg
                        onClick={(e) =>
                          e.currentTarget.classList.contains("fill-red-600")
                            ? (e.currentTarget.classList =
                                "fill-[#0A1640] dark:fill-blue-500 cursor-pointer hover:fill-slate-700 dark:hover:fill-blue-400")
                            : (e.currentTarget.classList =
                                "fill-red-600 cursor-pointer")
                        }
                        className="fill-[#0A1640] dark:fill-blue-500 cursor-pointer hover:fill-slate-700 dark:hover:fill-blue-400"
                        width="25"
                        height="21"
                        viewBox="0 0 25 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18.033 0C15.6511 0 13.6159 1.63219 12.4977 2.75747C11.3795 1.63219 9.34886 0 6.96818 0C2.86477 0 0 2.74982 0 6.68609C0 11.0233 3.55795 13.8267 7 16.5382C8.625 17.8197 10.3068 19.1438 11.5966 20.6122C11.8136 20.858 12.1318 21 12.4659 21H12.5318C12.867 21 13.1841 20.8569 13.4 20.6122C14.692 19.1438 16.3727 17.8186 17.9989 16.5382C21.4398 13.8278 25 11.0244 25 6.68609C25 2.74982 22.1352 0 18.033 0Z" />
                      </svg>

                      <h3>{podcastData.likes} likes</h3>
                    </div>
                    {/* share */}
                    <div
                      className="w-fit h-fit cursor-pointer"
                      onClick={(e) =>
                        e.currentTarget
                          .querySelector(".share-modal")
                          .showModal()
                      }
                    >
                      <svg
                        className="fill-[#104F6A] hover:fill-sky-950 dark:fill-blue-300 dark:hover:fill-blue-500 w-7 lg:w-6"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.6667 4.16808C16.6667 3.06263 17.1057 2.00247 17.8871 1.2208C18.6685 0.439135 19.7283 0 20.8333 0C21.9384 0 22.9982 0.439135 23.7796 1.2208C24.561 2.00247 25 3.06263 25 4.16808C24.9995 4.86997 24.8218 5.56038 24.4834 6.17525C24.145 6.79013 23.6569 7.30956 23.0642 7.68537C22.4716 8.06117 21.7937 8.28119 21.0934 8.32501C20.3932 8.36883 19.6931 8.23503 19.0583 7.93602L15.2167 12.5392L18.6133 17.3042C19.2437 16.9072 19.9688 16.6865 20.7134 16.665C21.4579 16.6436 22.1946 16.8222 22.8467 17.1822C23.4989 17.5423 24.0426 18.0706 24.4213 18.7122C24.8 19.3538 24.9998 20.0853 25 20.8304C25.0002 21.4838 24.8469 22.1281 24.5524 22.7113C24.2579 23.2945 23.8305 23.8002 23.3046 24.1877C22.7787 24.5753 22.1691 24.8337 21.525 24.9422C20.8809 25.0506 20.2204 25.0061 19.5966 24.8122C18.9729 24.6182 18.4035 24.2803 17.9343 23.8257C17.4652 23.3712 17.1094 22.8126 16.8958 22.1951C16.6822 21.5777 16.6167 20.9186 16.7045 20.2712C16.7924 19.6238 17.0312 19.006 17.4017 18.4679L13.7433 13.3395H8.24833C8.03739 14.3482 7.46049 15.2431 6.62893 15.8514C5.79737 16.4598 4.77006 16.7385 3.74517 16.6339C2.72028 16.5293 1.77043 16.0487 1.07884 15.2849C0.387251 14.5211 0.00292512 13.5281 0 12.4976C0.00102746 11.4646 0.385426 10.4689 1.07867 9.70337C1.77191 8.93785 2.72462 8.4571 3.75207 8.35432C4.77952 8.25154 5.80852 8.53405 6.63957 9.14709C7.47062 9.76013 8.04452 10.66 8.25 11.6723H13.77L17.72 6.93735C17.0401 6.17545 16.665 5.18941 16.6667 4.16808Z" />
                      </svg>
                      <Share
                        shareUrl={`${window.location.origin}/profile/${creatorData.username}/${podcastData.id}`}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* content */}
          <Accordion podcastData={podcastData} user={user} />
        </div>
        {/* recommendation */}
        <div className="w-full xl:w-80 flex flex-col gap-y-4">
          <ProfileRecommendation />
          <Link
            to="/create-livestream"
            className="w-full flex items-center justify-center gap-x-4 bg-blue-500 hover:bg-blue-600 rounded-3xl text-white p-4 text-lg text-nowrap"
          >
            <img src="/images/livestream_icon.svg" width={50} height={50} />
            <span>Start Livestream</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Profile
