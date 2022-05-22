import "./Book.css";
import React from "react";

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="search__book book">
        <div className="book__text-main">
          {this.props.title ? (
            <h3 className="book__title">{this.props.title}</h3>
          ) : (
            ""
          )}
          {this.props.subtitle ? (
            <h5 className="book__subtitle">{this.props.subtitle}</h5>
          ) : (
            ""
          )}
        </div>
        <div className="book__details">
          <div className="book__block-image">
            {this.props.image ? (
              <img
                className="book__image"
                src={this.props.image}
                alt="book"
              ></img>
            ) : (
              ""
            )}
          </div>
          <div className="book_text-additional">
            {this.props.description ? (
              <p className="book__description">{this.props.description}</p>
            ) : (
              ""
            )}

            {this.props.publishedDate ? (
              <p className="book__date">{this.props.publishedDate}</p>
            ) : (
              ""
            )}

            {this.props.authors ? (
              <p className="book__authors">{this.props.authors}</p>
            ) : (
              ""
            )}
            <button
              className="book__button"
              data-id={this.props.index}
              onClick={this.props.handle}
            >
              {this.props.buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Book;
