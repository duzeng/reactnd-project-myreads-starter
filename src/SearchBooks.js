import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

import * as BooksAPI from './BooksAPI';

export default class SearchBooks extends Component {
    constructor(props){
        super(props);
        this.state={
            searchText:'',
            books:[]
        }
    }
    componentDidMount(){

    }

    changeSearchTextHandler=(text)=>{
        this.setState({ searchText:text });

        if (text){
            BooksAPI.search(text).then(books=> {
                if (!books) return;
                if (books.error && books.error==='empty query') return;
                this.setState({books})
            } );
        }

    }

    render() {
        const { books }=this.state;
        console.log(books);
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
                        {books.map((book,index)=>(
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