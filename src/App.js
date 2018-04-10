import React from 'react'
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks'; 

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        //showSearchPage: false
        books:[]
    }

    componentDidMount(){
        this.getAllBooks();
    }

    refreshHandler=(data)=>{ 
        const { books }=this.state;
        Object.entries(data).forEach(item=>{
            debugger
            const [key,arr]=item;
            if (arr.length===0) return;
            arr.map(id=>{
                const book=books.find(item=>item.id===id);
                if (!book) return; 
                if (book.shelf!==key) {
                    book.shelf=key
                }
            })  
        })
        this.setState({books});
    } 

    getAllBooks(){
        BooksAPI.getAll().then(books=>this.setState({books}));
    }
    
    render() {
        const { books }=this.state;
        return (
            <div className="app">
                <Route path="/search" render={()=>(
                    <SearchBooks books={books}/>
                )} />
                <Route exact path="/" render={()=>(
                    <ListBooks books={books} onRefreshBooks={this.refreshHandler}/>
                )} /> 
            </div>
        )
    }
}

export default BooksApp
