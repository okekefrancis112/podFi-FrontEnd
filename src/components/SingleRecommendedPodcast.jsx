const SingleRecommendedPodcast = ({podcast}) => {
  return (
    <div className="w-full bg-zinc-300 dark:bg-neutral-800 h-20 rounded-2xl overflow-hidden flex">
      <img
        src={podcast.imageUrl}
        className="w-1/3 h-full object-cover object-center"
      />
      <div className="flex flex-col w-2/3 text-xs text-blue-500 dark:text-blue-300 p-1 px-2">
        <h2 className="truncate text-lg">Title</h2>
        {/* listening */}
        <div className="flex items-center gap-x-1">
          <svg
            className="fill-[#0A1640] dark:fill-blue-500 w-4"
            width="26"
            height="22"
            viewBox="0 0 26 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.02988 10.5926C9.34824 10.5926 10.6126 10.0346 11.5448 9.04134C12.477 8.04809 13.0008 6.70096 13.0008 5.2963C13.0008 3.89163 12.477 2.5445 11.5448 1.55125C10.6126 0.558001 9.34824 0 8.02988 0C6.71152 0 5.44716 0.558001 4.51494 1.55125C3.58272 2.5445 3.059 3.89163 3.059 5.2963C3.059 6.70096 3.58272 8.04809 4.51494 9.04134C5.44716 10.0346 6.71152 10.5926 8.02988 10.5926ZM16.7282 18.977C17.5388 19.3307 18.5697 19.5556 19.882 19.5556C26 19.5556 26 14.6667 26 14.6667C26 14.0186 25.7585 13.3971 25.3286 12.9388C24.8986 12.4804 24.3155 12.2227 23.7073 12.2222H16.6287C17.2298 12.9979 17.5908 13.9904 17.5908 15.0741V15.6542C17.5877 15.7914 17.579 15.9285 17.5648 16.0649C17.4616 17.0831 17.1767 18.0712 16.7282 18.977ZM23.7073 6.51852C23.7073 7.59903 23.3044 8.63529 22.5873 9.39932C21.8702 10.1634 20.8976 10.5926 19.8835 10.5926C18.8694 10.5926 17.8968 10.1634 17.1797 9.39932C16.4626 8.63529 16.0598 7.59903 16.0598 6.51852C16.0598 5.43801 16.4626 4.40175 17.1797 3.63771C17.8968 2.87368 18.8694 2.44444 19.8835 2.44444C20.8976 2.44444 21.8702 2.87368 22.5873 3.63771C23.3044 4.40175 23.7073 5.43801 23.7073 6.51852ZM0 15.4815C0 14.6171 0.322287 13.7881 0.895961 13.1768C1.46964 12.5656 2.24771 12.2222 3.059 12.2222H13.0008C13.8121 12.2222 14.5901 12.5656 15.1638 13.1768C15.7375 13.7881 16.0598 14.6171 16.0598 15.4815C16.0598 15.4815 16.0598 22 8.02988 22C0 22 0 15.4815 0 15.4815Z" />
          </svg>

          <h3 className="truncate">{podcast.listenings} Listening</h3>
        </div>
        {/* likes */}
        <div className="flex items-center gap-x-1">
          <svg
            className="fill-[#0A1640] dark:fill-blue-500 w-4"
            width="25"
            height="21"
            viewBox="0 0 25 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.033 0C15.6511 0 13.6159 1.63219 12.4977 2.75747C11.3795 1.63219 9.34886 0 6.96818 0C2.86477 0 0 2.74982 0 6.68609C0 11.0233 3.55795 13.8267 7 16.5382C8.625 17.8197 10.3068 19.1438 11.5966 20.6122C11.8136 20.858 12.1318 21 12.4659 21H12.5318C12.867 21 13.1841 20.8569 13.4 20.6122C14.692 19.1438 16.3727 17.8186 17.9989 16.5382C21.4398 13.8278 25 11.0244 25 6.68609C25 2.74982 22.1352 0 18.033 0Z" />
          </svg>

          <h3 className="truncate">{podcast.likes} likes</h3>
        </div>
      </div>
    </div>
  )
}
export default SingleRecommendedPodcast