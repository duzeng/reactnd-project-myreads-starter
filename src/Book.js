import React, { Component } from 'react';

export default class Book extends Component {
    render() {
        const { title,authors,imageLinks}=this.props.book
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: imageLinks.width, height: imageLinks.height, backgroundImage: `url("${imageLinks.thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors.join(' ')}</div>
            </div>
        );
    }
}