// let title = form input
// let year = form input
// let read = form input

const libraryContainer = document.getElementById("library");
const addBookButton = document.getElementById("addBookButton");

class Library {
  myLibrary = [];

  //add book to library array

  addBook(title, author, read) {
    let book = new Book(title, author, read);
    this.myLibrary.push(book);
  }

  //delete book from array

  deleteBook(i) {
    this.myLibrary.splice(i, 1);
    this.renderLibrary();
  }

  //render Library on page

  renderLibrary() {
    //clear library

    while (libraryContainer.firstChild) {
      libraryContainer.removeChild(libraryContainer.firstChild);
    }

    // render books

    this.renderBookElements();
  }

  renderBookElements() {
    // draw and append markup and buttons for each book in library

    for (let i = 0; i < this.myLibrary.length; i++) {
      let book = this.myLibrary[i];
      let index = this.myLibrary.indexOf(book);

      let bookContainer = document.createElement("div");
      bookContainer.setAttribute("class", "book");
      let deleteButton = document.createElement("button");
      deleteButton.setAttribute("class", "btn");
      deleteButton.textContent = "Remove";
      let markReadIcon = document.createElement("img");
      markReadIcon.setAttribute("class","markReadIcon");
        if(book.read == true){
      markReadIcon.src = "./img/book.svg";}
            else {markReadIcon.src = "./img/book-open.svg"
        };
    

      bookContainer.appendChild(deleteButton);
      bookContainer.appendChild(markReadIcon);
      bookContainer.insertAdjacentHTML("afterbegin", book.markup);
      libraryContainer.appendChild(bookContainer);
      deleteButton.addEventListener("click", () => {
        this.deleteBook(index);
      });
    }
  }
}

class Book {
  // make a book object

  constructor(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.markup = this.drawBook();
  }

  //draw the markup for a books html element

  drawBook() {
    let readBool = () => {
      if (this.read == true) {
        return "finished";
      } else {
        return "not finished";
      }
    };

    const markup = `<div id="">
                        <h1>${this.title}</h1>
                        <h4>${this.author}</h4>
                        <p>You have ${readBool()} this book.</p>
                        </div>
                        `;

    return markup;
  }
}

const library = new Library();

//default books

library.addBook("The Great Gatsby", "F. Scott Fitzgerald", true);

library.addBook("Nineteen Eighty-Four", "George Orwell", false);

library.renderLibrary();

//add book listener

addBookButton.addEventListener("click", function () {
  let title = document.forms["addBookForm"]["title"].value;
  let author = document.forms["addBookForm"]["author"].value;
  let read = document.forms["addBookForm"]["read"].checked;

  if (title === "" || author === "") {
    alert("Please enter a title and author to add a new book to the library");
  } else {
    library.addBook(title, author, read);
    library.renderLibrary();
    title.value = "";
    author.value = "";
    read.value = "";
  }
});
