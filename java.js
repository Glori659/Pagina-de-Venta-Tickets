// Obtener elementos del formulario
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const quantityInput = document.getElementById('quantity');
const categorySelect = document.getElementById('category');
const summaryButton = document.getElementById('summaryButton');
const totalPayment = document.getElementById('totalPayment');
const clearButton = document.getElementById('clearButton');
const form = document.getElementById('ticketForm');

// Calcular y mostrar el resumen del pago
summaryButton.addEventListener('click', function() {
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;
  const quantity = parseInt(quantityInput.value);
  const category = categorySelect.value;
  let discount = 0;

  switch (category) {
    case 'estudiante':
      discount = 80;
      break;
    case 'trainee':
      discount = 50;
      break;
    case 'junior':
      discount = 15;
      break;
  }

  const price = 200; // Precio base por ticket
  const totalPrice = price * quantity * (100 - discount) / 100;
  totalPayment.textContent = `Total a Pagar: $${totalPrice}`;

  // Mostrar resumen
  alert(`Resumen de Pago:
    Nombre: ${firstName}
    Apellido: ${lastName}
    Correo: ${email}
    Cantidad: ${quantity}
    Categoría: ${category}
    Total a Pagar: $${totalPrice}`);
});

// Borrar el formulario
clearButton.addEventListener('click', function() {
  form.reset();
  totalPayment.textContent = 'Total a Pagar: $0';
});

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':tickects.db:'); // O puedes especificar un archivo para almacenar la base de datos


db.run(`
  CREATE TABLE clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    apellido TEXT,
    correo TEXT,
    cantidad INTEGER,
    categoria TEXT,
    total_pagar INTEGER
  )
`);


function calcularDescuento(categoria, cantidad) {
  let descuento = 0;

  if (categoria === 'estudiante') {
    descuento = cantidad * 0.8; // 80% de descuento
  } else if (categoria === 'trainee') {
    descuento = cantidad * 0.5; // 50% de descuento
  } else if (categoria === 'junior') {
    descuento = cantidad * 0.15; // 15% de descuento
  }

  return descuento;
}

// Ejemplo de datos
const datosCliente = {
  nombre: 'Juan',
  apellido: 'Pérez',
  correo: 'juan@example.com',
  cantidad: 5,
  categoria: 'estudiante' // Cambia la categoría según tus necesidades
};

const descuento = calcularDescuento(datosCliente.categoria, datosCliente.cantidad);
const totalPagar = datosCliente.cantidad - descuento;

db.run(`
  INSERT INTO clientes (nombre, apellido, correo, cantidad, categoria, total_pagar)
  VALUES (?, ?, ?, ?, ?, ?)
`, [datosCliente.nombre, datosCliente.apellido, datosCliente.correo, datosCliente.cantidad, datosCliente.categoria, totalPagar], function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Cliente insertado correctamente');
  }
});

db.all('SELECT * FROM clientes', [], function(err, rows) {
  if (err) {
    console.error(err);
  } else {
    console.log(rows);
  }
});
