import {Component} from 'react'
import Loader from 'react-loader-spinner'

import AllCourses from '../AllCourses'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    myCourses: [],
  }

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    console.log(response)

    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        myCourses: updatedData,
      })
    }
    if (response.ok !== true) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-spinner">
      <Loader type="TailSpin" color="#4656a1" height={40} width={40} />
    </div>
  )

  renderSuccessView = () => {
    const {myCourses} = this.state

    return (
      <>
        <ul className="course-list">
          {myCourses.map(eachCourse => (
            <AllCourses key={eachCourse.id} eachCourse={eachCourse} />
          ))}
        </ul>
      </>
    )
  }

  onRetry = () => {
    this.getCourses()
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderCourses = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="main-container">
          <h1>Courses</h1>
          {this.renderCourses()}
        </div>
      </>
    )
  }
}

export default Home
