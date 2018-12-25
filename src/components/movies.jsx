import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from '../common/pagination';
import { Paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import Genere from '../common/genere';
import MoviesTable from './moviesTable';
import _ from 'lodash';
class Movies extends Component {
    state = {
        movies: [],
        generes: [],
        pageSize: 4,
        pageNo: 1,
        sortColumn: {
            path: 'title',
            order: 'asc'
        }
    }
    componentDidMount() {
        const generes = [{ _id: '', name: 'All Genre' }, ...getGenres()]
        this.setState({
            movies: getMovies(),
            generes: generes
        })
    }

    getPagedData = ()=>{
        const { movies: allMovies, selectedGenre, sortColumn } = this.state;
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = Paginate(sorted, this.state.pageNo, this.state.pageSize);
        return {totalCount:filtered.length,data:movies}
    }
    render() {
        const { length: count } = this.state.movies;
        const { movies: allMovies, selectedGenre, sortColumn } = this.state;
        if (count === 0) return <p>There is no movies in the List</p>
        const {totalCount,data:movies} = this.getPagedData();
        return (
            <div className="row">
                <div className="col-3">
                    <Genere items={this.state.generes} onItemSelect={this.handleGenereSelect}
                        selectedItem={selectedGenre}
                    />
                </div>
                <div className="col">
                    <p>There is {totalCount} movies in the List</p>
                    <MoviesTable movies={movies}
                        onDelete={this.deleteMovie}
                        onLike={this.toggleLiked}
                        onSort={this.handleSort}
                        sortColumn = {sortColumn}
                    />
                    <Pagination itemsCount={totalCount}
                        pageSize={this.state.pageSize} onPageChanges={this.pageChangeHandled}
                        currentPage={this.state.pageNo}
                    />
                </div>
            </div>

        )

    }
    deleteMovie = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies: movies });
    };

    toggleLiked = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movie };
        movies[index].isLiked = !movies[index].isLiked;
        this.setState({ movies: movies });
    };
    pageChangeHandled = (page) => {
        this.setState({ pageNo: page, });
    };

    handleGenereSelect = (genre) => {
        this.setState({ selectedGenre: genre, pageNo: 1 });
    }
    handleSort = (sortColumn) => {
       
        this.setState({sortColumn:sortColumn});
    }
}

export default Movies;