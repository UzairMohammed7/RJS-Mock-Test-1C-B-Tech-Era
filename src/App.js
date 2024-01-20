import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import CourseDetails from './components/CourseDetails'
import Header from './components/Header'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
