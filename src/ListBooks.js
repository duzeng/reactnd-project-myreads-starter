import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book'; 
import books from './data';
require('./utils/array-extensions');

function splitWords(s){
    const matcher=/[A-Za-z][^A-Z]*[a-z]+?/g;
    let result,thisArr=[]; 
    while (result=matcher.exec(s)){  
        thisArr.push([result[0][0].toLocaleUpperCase(),...result[0].substring(1)].join(''))
    }
    return thisArr.join(' ')
 
}

export default class ListBooks extends Component {
    render() {
        const groups=books.groupBy('shelf');
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {Object.entries(groups).map(keyvalue=>
                            {
                                const [key,value]=keyvalue; 
                                const shelfTitle=splitWords(key)
                                return ( 
                                    <div className="bookshelf" key={key}>
                                        <h2 className="bookshelf-title">{shelfTitle}</h2>
                                        <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {value.map((book,index)=>(
                                                <li key={index}>
                                                    <Book book={book}/>
                                                </li>
                                            ))} 
                                        </ol>
                                        </div>
                                    </div>
                                )
                            })
                        } 
                    </div>
                </div>
                <div className="open-search">
                    {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}