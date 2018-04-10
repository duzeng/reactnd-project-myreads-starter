import React from 'react'
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks'; 

class BooksApp extends React.Component {
    state = { 
        books:[]
    }

    componentDidMount(){
        this.getAllBooks();
    }

    /**
     * when in home page,
     */
    refreshHandler=(responseData)=>{  
        const { books }=this.state;
        //change book's shelf
        Object.entries(responseData).forEach(item=>{ 
            const [key,arr]=item;
            if (arr.length===0) return;
            arr.forEach(id=>{
                const book=books.find(item=>item.id===id);
                if (!book) return; 
                if (book.shelf!==key) {
                    book.shelf=key;
                }
            });  
        });
        
        //delete that not belonging to any shelf
        const filterBooks=books.filter(item=>{
            const ids= responseData[item.shelf];
            return ids.includes(item.id); 
        });

        this.setState({books:filterBooks});
    } 

    /**
     * get all books via BooksAPI again
     */
    repullHandler=()=>{ 
        this.getAllBooks();
    }

    getAllBooks(){
        BooksAPI.getAll().then(books=>this.setState({books}));
    }
    
    render() {
        const { books }=this.state;
        return (
            <div className="app">
                <Route path="/search" render={()=>(
                    <SearchBooks books={books} onRefreshBooks={this.repullHandler}/>
                )} />
                <Route exact path="/" render={()=>(
                    <ListBooks books={books} onRefreshBooks={this.refreshHandler}/>
                )} /> 
            </div>
        )
    }
}

export default BooksApp
