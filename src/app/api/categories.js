import { pool } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT categoryName FROM categories');
      client.release();

      const categories = result.rows.reduce((acc, row) => {
        acc[row.id] = row.name;
        return acc;
      }, {});
    
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}