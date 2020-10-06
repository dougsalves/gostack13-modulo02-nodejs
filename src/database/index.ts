import { createConnection } from 'typeorm';

createConnection()
  .then(conn => {
    console.log(`Conectou: ${conn.name}`);
  })
  .catch(err => {
    console.log(`Erro: ${err.message}`);
  });
