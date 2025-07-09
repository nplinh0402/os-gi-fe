import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

interface ShopItem {
  id: string;
  name: string;
  category: string;
  ownerName: string;
  products: number;
  wallet: number;
  rating: number;
  reviews: number;
  status: 'active' | 'inactive' | 'pending';
  avatarColor?: string;
  createdDate: Date;
  lastActive: Date;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TagModule,
    ToastModule,
    TooltipModule,
    ProgressSpinnerModule
  ],
  templateUrl: './shop.html',
  styleUrl: './shop.scss',
  providers: [MessageService]
})
export class Shop implements OnInit {
  shops: ShopItem[] = [];
  filteredShops: ShopItem[] = [];
  searchQuery: string = '';
  loading: boolean = false;

  constructor(
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadShops();
  }

  loadShops() {
    this.loading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.shops = [
        {
          id: '1',
          name: 'TechHub Store',
          category: 'Electronics',
          ownerName: 'John Smith',
          products: 245,
          wallet: 15420.50,
          rating: 4.8,
          reviews: 156,
          status: 'active',
          avatarColor: '#4A5FBF',
          createdDate: new Date('2023-01-15'),
          lastActive: new Date()
        },
        {
          id: '2',
          name: 'Fashion Forward',
          category: 'Clothing',
          ownerName: 'Sarah Johnson',
          products: 189,
          wallet: 8750.25,
          rating: 4.6,
          reviews: 89,
          status: 'active',
          avatarColor: '#E91E63',
          createdDate: new Date('2023-02-20'),
          lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: '3',
          name: 'Home & Garden',
          category: 'Home Decor',
          ownerName: 'Mike Wilson',
          products: 67,
          wallet: 3200.75,
          rating: 4.3,
          reviews: 34,
          status: 'pending',
          avatarColor: '#4CAF50',
          createdDate: new Date('2023-03-10'),
          lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000)
        },
        {
          id: '4',
          name: 'Sports Central',
          category: 'Sports',
          ownerName: 'Lisa Brown',
          products: 134,
          wallet: 6890.00,
          rating: 4.7,
          reviews: 78,
          status: 'active',
          avatarColor: '#FF9800',
          createdDate: new Date('2023-01-30'),
          lastActive: new Date(Date.now() - 30 * 60 * 1000)
        },
        {
          id: '5',
          name: 'Book Haven',
          category: 'Books',
          ownerName: 'David Lee',
          products: 456,
          wallet: 12340.80,
          rating: 4.9,
          reviews: 203,
          status: 'active',
          avatarColor: '#9C27B0',
          createdDate: new Date('2022-11-15'),
          lastActive: new Date(Date.now() - 10 * 60 * 1000)
        },
        {
          id: '6',
          name: 'Beauty Bliss',
          category: 'Beauty',
          ownerName: 'Emma Davis',
          products: 78,
          wallet: 4560.30,
          rating: 4.4,
          reviews: 45,
          status: 'inactive',
          avatarColor: '#F44336',
          createdDate: new Date('2023-04-05'),
          lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        {
          id: '7',
          name: 'Pet Paradise',
          category: 'Pet Supplies',
          ownerName: 'Tom Anderson',
          products: 123,
          wallet: 7890.45,
          rating: 4.5,
          reviews: 67,
          status: 'active',
          avatarColor: '#00BCD4',
          createdDate: new Date('2023-02-28'),
          lastActive: new Date(Date.now() - 45 * 60 * 1000)
        },
        {
          id: '8',
          name: 'Gourmet Kitchen',
          category: 'Food & Beverage',
          ownerName: 'Maria Garcia',
          products: 89,
          wallet: 5670.90,
          rating: 4.6,
          reviews: 52,
          status: 'active',
          avatarColor: '#795548',
          createdDate: new Date('2023-03-20'),
          lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000)
        }
      ];
      
      this.filteredShops = [...this.shops];
      this.loading = false;
    }, 1000);
  }

  filterShops() {
    if (!this.searchQuery.trim()) {
      this.filteredShops = [...this.shops];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredShops = this.shops.filter(shop =>
      shop.name.toLowerCase().includes(query) ||
      shop.category.toLowerCase().includes(query) ||
      shop.ownerName.toLowerCase().includes(query) ||
      shop.status.toLowerCase().includes(query)
    );
  }

  getShopInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getStatusSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warn';
      case 'inactive':
        return 'danger';
      default:
        return 'info';
    }
  }

    return shop.id;
  }

  onClick(shop: ShopItem) {
    this.messageService.add({
      severity: 'info',
      summary: 'Shop Selected',
      detail: `Viewing details for ${shop.name}`
    });
    
    // Navigate to shop details (you can implement this route)
    // this.router.navigate(['/shops', shop.id]);
  }

  viewShop(shop: ShopItem, event: Event) {
    event.stopPropagation();
    this.messageService.add({
      severity: 'info',
      summary: 'View Shop',
      detail: `Opening ${shop.name} details`
    });
  }

  editShop(shop: ShopItem, event: Event) {
    event.stopPropagation();
    this.messageService.add({
      severity: 'info',
      summary: 'Edit Shop',
      detail: `Editing ${shop.name}`
    });
  }

  viewAnalytics(shop: ShopItem, event: Event) {
    event.stopPropagation();
    this.messageService.add({
      severity: 'info',
      summary: 'Analytics',
      detail: `Viewing analytics for ${shop.name}`
    });
  }

  addNewShop() {
    this.messageService.add({
      severity: 'success',
      summary: 'Add Shop',
      detail: 'Opening new shop form'
    });
    
    // Navigate to add shop form
    // this.router.navigate(['/shops/new']);
  }
}