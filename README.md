# Практическая работа: Sequelize + SQLite

Проект включает две части: базовую (таблица автомобилей) и работу со связями (Авторы и Книги).

## Связь таблиц (Вариант A)

Реализована связь **один-ко-многим (1:N)** между таблицами `Author` и `Book`.

| Модель | Поле | Тип | Ограничения |
|---|---|---|---|
| **Author** | `id` | INTEGER | PK |
| | `name` | STRING | NOT NULL |
| | `country` | STRING | |
| **Book** | `id` | INTEGER | PK |
| | `title` | STRING | NOT NULL |
| | `year` | INTEGER | |
| | `genre` | STRING | |
| | `authorId` | INTEGER | FK (создается автоматически) |

Ассоциация задана в `models/index.js`:
- `Author.hasMany(Book, { foreignKey: 'authorId', as: 'books' })`
- `Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author' })`

## Структура

- `db.js` — подключение Sequelize
- `models/car.js` — модель Car
- `models/author.js` — модель Author
- `models/book.js` — модель Book
- `models/index.js` — определение ассоциаций
- `index.js` — синхронизация, создание данных, выборка с `include`, вывод
- `package.json`
- `.gitignore`
- `README.md`

## Запуск

```bash
npm install
npm start