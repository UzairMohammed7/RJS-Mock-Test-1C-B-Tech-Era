import {Link} from 'react-router-dom'
import './index.css'

const AllCourses = props => {
  const {eachCourse} = props
  const {id, name, logoUrl} = eachCourse

  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="course-list-style">
        <img src={logoUrl} alt={name} />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default AllCourses
