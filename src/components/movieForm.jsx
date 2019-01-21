import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from '../services/genreService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label('Title'),
    genreId: Joi.string()
      .required()
      .label('Type'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Duration (nights)'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(5000)
      .label('Price (£, pp)')
  };

  async populateGenres() {
    const {data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    //checking if movie id is correct we set new state, if catch an (ex)ception - redirects to 404 page
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = async () => {
    //call the server
    await saveMovie(this.state.data);

    this.props.history.push("/holidays");
  };

  render() {
    return  (
    <div className="m-5">
    	<h2>New Holiday Package</h2>
      <form onSubmit={this.handleSubmit}>
        {this.renderInput('title', 'Title')}
        {this.renderSelect('genreId', 'Type', this.state.genres)}
        {this.renderInput('numberInStock', 'Duration (nights)', 'number')}
        {this.renderInput('dailyRentalRate', 'Price (£, pp)')}
        {this.renderButton('Save')}
      </form>
    </div>
    );
  }
}

export default MovieForm;

// const MovieForm = ({ match, history }) => {
//   return (
//     <div>
//       <h1>Movie Form {match.params.id} </h1>
//       <button className="btn btn-primary" onClick={() => history.push('/movies')}>Save</button>
//     </div>
//    );
// }

// export default MovieForm;
