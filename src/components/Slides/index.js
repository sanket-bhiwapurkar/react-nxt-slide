import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import NavBar from '../NavBar'
import SlideItem from '../SlideItem'
import SlideEditor from '../SlideEditor'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class Slides extends Component {
  state = {
    activeSlideId: initialSlidesList[0].id,
    SlidesList: initialSlidesList,
    headingInput: initialSlidesList[0].heading,
    descriptionInput: initialSlidesList[0].description,
  }

  updateActiveSlide = id => {
    const {SlidesList} = this.state
    const currentSlideItem = [
      ...SlidesList.filter(eachSlide => id === eachSlide.id),
    ][0]
    this.setState({
      activeSlideId: currentSlideItem.id,
      headingInput: currentSlideItem.heading,
      descriptionInput: currentSlideItem.description,
    })
  }

  onHeadingInputChange = event => {
    this.setState({headingInput: event.target.value})
  }

  onDescriptionInputChange = event => {
    this.setState({descriptionInput: event.target.value})
  }

  updateList = () => {
    const {
      activeSlideId,
      SlidesList,
      headingInput,
      descriptionInput,
    } = this.state
    const updatedList = SlidesList.map(eachSlide =>
      activeSlideId === eachSlide.id
        ? {...eachSlide, heading: headingInput, description: descriptionInput}
        : {...eachSlide},
    )
    this.setState({SlidesList: updatedList})
  }

  onClickAddSlide = () => {
    const {activeSlideId, SlidesList} = this.state
    const newId = uuidv4()
    const newSlide = {
      id: newId,
      heading: 'Heading',
      description: 'Description',
    }
    const index = SlidesList.findIndex(
      eachSlide => eachSlide.id === activeSlideId,
    )
    const initialList = SlidesList.slice(0, index + 1)
    const endList = SlidesList.slice(index + 1, SlidesList.length)
    console.log(index)
    this.setState({
      SlidesList: [...initialList, newSlide, ...endList],
      activeSlideId: newId,
      headingInput: 'Heading',
      descriptionInput: 'Description',
    })
  }

  render() {
    const {
      SlidesList,
      activeSlideId,
      headingInput,
      descriptionInput,
    } = this.state
    return (
      <div className="bg-container">
        <NavBar />
        <button
          className="add-slide-btn"
          type="button"
          onClick={this.onClickAddSlide}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
            alt="new plus icon"
          />
          <p>New</p>
        </button>
        <div className="body">
          <ol className="slide-panel">
            {SlidesList.map(eachSlide => (
              <SlideItem
                key={eachSlide.id}
                slideDetails={eachSlide}
                updateActiveSlide={this.updateActiveSlide}
                isActive={eachSlide.id === activeSlideId}
                index={SlidesList.findIndex(
                  eachItem => eachItem.id === eachSlide.id,
                )}
              />
            ))}
          </ol>
          <SlideEditor
            isEditor="true"
            currentSlideItem={
              [
                ...SlidesList.filter(
                  eachSlide => activeSlideId === eachSlide.id,
                ),
              ][0]
            }
            heading={headingInput}
            description={descriptionInput}
            onHeadingInputChange={this.onHeadingInputChange}
            onDescriptionInputChange={this.onDescriptionInputChange}
            updateList={this.updateList}
          />
        </div>
      </div>
    )
  }
}
export default Slides
