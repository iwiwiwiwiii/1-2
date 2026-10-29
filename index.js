const sequelize = require('./db');
const Car = require('./models/car');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Подключение к SQLite установлено.');

    await sequelize.sync({ force: true });
    console.log('Таблица "cars" синхронизирована.');

    const cars = await Car.bulkCreate([
      {
        brand: 'Toyota',
        model: 'Camry',
        year: 2022,
        price: 2_750_000,
        isAvailable: true,
      },
      {
        brand: 'BMW',
        model: 'X5',
        year: 2021,
        price: 6_300_000,
        isAvailable: false,
      },
      {
        brand: 'Lada',
        model: 'Vesta',
        year: 2023,
        price: 1_250_000,
        isAvailable: true,
      },
    ]);
    console.log(`Добавлено автомобилей: ${cars.length}`);

    const allCars = await Car.findAll({ order: [['id', 'ASC']] });

    console.log('\nСписок автомобилей в базе:');
    console.log('─'.repeat(95));
    allCars.forEach((car) => {
      console.log(
        `#${car.id} | ${car.brand} ${car.model} | ${car.year} г. | ` +
          `${car.price.toLocaleString('ru-RU')} ₽ | ` +
          `${car.isAvailable ? 'в продаже' : 'продано'}`
      );
    });
    console.log('─'.repeat(95));
    console.log(`Всего записей: ${allCars.length}`);
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await sequelize.close();
    console.log('\nСоединение с базой данных закрыто.');
  }
}

main();