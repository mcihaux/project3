import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Movies extends Component {
  state = {
    Movies: [],
    title: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadMovies();
  }

  loadMovies = () => {
    API.getMovies()
      .then(res =>
        this.setState({ Movies: res.data, title: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteMovie = id => {
    API.deleteMovie(id)
      .then(res => this.loadMovies())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.saveMovie({
        title: this.state.title,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadMovies())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Movie Should I Watch?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Movies On My List</h1>
            </Jumbotron>
            {this.state.Movies.length ? (
              <List>
                {this.state.Movies.map(movie => (
                  <ListItem key={movie._id}>
                    <Link to={"/movie/" + movie._id}>
                      <strong>
                        {movie.title}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteMovie(movie._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Movies;
