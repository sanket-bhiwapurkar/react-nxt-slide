import './index.css'

const SlideItem = props => {
  const {slideDetails, updateActiveSlide, index, isActive} = props
  const {id, heading, description} = slideDetails
  const bgColor = isActive ? 'active-slide' : ''
  return (
    <li
      testid={`slideTab${index + 1}`}
      onClick={() => updateActiveSlide(id)}
      className={`slide-btn ${bgColor}`}
    >
      <p>{index + 1}</p>
      <div className="slide-thumbnail">
        <h1>{heading}</h1>
        <p>{description}</p>
      </div>
    </li>
  )
}
export default SlideItem
