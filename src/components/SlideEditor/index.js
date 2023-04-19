import './index.css'
import {Component} from 'react'

class SlideEditor extends Component {
  state = {editHeading: false, editDescription: false}

  editHeading = event => {
    console.log(event)
    if (event.type === 'click') {
      this.setState({editHeading: true})
    }
  }

  editHeadingFalse = updateList => {
    this.setState({editHeading: false})
    updateList()
  }

  editDescription = event => {
    console.log(event)
    if (event.type === 'click') {
      this.setState({editDescription: true})
    }
  }

  editDescriptionFalse = updateList => {
    this.setState({editDescription: false})
    updateList()
  }

  render() {
    const {
      heading,
      description,
      currentSlideItem,
      isEditor,
      onHeadingInputChange,
      onDescriptionInputChange,
      updateList,
    } = this.props
    const {editHeading, editDescription} = this.state
    const HeadingSize = isEditor ? 'font-32' : 'font-16'
    const DescriptionSize = isEditor ? 'font-16' : 'font-12'
    return (
      <div className="slide-bg-container">
        {editHeading ? (
          <input
            type="text"
            value={heading}
            onChange={onHeadingInputChange}
            onBlur={() => this.editHeadingFalse(updateList)}
          />
        ) : (
          <h1 className={`${HeadingSize}`} onClick={this.editHeading}>
            {currentSlideItem.heading}
          </h1>
        )}

        {editDescription ? (
          <input
            type="text"
            value={description}
            onChange={onDescriptionInputChange}
            onBlur={() => this.editDescriptionFalse(updateList)}
          />
        ) : (
          <p className={`${DescriptionSize}`} onClick={this.editDescription}>
            {currentSlideItem.description}
          </p>
        )}
      </div>
    )
  }
}
export default SlideEditor
