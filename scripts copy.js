// let title = form input
// let year = form input
// let read = form input

const libraryContainer = document.getElementById('library')
const addBookButton = document.getElementById('addBookButton')

class Library {
    myLibrary = [];

    //add book to library array

    addBook(title,author,read) {
        let book = new Book(title,author,read);
        this.myLibrary.push(book);
    };

    //delete book from array

    deleteBook(i) {
        this.myLibrary.splice(i,1);
        this.renderLibrary();
    };

    //render Library on page

    renderLibrary() {

    //clear library

        while (libraryContainer.firstChild) {
            libraryContainer.removeChild(libraryContainer.firstChild);
        }

    // for i of myLibrary, append book markup

        for (let i = 0; i < this.myLibrary.length; i++) {
            let book = this.myLibrary[i];
            libraryContainer.insertAdjacentHTML('afterbegin',book.markup);
        }
            
        }
    };
 


class Book {

    // make a book object

    constructor(title, author, read) {
        this.title = title;
        this.author = author;
        this.read = read;
        this.markup = this.drawBook();
    };

    //draw the markup for a books html element

    drawBook(){

        const markup = `<div id="">
                        <h1>${this.title}</h1>
                        <p>${this.author}</p>
                        <p>Status: ${this.read}</p>
                        </div>
                        `

       return markup 
    };


}


const library = new Library()

library.addBook('temp','temp2',true)

library.addBook('temp3','temp4',false)

library.renderLibrary()

addBookButton.addEventListener('click', function() {
    let title = document.forms['addBookForm']['title'].value;
    let author = document.forms['addBookForm']['author'].value;
    let read = document.forms['addBookForm']['read'].checked;

    if(title === "" || author === ""){/* warning message*/
    }
    else{
        library.addBook(title,author,read);
        library.renderLibrary();
    }
});

console.log(library.myLibrary);

/*for (let i = 0; i < this.myLibrary.length; i++) {
    let book = this.myLibrary[i];
    libraryContainer.insertAdjacentHTML('afterbegin',book.markup);
}*/