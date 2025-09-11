import { PrismaClient, Role, VehicleStatus, LeadStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seeding...');

  // Clear existing data
  await prisma.testDrive.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.vehiclePhoto.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️ Cleared existing data');

  // Create users with strong passwords
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const seller1Password = await bcrypt.hash('Joao123!', 10);
  const seller2Password = await bcrypt.hash('Maria123!', 10);

  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@autoconnect.com',
      phone: '(11) 99999-9999',
      role: Role.ADMIN,
      password: adminPassword,
    },
  });

  const seller1 = await prisma.user.create({
    data: {
      name: 'João Silva',
      email: 'joao@autoconnect.com',
      phone: '(11) 98888-8888',
      role: Role.SELLER,
      password: seller1Password,
    },
  });

  const seller2 = await prisma.user.create({
    data: {
      name: 'Maria Santos',
      email: 'maria@autoconnect.com',
      phone: '(11) 97777-7777',
      role: Role.SELLER,
      password: seller2Password,
    },
  });

  console.log('👥 Created users');

  // Create vehicles
  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2023,
        color: 'Branco',
        mileage: 15000,
        price: 95000.0,
        status: VehicleStatus.AVAILABLE,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Honda',
        model: 'Civic',
        year: 2022,
        color: 'Prata',
        mileage: 25000,
        price: 110000.0,
        status: VehicleStatus.AVAILABLE,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Volkswagen',
        model: 'Jetta',
        year: 2024,
        color: 'Preto',
        mileage: 5000,
        price: 125000.0,
        status: VehicleStatus.AVAILABLE,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Ford',
        model: 'Focus',
        year: 2021,
        color: 'Azul',
        mileage: 45000,
        price: 75000.0,
        status: VehicleStatus.RESERVED,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Chevrolet',
        model: 'Cruze',
        year: 2020,
        color: 'Vermelho',
        mileage: 60000,
        price: 65000.0,
        status: VehicleStatus.SOLD,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Hyundai',
        model: 'Elantra',
        year: 2023,
        color: 'Cinza',
        mileage: 8000,
        price: 85000.0,
        status: VehicleStatus.AVAILABLE,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Nissan',
        model: 'Sentra',
        year: 2022,
        color: 'Branco',
        mileage: 20000,
        price: 80000.0,
        status: VehicleStatus.AVAILABLE,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Renault',
        model: 'Fluence',
        year: 2019,
        color: 'Prata',
        mileage: 80000,
        price: 45000.0,
        status: VehicleStatus.AVAILABLE,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Fiat',
        model: 'Cronos',
        year: 2021,
        color: 'Branco',
        mileage: 35000,
        price: 55000.0,
        status: VehicleStatus.AVAILABLE,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Peugeot',
        model: '408',
        year: 2020,
        color: 'Preto',
        mileage: 50000,
        price: 70000.0,
        status: VehicleStatus.AVAILABLE,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'BMW',
        model: '320i',
        year: 2023,
        color: 'Azul',
        mileage: 12000,
        price: 200000.0,
        status: VehicleStatus.AVAILABLE,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Mercedes-Benz',
        model: 'C180',
        year: 2022,
        color: 'Preto',
        mileage: 18000,
        price: 220000.0,
        status: VehicleStatus.RESERVED,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Audi',
        model: 'A3',
        year: 2021,
        color: 'Branco',
        mileage: 28000,
        price: 180000.0,
        status: VehicleStatus.AVAILABLE,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Jeep',
        model: 'Compass',
        year: 2023,
        color: 'Vermelho',
        mileage: 10000,
        price: 160000.0,
        status: VehicleStatus.AVAILABLE,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: 'Mitsubishi',
        model: 'Lancer',
        year: 2019,
        color: 'Prata',
        mileage: 55000,
        price: 60000.0,
        status: VehicleStatus.AVAILABLE,
      },
    }),
  ]);

  console.log('🚗 Created vehicles');

  // Create vehicle photos
  const photoUrls = [
    'https://example.com/photos/corolla-1.jpg',
    'https://example.com/photos/corolla-2.jpg',
    'https://example.com/photos/civic-1.jpg',
    'https://example.com/photos/civic-2.jpg',
    'https://example.com/photos/jetta-1.jpg',
    'https://example.com/photos/focus-1.jpg',
    'https://example.com/photos/cruze-1.jpg',
    'https://example.com/photos/elantra-1.jpg',
    'https://example.com/photos/sentra-1.jpg',
    'https://example.com/photos/fluence-1.jpg',
  ];

  for (let i = 0; i < vehicles.length && i < photoUrls.length; i++) {
    await prisma.vehiclePhoto.create({
      data: {
        url: photoUrls[i],
        vehicleId: vehicles[i].id,
      },
    });
  }

  // Add extra photos for some vehicles
  await prisma.vehiclePhoto.create({
    data: {
      url: 'https://example.com/photos/corolla-3.jpg',
      vehicleId: vehicles[0].id,
    },
  });

  console.log('📸 Created vehicle photos');

  // Create leads
  const leads = await Promise.all([
    prisma.lead.create({
      data: {
        name: 'Carlos Oliveira',
        email: 'carlos@email.com',
        phone: '(11) 91234-5678',
        interestId: vehicles[0].id, // Toyota Corolla
        sellerId: seller1.id,
        status: LeadStatus.NEW,
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Ana Paula',
        email: 'ana@email.com',
        phone: '(11) 92345-6789',
        interestId: vehicles[1].id, // Honda Civic
        sellerId: seller1.id,
        status: LeadStatus.CONTACTED,
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Roberto Lima',
        email: 'roberto@email.com',
        phone: '(11) 93456-7890',
        interestId: vehicles[2].id, // VW Jetta
        sellerId: seller2.id,
        status: LeadStatus.TEST_DRIVE,
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Fernanda Costa',
        email: 'fernanda@email.com',
        phone: '(11) 94567-8901',
        interestId: vehicles[3].id, // Ford Focus
        sellerId: seller2.id,
        status: LeadStatus.PROPOSAL,
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Bruno Alves',
        email: 'bruno@email.com',
        phone: '(11) 95678-9012',
        interestId: vehicles[4].id, // Chevrolet Cruze
        sellerId: seller1.id,
        status: LeadStatus.CLOSED,
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Juliana Rocha',
        email: 'juliana@email.com',
        phone: '(11) 96789-0123',
        interestId: vehicles[5].id, // Hyundai Elantra
        sellerId: seller1.id,
        status: LeadStatus.NEW,
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Pedro Martins',
        email: 'pedro@email.com',
        phone: '(11) 97890-1234',
        interestId: vehicles[10].id, // BMW 320i
        sellerId: seller2.id,
        status: LeadStatus.CONTACTED,
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Camila Ferreira',
        email: 'camila@email.com',
        phone: '(11) 98901-2345',
        interestId: vehicles[11].id, // Mercedes C180
        sellerId: seller2.id,
        status: LeadStatus.LOST,
      },
    }),
  ]);

  console.log('🎯 Created leads');

  // Create test drives
  await Promise.all([
    prisma.testDrive.create({
      data: {
        date: new Date('2024-01-15T10:00:00Z'),
        leadId: leads[2].id, // Roberto Lima
        vehicleId: vehicles[2].id, // VW Jetta
        sellerId: seller2.id,
      },
    }),
    prisma.testDrive.create({
      data: {
        date: new Date('2024-01-20T14:30:00Z'),
        leadId: leads[3].id, // Fernanda Costa
        vehicleId: vehicles[3].id, // Ford Focus
        sellerId: seller2.id,
      },
    }),
    prisma.testDrive.create({
      data: {
        date: new Date('2024-01-25T16:00:00Z'),
        leadId: leads[6].id, // Pedro Martins
        vehicleId: vehicles[10].id, // BMW 320i
        sellerId: seller2.id,
      },
    }),
  ]);

  console.log('🚙 Created test drives');

  // Create sales
  await Promise.all([
    prisma.sale.create({
      data: {
        vehicleId: vehicles[4].id, // Chevrolet Cruze
        sellerId: seller1.id,
        leadId: leads[4].id, // Bruno Alves
        amount: 65000.0,
      },
    }),
  ]);

  console.log('💰 Created sales');

  console.log('🎉 Seeding completed successfully!');
  console.log(`
📊 Summary:
- ${await prisma.user.count()} users created
- ${await prisma.vehicle.count()} vehicles created
- ${await prisma.vehiclePhoto.count()} photos created
- ${await prisma.lead.count()} leads created
- ${await prisma.testDrive.count()} test drives created
- ${await prisma.sale.count()} sales created

🔐 Login credentials:
Admin: admin@autoconnect.com / Admin123!
Seller 1: joao@autoconnect.com / Joao123!
Seller 2: maria@autoconnect.com / Maria123!
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });