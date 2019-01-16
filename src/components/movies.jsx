import React, { Component } from 'react';
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';

class Movies extends Component {
  state = { 
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: 'title', order: 'asc' }
   };

  componentDidMount() {
    const genres = [{ _id: "", name: 'All Genres'}, ...getGenres()];
     this.setState({ movies: getMovies(), genres });
   };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
   };

  handleLike = movie => {
    //we have to clone out array of movies, as we dont want to modify those objects directly
    const movies = [...this.state.movies];
    //we neet to find index of that object (that we want to modify-like)
    const index = movies.indexOf(movie);
    //here we go to moveis of index and set this to a new object, we clone it with spread operator
    movies[index] = { ...movies[index]};
    //now we change the liked property - we toggle it
    movies[index].liked = !movies[index].liked;
    //we call setState and pass a new movies array
    this.setState({ movies });
    };

  handlePageChange = page => {
    this.setState({ currentPage : page});
  }

  handleGenreSelect = genre => {
    this.setState( {selectedGenre: genre, currentPage: 1 } );
  };

  handleSort = sortColumn => {
    //we update the state based on this new sortColumn object
    this.setState({ sortColumn });
  };

  //all the logic for aplying sorting, filtering, pagination is encapsulated in this method
  getPagedData = () => {
    const filtered = this.state.selectedGenre && this.state.selectedGenre._id 
      ? this.state.movies.filter(m => m.genre._id === this.state.selectedGenre._id) 
      : this.state.movies;

    const sorted = _.orderBy(filtered, [this.state.sortColumn.path], [this.state.sortColumn.order]);
    const movies = paginate(sorted, this.state.currentPage, this.state.pageSize);

    return { totalCount: filtered.length, data: movies };
  }
  
  render() { 
    const { length: count } = this.state.movies;
    //with line below we can extract this.state from Pagination component down below(from pageSize and currentPage)...
    // const { pageSize, currentPage } = this.state;
    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup 
            items={this.state.genres} 
            //we no longer need these lines below as we set defaultProps in listGroup file
            // textProperty= "name"
            // valueProperty="_id"
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect} 
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database. </p>
          <MoviesTable 
            movies={movies} 
            sortColumn={this.state.sortColumn}
            onLike={this.handleLike} 
            onDelete={this.handleDelete}
            onSort={this.handleSort} 
          />
          <Pagination 
            itemsCount={totalCount} 
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange} 
          />
        </div>
      </div>
    );
  }
}
 
export default Movies;

