const sequelize = require('./db');
const Car = require('./models/car');
const { Author, Book } = require('./models/index');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Подключение к SQLite установлено.');

    await sequelize.sync({ force: true });
    console.log('Таблицы синхронизированы.');

    console.log('\n--- Автомобили ---');
    await Car.bulkCreate([
      { brand: 'Toyota', model: 'Camry', year: 2022, price: 2_750_000, isAvailable: true },
      { brand: 'BMW', model: 'X5', year: 2021, price: 6_300_000, isAvailable: false },
    ]);
    
    const allCars = await Car.findAll();
    allCars.forEach((car) => {
      console.log(`#${car.id} | ${car.brand} ${car.model} | ${car.year} | ${car.price} руб.`);
    });

    console.log('\n--- Авторы и книги ---');

    const author1 = await Author.create({ name: 'Александр Пушкин', country: 'Россия' });
    await author1.createBook({ title: 'Евгений Онегин', year: 1833, genre: 'Роман в стихах' });
    await author1.createBook({ title: 'Капитанская дочка', year: 1836, genre: 'Исторический роман' });

    const author2 = await Author.create({ name: 'Михаил Булгаков', country: 'Россия' });
    await author2.createBook({ title: 'Мастер и Маргарита', year: 1967, genre: 'Мистика' });

    const author3 = await Author.create({ name: 'Джоан Роулинг', country: 'Великобритания' });
    await author3.createBook({ title: 'Гарри Поттер и философский камень', year: 1997, genre: 'Фэнтези' });

    const authorsWithBooks = await Author.findAll({
      include: {
        model: Book,
        as: 'books',
      },
    });

    authorsWithBooks.forEach((a) => {
      console.log(`\nАвтор: ${a.name} (${a.country})`);
      a.books.forEach((b) => {
        console.log(`  - ${b.title} (${b.year} г.), жанр: ${b.genre}`);
      });
    });

  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await sequelize.close();
    console.log('\nСоединение с базой данных закрыто.');
  }
}

main();