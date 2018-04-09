import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

const options=[
    { label:'Currently Reading',value:'currentlyReading'},
    { label:'Want to Read',value:'wantToRead'},
    { label:'Read',value:'read'},
    { label:'None',value:'none'}
]
export default class Book extends Component {

    changeShelfHandler=(book,shelf)=>{ 
        BooksAPI.update(book,shelf).then(data=>console.log(data))
    }
    render() {
        const { title,authors,imageLinks,shelf='none' }=this.props.book;
        const { width=128,height=193 }=imageLinks;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: width , height: height, backgroundImage: `url('${imageLinks.thumbnail}')` }}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={(event)=>this.changeShelfHandler(this.props.book,event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            {options.map(item=>(
                                <option key={item.value} value={ item.value }>{ item.label }</option>
                            ))}
                            {/* <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option> */}
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{Array.isArray(authors) && authors.join(' ')}</div>
            </div>
        );
    }
}