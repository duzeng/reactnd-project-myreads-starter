import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

import * as BooksAPI from './BooksAPI';

export default class SearchBooks extends Component {

    static propTypes={
        books:PropTypes.array.isRequired
    } 
    constructor(props){
        super(props);
        this.state={
            searchText:'',
            searchedBooks:[]
        }
    } 

    changeSearchTextHandler=(text)=>{
        this.setState({ searchText:text });

        if (text){
            BooksAPI.search(text).then(data=> {
                if (!data) return;
                if (data.error && data.error==='empty query') return;
                this.setState({searchedBooks:data})
            } );
        }

    }

    render() {
        const { searchedBooks }=this.state; 
        const { books }=this.props;
        searchedBooks.map(item=>{
            const result=books.find(book=> book.id===item.id);
            if (!result) return;
            item.shelf=result.shelf;
        })
        return (
            <div className="search-books">
                <div className="search-books-bar">
                {/* <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a> */}
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" 
                        value={this.state.searchText}
                        onChange={(event)=>this.changeSearchTextHandler(event.target.value)}/>

                </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchedBooks.map((book,index)=>(
                            <li key={index}>
                                <Book book={book}/>
                            </li>
                        ))} 
                    </ol>
                </div>
            </div>
        )
    }
}