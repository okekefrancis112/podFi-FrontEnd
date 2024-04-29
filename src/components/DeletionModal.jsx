const Share = ({
  creator,
  podcastId,
  episodeId,
  podcastTitle,
  episodeTitle,
}) => {
  return (
    <dialog className="deletion-modal modal modal-bottom sm:modal-middle font-futuraMd">
      <div className="modal-box bg-white text-black dark:bg-neutral-800 dark:text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Confirm Deletion</h3>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
        </div>
        <div className="py-12 border-y-2 border-black dark:border-neutral-700 border-opacity-15 text-wrap">
          Are you sure you want to delete episode{" "}
          <span className="font-bold">{episodeTitle}</span> from podcast{" "}
          <span className="font-bold">{podcastTitle}</span> ?
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="mr-2 bg-neutral-500 text-white text-lg px-4 py-2 rounded-lg hover:bg-neutral-600">
              Cancel
            </button>
            <button
              onClick={() => {
                // send delete req of episode
                // make use of creator, podcastId and episodeId
              }}
              className="bg-red-500 text-white text-lg px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
export default Share
