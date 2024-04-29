import { useState } from "react"
import SingleEpisode from "./SingleEpisode"
import { Link } from "react-router-dom"
const Accordion = ({ podcastData, user }) => {
  const [activeTab, setActiveTab] = useState("episodes")

  return (
    <div className="w-full h-fit border-2 border-blue-500 rounded-xl px-4 xxs:px-8 mb-24 flex flex-col text-lg text-sky-900 dark:text-blue-300">
      {/* tabs */}
      <div className="flex flex-col sm:flex-row gap-x-8 gap-y-2 py-2">
        <span
          onClick={() => setActiveTab("subscriptions")}
          className={
            activeTab === "subscriptions"
              ? "font-bold cursor-pointer"
              : "cursor-pointer"
          }
        >
          Subscriptions
        </span>
        {podcastData ? (
          <span
            onClick={() => setActiveTab("episodes")}
            className={
              activeTab === "episodes"
                ? "font-bold cursor-pointer"
                : "cursor-pointer"
            }
          >
            Episodes
          </span>
        ) : (
          ""
        )}
        {podcastData?.creator === user?.username ? (
          <span
            onClick={() => setActiveTab("earnings")}
            className={
              activeTab === "earnings"
                ? "font-bold cursor-pointer"
                : "cursor-pointer"
            }
          >
            Earnings
          </span>
        ) : (
          ""
        )}
        {podcastData?.creator === user?.username ? (
          <span
            onClick={() => setActiveTab("favorite")}
            className={
              activeTab === "favorite"
                ? "font-bold cursor-pointer"
                : "cursor-pointer"
            }
          >
            Favorite
          </span>
        ) : (
          ""
        )}
      </div>
      {/* content */}
      {activeTab === "subscriptions" ? (
        <div></div>
      ) : activeTab === "episodes" ? (
        <div className="w-full" id="episodes">
          {/* new episode */}
          {podcastData?.creator === user?.username ? (
            <Link
              to={`/profile/${podcastData.creator}/${podcastData.id}/upload-episode`}
              className="w-fit text-center flex gap-x-4 my-4 items-center text-blue-500 dark:text-sky-500 hover:scale-110"
            >
              <img src="/images/plus_icon.svg" width={25} height={25} />
              Upload New Episode
            </Link>
          ) : (
            ""
          )}
          {/* episodes */}
          <div className="flex flex-col items-center justify-between w-full min-h-[400px] pt-4 pb-12">
            {podcastData?.episodes?.length ? (
              <>
                <div className="flex flex-col items-center w-full h-full gap-y-12">
                  {/* pinned if any */}
                  {podcastData.episodes
                    .filter(
                      (episode) => episode.pinned
                    )
                    .map((episode) => (
                      <SingleEpisode
                        user={user}
                        episode={episode}
                        creator={podcastData.creator}
                        podcastId={podcastData.id}
                        podcastTitle={podcastData.title}
                        key={episode.id}
                      />
                    ))}
                  {/* the rest */}
                  {podcastData.episodes.filter(episode=>!episode.pinned).map((episode) => (
                    <SingleEpisode
                      user={user}
                      episode={episode}
                      creator={podcastData.creator}
                      podcastId={podcastData.id}
                      podcastTitle={podcastData.title}
                      key={episode.id}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-x-4 mt-28 w-full">
                  <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
                  <span className="text-xs text-nowrap text-zinc-700 dark:text-zinc-500">
                    No More Episodes
                  </span>
                  <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center gap-x-4 w-full m-auto">
                <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
                <span className="text-sm text-nowrap xxs:text-xl text-zinc-700 dark:text-zinc-500">
                  No Episodes Yet
                </span>
                <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
              </div>
            )}
          </div>
        </div>
      ) : activeTab === "favorite" ? (
        <div className="flex flex-col items-center justify-between w-full min-h-[400px] pt-4 pb-12">
          {user?.favoriteEpisodes?.length ? (
            <div className="flex flex-col items-center w-full h-full gap-y-12">
              {user.favoriteEpisodes.map((episode) => (
                <SingleEpisode
                  user={user}
                  episode={episode}
                  creator={podcastData.creator}
                  podcastId={podcastData.id}
                  key={episode.id}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-x-4 w-full m-auto">
              <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
              <span className="text-sm text-center xxs:text-xl text-zinc-700 dark:text-zinc-500">
                Here you find your favorite episodes
              </span>
              <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
            </div>
          )}
        </div>
      ) : activeTab === "earnings" ? (
        <div className="py-10">
          {/* tokens */}
          <div className="mb-20">
            <h2 className="text-3xl">Tokens:</h2>
            <div>here goes tokens</div>
          </div>
          {/* nft */}
          <div>
            <h2 className="text-3xl">NFT:</h2>
            <div>here goes nft</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
export default Accordion
