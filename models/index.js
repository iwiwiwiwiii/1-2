const Author = require('./author');
const Book = require('./book');

Author.hasMany(Book, { foreignKey: 'authorId', as: 'books' });
Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });

module.exports = { Author, Book };