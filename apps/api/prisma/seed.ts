import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';

const prisma = new PrismaClient();
const today = new Date();
const lastMonth = new Date(today.setMonth(today.getMonth() - 1));

async function seedRestaurants() {
  const restaurants = [];
  fs.createReadStream('./prisma/restaurant-data.csv')
    .pipe(csvParser())
    .on('data', async (row) => {
      const existingRestaurant = await prisma.restaurant.findUnique({
        where: { name: row.Name },
      });

      if (!existingRestaurant) {
        restaurants.push({ name: row.Name });
      } else {
        console.log(`Restaurant already exists: ${row.Name}`);
      }
    })
    .on('end', async () => {
      if (restaurants.length > 0) {
        await prisma.restaurant.createMany({
          data: restaurants,
        });
        console.log('Restaurants seeded');
      } else {
        console.log('No new restaurants to seed');
      }
    });
}

async function seedReviewers() {
  const reviewers = [];
  fs.createReadStream('./prisma/restaurant-data-people.csv')
    .pipe(csvParser())
    .on('data', (row) => {
      reviewers.push({ name: row.Name });
    })
    .on('end', async () => {
      await prisma.reviewer.createMany({
        data: reviewers,
      });
      console.log('Reviewers seeded');
    });
}

async function seedReviews() {
  const reviews = [];
  fs.createReadStream('./prisma/restaurant-data-ratings.csv')
    .pipe(csvParser())
    .on('data', async (row) => {
      // Find the reviewer by name
      const reviewer = await prisma.reviewer.findFirst({
        where: { name: row.Person },
      });

      if (reviewer) {
        reviews.push({
          reviewer: { connect: { id: reviewer.id } },
          restaurant: { connect: { name: row.Restaurant } },
          source: row.Source,
          value: parseFloat(row.Rating),
          date: row.Date ? new Date(row.Date) : lastMonth,
        });
      } else {
        console.error(`Reviewer not found: ${row.Person}`);
      }
    })
    .on('end', async () => {
      await prisma.rating.createMany({
        data: reviews,
      });
      console.log('Reviews seeded');
    });
}

async function main() {
  await seedRestaurants();
  await seedReviewers();
  await seedReviews();

  prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
