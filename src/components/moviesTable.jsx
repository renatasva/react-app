import React, { Component } from 'react';
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      //below, in 'to' we pass a template literal in a back-ticks - we use them to dynamicaly insert values into a string.
      content: movie => <Link className="link-to" to={`/holidays/${movie._id}`}>{movie.title}</Link> },
    { path: 'genre.name', label: 'Holiday Type' },
    { path: 'numberInStock', label: 'Duration (nights)' },
    { path: 'dailyRentalRate', label: 'Price (£, pp)' },
    { key: "like",
      content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />}
  ];

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm button-delete"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    //we get the current user
    const user = auth.getCurrentUser();
    if (user && user.isAdmin)
      this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      < Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
