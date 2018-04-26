import axios from "axios";

export default {
  // Gets all books
  getMovies: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getMovie: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteMovie: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveMovie: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
