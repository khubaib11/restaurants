export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'beverage';
  image: string;
  featured?: boolean;
}

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'app1',
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with black truffle and parmesan',
    price: 18,
    category: 'appetizer',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    featured: true
  },
  {
    id: 'app2',
    name: 'Pan-Seared Scallops',
    description: 'Fresh scallops with cauliflower purée and pancetta',
    price: 24,
    category: 'appetizer',
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg'
  },
  {
    id: 'app3',
    name: 'Burrata Caprese',
    description: 'Fresh burrata with heirloom tomatoes and basil oil',
    price: 16,
    category: 'appetizer',
    image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg'
  },

  // Main Courses
  {
    id: 'main1',
    name: 'Wagyu Beef Tenderloin',
    description: 'Premium wagyu with roasted vegetables and red wine reduction',
    price: 65,
    category: 'main',
    image: 'https://images.pexels.com/photos/299347/pexels-photo-299347.jpeg',
    featured: true
  },
  {
    id: 'main2',
    name: 'Lobster Thermidor',
    description: 'Classic French lobster with cognac cream sauce',
    price: 52,
    category: 'main',
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg'
  },
  {
    id: 'main3',
    name: 'Duck à l\'Orange',
    description: 'Roasted duck breast with orange glaze and confit leg',
    price: 38,
    category: 'main',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg'
  },
  {
    id: 'main4',
    name: 'Chilean Sea Bass',
    description: 'Miso-glazed sea bass with shiitake mushrooms and bok choy',
    price: 42,
    category: 'main',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  },

  // Desserts
  {
    id: 'des1',
    name: 'Chocolate Soufflé',
    description: 'Dark chocolate soufflé with vanilla bean ice cream',
    price: 14,
    category: 'dessert',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg'
  },
  {
    id: 'des2',
    name: 'Crème Brûlée',
    description: 'Vanilla custard with caramelized sugar and fresh berries',
    price: 12,
    category: 'dessert',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg'
  },
  {
    id: 'des3',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with mascarpone and coffee',
    price: 13,
    category: 'dessert',
    image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg'
  },

  // Beverages
  {
    id: 'bev1',
    name: 'Château Margaux 2015',
    description: 'Premium Bordeaux red wine',
    price: 180,
    category: 'beverage',
    image: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg'
  },
  {
    id: 'bev2',
    name: 'Dom Pérignon',
    description: 'Vintage champagne, perfectly aged',
    price: 250,
    category: 'beverage',
    image: 'https://images.pexels.com/photos/1693650/pexels-photo-1693650.jpeg'
  },
  {
    id: 'bev3',
    name: 'Craft Cocktails',
    description: 'Signature cocktails crafted by our mixologist',
    price: 16,
    category: 'beverage',
    image: 'https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg'
  }
];

export const events = [
  {
    id: 'event1',
    title: 'Wine Tasting Evening',
    date: '2024-02-15',
    description: 'Join us for an exclusive wine tasting featuring rare vintages',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg',
    status: 'upcoming'
  },
  {
    id: 'event2',
    title: 'Chef\'s Table Experience',
    date: '2024-02-20',
    description: 'An intimate dining experience with our executive chef',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    status: 'upcoming'
  },
  {
    id: 'event3',
    title: 'Valentine\'s Special Menu',
    date: '2024-01-14',
    description: 'A romantic evening with our specially curated menu',
    image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
    status: 'past'
  }
];

export const teamMembers = [
  {
    id: 'team1',
    name: 'Chef Marco Rossini',
    position: 'Executive Chef',
    image: 'https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg',
    description: 'With 20 years of experience in Michelin-starred restaurants across Europe.'
  },
  {
    id: 'team2',
    name: 'Sofia Martinez',
    position: 'General Manager',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
    description: 'Leading our service team to provide exceptional dining experiences.'
  },
  {
    id: 'team3',
    name: 'Pierre Dubois',
    position: 'Sommelier',
    image: 'https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg',
    description: 'Master sommelier with expertise in international wine selection.'
  }
];