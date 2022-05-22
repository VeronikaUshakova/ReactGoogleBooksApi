import "./Search.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import List from "../List/List";

class Search extends React.Component {
  constructor(props) {
    super(props);
    let myBooks = [];
    if (localStorage.getItem("myListBooks")) {
      myBooks = JSON.parse(localStorage.getItem("myListBooks"));
    }
    this.state = {
      searchBooks: [],
      searchField: "",
      myListBooks: myBooks,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchField}`;
    let promise = new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.send();
    });
    promise.then((result) => {
      let data = JSON.parse(result.response).items;
      if (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].volumeInfo.description) {
            if (data[i].volumeInfo.description.length > 200) {
              let description =
                data[i].volumeInfo.description.slice(0, 199) + "...";
              data[i].volumeInfo.description = description;
            }
          }
          else {
            data[i].volumeInfo.description = null;
          }
          if (data[i].volumeInfo.authors) {
            data[i].volumeInfo.authors = data[i].volumeInfo.authors.join(", ");
          }
          else {
            data[i].volumeInfo.authors = null;
          }
          if (data[i].volumeInfo.publishedDate) {
            let monthNames = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            let dateString = data[i].volumeInfo.publishedDate;
            let dateArray = dateString.split("-");
            if (dateArray.length === 3) {
              let date = new Date(dateString);
              data[i].volumeInfo.publishedDate = `${date.getDate()} ${
                monthNames[date.getMonth()]
              } ${date.getFullYear()}`;
            }
            if (dateArray.length === 2) {
              data[i].volumeInfo.publishedDate = `${
                monthNames[+dateArray[1] - 1]
              } ${dateArray[0]}`;
            }
          }
          else {
            data[i].volumeInfo.publishedDate = null;
          }
          if(!data[i].volumeInfo.title){
            data[i].volumeInfo.title = null;
          }
          if(!data[i].volumeInfo.subtitle){
            data[i].volumeInfo.subtitle = null;
          }
          if((!data[i].volumeInfo.imageLinks) || (data[i].volumeInfo.imageLinks && !data[i].volumeInfo.imageLinks.smallThumbnail)){
            data[i].volumeInfo.imageLinks = {};
            data[i].volumeInfo.imageLinks.smallThumbnail = null;
          }
        }
        this.setState({ searchBooks: [...data] });
      }
    });
  };

  handleSearch = (event) => {
    this.setState({ searchField: event.target.value });
  };

  handleAdd = (event) => {
    let id = event.target.getAttribute("data-id");
    for (let i = 0; i < this.state.searchBooks.length; i++) {
      if (this.state.searchBooks[i].id === id) {
        this.state.myListBooks.push(this.state.searchBooks[i]);
        let unique = new Set([...this.state.myListBooks]);
        this.setState({ myListBooks: [...unique] });
        localStorage.setItem(
          "myListBooks",
          JSON.stringify(this.state.myListBooks)
        );
      }
    }
  };

  handleRemove = (event) => {
    let id = event.target.getAttribute("data-id");
    for (let i = 0; i < this.state.myListBooks.length; i++) {
      if (this.state.myListBooks[i].id === id) {
        let myBook = [
          ...this.state.myListBooks.slice(0, i),
          ...this.state.myListBooks.slice(i + 1, this.state.myListBooks.length),
        ];
        this.setState({ myListBooks: myBook });
        localStorage.setItem("myListBooks", JSON.stringify(myBook));
      }
    }
  };

  render() {
    return (
      <div className="search">
        <SearchForm
          handleSearch={this.handleSearch}
          handleSubmit={this.handleSubmit}
        />
        <div className="search__block">
          <List
            books={this.state.searchBooks}
            listName="Search result:"
            buttonText="Add"
            handle={this.handleAdd}
          />
          <List
            books={this.state.myListBooks}
            listName="My list:"
            buttonText="Remove"
            handle={this.handleRemove}
          />
        </div>
      </div>
    );
  }
}

export default Search;
