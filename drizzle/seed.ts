import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { roles } from "@/drizzle";

config({ path: '.env' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);


async function seedRoles() {
  const defaultRoles = [
    { name: 'owner' },
    { name: 'employee' }
  ];

  await Promise.all(
    defaultRoles.map(role =>
      db.insert(roles).values(role)
    )
  );

  console.log('Default roles seeded successfully.');
}

seedRoles().catch(error => {
  console.error('Error seeding roles:', error);
});
