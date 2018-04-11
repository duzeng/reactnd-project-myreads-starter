import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

const options=[
    { label:'Currently Reading',value:'currentlyReading'},
    { label:'Want to Read',value:'wantToRead'},
    { label:'Read',value:'read'},
    { label:'None',value:'none'}
]
// export default class Book extends Component {

//     static propTypes={
//         book:PropTypes.object.isRequired,
//         onRefresh:PropTypes.func
//     }

//     /**
//      * change the book's shelf
//      */
//     changeShelfHandler=(book,shelf)=>{ 
//         const { onRefresh }=this.props;
//         BooksAPI.update(book,shelf).then(data=> onRefresh && onRefresh(data))
//     }

//     render() { 
//         const { title,authors,imageLinks={},shelf='none' }=this.props.book;
//         const { thumbnail='' }=imageLinks; 
//         return (
//             <div className="book">
//                 <div className="book-top">
//                     <div className="book-cover" style={{ width: 128 , height: 193, backgroundImage: `url('${thumbnail}')` }}></div>
//                     <div className="book-shelf-changer">
//                         <select value={shelf} onChange={(event)=>this.changeShelfHandler(this.props.book,event.target.value)}>
//                             <option value="none" disabled>Move to...</option>
//                             {options.map(item=>(
//                                 <option key={item.value} value={ item.value }>{ shelf===item.value ? '√  '+item.label:item.label }</option>
//                             ))}
//                             {/* <option value="currentlyReading">Currently Reading</option>
//                             <option value="wantToRead">Want to Read</option>
//                             <option value="read">Read</option>
//                             <option value="none">None</option> */}
//                         </select>
//                     </div>
//                 </div>
//                 <div className="book-title">{title}</div>
//                 <div className="book-authors">{Array.isArray(authors) && authors.join(' ')}</div>
//             </div>
//         );
//     }
// }


const Book=({ book, onRefresh})=>{
    const changeShelfHandler=(book,shelf)=>{  
        BooksAPI.update(book,shelf).then(data=> onRefresh && onRefresh(data))
    }

    const { title,authors,imageLinks={},shelf='none' }=book;
    const { thumbnail='' }=imageLinks; 
    
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128 , height: 193, backgroundImage: `url('${thumbnail}')` }}></div>
                <div className="book-shelf-changer">
                    <select value={shelf} onChange={(event)=>changeShelfHandler(book,event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        {options.map(item=>(
                            <option key={item.value} value={ item.value }>{ shelf===item.value ? '√  '+item.label:item.label }</option>
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

Book.propTypes= {
    book:PropTypes.object.isRequired,
    onRefresh:PropTypes.func
}

export default Book;