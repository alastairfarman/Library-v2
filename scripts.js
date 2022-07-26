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

  //edit

  editBook(i, prop, newvalue) {
    this.myLibrary[i][prop] = newvalue;
    console.log(i, prop, newvalue);
    console.log(this.myLibrary);
  }

  //render Library on page

  clearLibrary() {
    while (libraryContainer.firstChild) {
      libraryContainer.removeChild(libraryContainer.firstChild);
    }
  }

  renderLibrary() {
    //clear library

    this.clearLibrary();

    // render books

    this.renderBookElements();
  }

  renderBookElements() {
    // draw and append markup and buttons for each book in library
    this.myLibrary.sort((a,b) => (a.title > b.title) ? 1 : -1);
    this.myLibrary.sort((a,b) => (a.read == true) ? 1 : -1);
    
    for (let i = 0; i < this.myLibrary.length; i++) {
      let book = this.myLibrary[i];
      let index = this.myLibrary.indexOf(book);
      let $this = this;

      let bookContainer = document.createElement("div");
      let deleteButton = document.createElement("button");
      deleteButton.setAttribute("class", "btn");
      deleteButton.textContent = "Remove";
      let markReadIcon = document.createElement("img");
      markReadIcon.setAttribute("class", "markReadIcon");

      if (book.read == true) {
        markReadIcon.src = "./img/book.svg";
        bookContainer.setAttribute("class", "book read");
        markReadIcon.addEventListener("click", function () {
          $this.editBook(index, "read", false);
          markReadIcon.src = "./img/book-open.svg";
          ;
          $this.clearLibrary();
          $this.renderBookElements();
        });
      } else {
        markReadIcon.src = "./img/book-open.svg";
        bookContainer.setAttribute("class", "book");
        markReadIcon.addEventListener("click", function () {
          $this.editBook(index, "read", true);
          markReadIcon.src = "./img/book.svg";
          $this.clearLibrary();
          $this.renderBookElements();
        });
      }

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
    const markup = `<div id="">
                        <h1>${this.title}</h1>
                        <h4>${this.author}</h4>
                        </div>
                        `;

    return markup;
  }
}

//initialize library

const library = new Library();

//default books

library.addBook("The Great Gatsby", "F. Scott Fitzgerald", true);

library.addBook("Nineteen Eighty-Four", "George Orwell", false);

//initialize page

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
