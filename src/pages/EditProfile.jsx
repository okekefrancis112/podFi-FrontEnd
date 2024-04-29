import { useNavigate, useParams } from "react-router-dom"

const EditProfile = ({user}) => {
  // ensure current user is the creator
  const {creatorUsername} = useParams()
  if (creatorUsername !== user.username){
    return (
      <p className=" dark:text-white pt-96 text-center min-h-screen text-3xl">
        NOT ALLOWED OPERATION
      </p>
    )
  }
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        // update both username and bio 
        navigate(`/profile/${user.username}`)
    }
  return (
    <div className="pt-36 font-futuraMd min-h-screen relative overflow-hidden px-4 xs:px-10 xl:px-20 z-0">
      {/* bg */}
      <div className="w-fit h-fit absolute -top-96 -right-[450px] -z-10">
        <img src="/images/profile_bg.svg" width={1000} height={1000} />
      </div>
      {/* page content */}
      <form
      onSubmit={handleSubmit}
      method="post"
        action=""
        className="mt-20 flex flex-col items-center gap-y-10 py-4 px-0 sm:px-4 lg:px-20 text-[#0A1640] dark:text-white text-lg "
      >
        {/* username */}
        <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-start w-full">
          <label
            htmlFor="username"
            className="w-44 min-w-44 text-left md:text-right text-nowrap"
          >
            Username:
          </label>
          <input
            name="username"
            id="username"
            type="text"
            defaultValue={user.username}
            className="bg-white dark:bg-neutral-800 border-2 border-blue-500 bg-transparent rounded-xl outline-cyan-500 w-full px-3 py-1"
          />
        </div>
        {/* bio */}
        <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-start w-full">
          <label
            htmlFor="bio"
            className="w-44 min-w-44 text-left md:text-right text-nowrap"
          >
            Bio:
          </label>
          <textarea
            name="bio"
            id="bio"
            defaultValue={user.bio}
            className="bg-white dark:bg-neutral-800 border-2 border-blue-500 bg-transparent rounded-xl outline-cyan-500 w-full min-h-24 px-3 py-1"
          />
        </div>
        {/* update */}
        <button
          type="submit"
          className="my-8 w-fit bg-[#0A1640] hover:bg-slate-900 text-white rounded-xl px-8 py-4"
        >
          Update
        </button>
      </form>
    </div>
  )
}
export default EditProfile