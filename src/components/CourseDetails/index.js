import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    myCourseDetails: {},
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    console.log(response)

    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = {
        id: fetchedData.course_details.id,
        name: fetchedData.course_details.name,
        imageUrl: fetchedData.course_details.image_url,
        description: fetchedData.course_details.description,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        myCourseDetails: updatedData,
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
    const {myCourseDetails} = this.state
    const {name, imageUrl, description} = myCourseDetails

    return (
      <div className="course-detail-container">
        <img src={imageUrl} alt={name} className="course-detail-img" />
        <div className="course-detail-desc">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  onRetry = () => {
    this.getCourseDetails()
  }

  renderFailureView = () => (
    <div>
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

  renderCourseDetails = () => {
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
        <div>{this.renderCourseDetails()}</div>
      </>
    )
  }
}

export default CourseDetails
