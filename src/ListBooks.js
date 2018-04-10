import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';  
import { groupBy } from './utils/array-extensions';

function splitWords(s){
    const matcher=/[A-Za-z][^A-Z]*[a-z]+?/g;
    let result,thisArr=[];  
    while (result=matcher.exec(s)){  
        thisArr.push([result[0][0].toLocaleUpperCase(),...result[0].substring(1)].join(''));
    } 

    return thisArr.join(' ');
 
}

export default class ListBooks extends Component {

    static propTypes={
        books:PropTypes.array.isRequired,
        onRefreshBooks:PropTypes.func
    } 
 
    refreshHandler=(data)=>{ 
        const { onRefreshBooks }=this.props;
        onRefreshBooks && onRefreshBooks(data);
    } 
   
    render() {

        const { books }=this.props;
        const groups=groupBy(books,'shelf');

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
                                                    <Book book={book} onRefresh={this.refreshHandler}/>
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
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}