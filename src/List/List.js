import "./List.css";
import React from "react";
import Book from "../Book/Book";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="search__list">
        <h2>{this.props.listName}</h2>
        <div className="search__list-book">
          {this.props.books.map((book) => {
            return (
              <Book
                key={book.id}
                index={book.id}
                title={book.volumeInfo.title}
                subtitle={book.volumeInfo.subtitle}
                image={book.volumeInfo.imageLinks.smallThumbnail}
                description={book.volumeInfo.description}
                publishedDate={book.volumeInfo.publishedDate}
                authors={book.volumeInfo.authors}
                buttonText={this.props.buttonText}
                handle = {this.props.handle}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default List;
