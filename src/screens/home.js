import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Favorites from './favorites'
import Library from './library'
import Trending from './trending'
import Feed from './feed'
import Player from './player'
function Home() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Library/>} />
                <Route path="/feed" element={<Feed/>} />
                <Route path="/trending" element={<Trending/>} />
                <Route path="/player" element={<Player/>} />
                <Route path="/favorites" element={<Favorites/>} />
            </Routes>
        </Router>
        
    )
}

export default Home
