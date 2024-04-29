import "@particle-network/connect-react-ui/dist/index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Earning from "./pages/Earning"
import AdsMarketplace from "./pages/AdsMarketplace"
import SinglePodcastPage from "./pages/SinglePodcastPage"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import CreateLivestream from "./pages/CreateLivestream"
import Error from "./pages/Error"
import Layout from "./pages/Layout"
import CreatePodcast from "./pages/CreatePodcast"
import UploadEpisode from "./pages/UploadEpisode"
import { useState } from "react"
import { users } from "./demoData"

function App() {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  )
  const [user, setUser] = useState(users[1])
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout user={user} dark={dark} setDark={setDark} />}
        >
          <Route index element={<Home />} />
          <Route path="/earning" element={<Earning />} />
          <Route
            path="/ads-marketplace"
            element={<AdsMarketplace user={user} dark={dark} />}
          />
          <Route
            path="/ads-marketplace/:podcastId"
            element={<SinglePodcastPage user={user} />}
          />
          <Route
            path="/profile/:creatorUsername/create-podcast"
            element={<CreatePodcast user={user} />}
          />
          <Route
            path="/profile/:creatorUsername"
            element={<Profile user={user} />}
          />
          <Route
            path="/profile/:creatorUsername/edit"
            element={<EditProfile user={user} />}
          />
          <Route
            path="/profile/:creatorUsername/:activePodcastId"
            element={<Profile user={user} />}
          />
          <Route
            path="/profile/:creatorUsername/:activePodcastId/upload-episode"
            element={<UploadEpisode user={user} />}
          />
          <Route
            path="/profile/:creatorUsername/:activePodcastId/:activeEpisodeId"
            element={<Profile user={user} />}
          />
          <Route path="/create-livestream" element={<CreateLivestream />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
