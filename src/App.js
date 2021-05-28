import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import India from './India/India'
import World from "./World"

function App() {
    return (
        <Router>
            <Route path="/" component={World} exact />
            <Route path="/india" component={India} />
        </Router>
    )
}

export default App