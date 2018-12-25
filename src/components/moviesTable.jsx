import React, { Component } from "react";
import Liked from "../common/liked";
import Table from '../common/table';
class MoviesTable extends Component {
    columns = [
        { path: "title", label: "Title" },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "like",
            content: movie => (
                <Liked like={movie.isLiked} onLiked={() => this.props.onLike(movie)} />
            )
        },
        {
            key: "delete",
            content: movie => (
                <button
                    onClick={() => this.props.onDelete(movie)}
                    className="btn btn-danger btn-sm"
                >
                    {" "}
                    Delete
        </button>
            )
        }
    ];
    render() {
        const { movies, sortColumn, onSort } = this.props;
        return (
            <Table
                columns={this.columns}
                sortColumn={sortColumn}
                onSort={onSort}
                data = {movies}
            />
        );
    }
}
export default MoviesTable;
