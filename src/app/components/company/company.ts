import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Company {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  employees: number;
  revenue: number;
  industry: string;
  location: string;
}

@Component({
  selector: 'app-company',
  imports: [CommonModule],
  templateUrl: './company.html',
  styleUrl: './company.scss'
})
export class Company {
  companies: Company[] = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      initials: 'TC',
      avatarColor: '#4A5FBF',
      employees: 250,
      revenue: 5200000,
      industry: 'Technology',
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      name: 'Green Energy Ltd',
      initials: 'GE',
      avatarColor: '#22C55E',
      employees: 180,
      revenue: 3800000,
      industry: 'Energy',
      location: 'Austin, TX'
    },
    {
      id: 3,
      name: 'Financial Partners',
      initials: 'FP',
      avatarColor: '#F59E0B',
      employees: 320,
      revenue: 8900000,
      industry: 'Finance',
      location: 'New York, NY'
    },
    {
      id: 4,
      name: 'Healthcare Plus',
      initials: 'HP',
      avatarColor: '#EF4444',
      employees: 450,
      revenue: 12000000,
      industry: 'Healthcare',
      location: 'Boston, MA'
    },
    {
      id: 5,
      name: 'Manufacturing Co',
      initials: 'MC',
      avatarColor: '#8B5CF6',
      employees: 680,
      revenue: 15600000,
      industry: 'Manufacturing',
      location: 'Detroit, MI'
    },
    {
      id: 6,
      name: 'Retail Dynamics',
      initials: 'RD',
      avatarColor: '#06B6D4',
      employees: 1200,
      revenue: 28000000,
      industry: 'Retail',
      location: 'Seattle, WA'
    },
    {
      id: 7,
      name: 'Education First',
      initials: 'EF',
      avatarColor: '#F97316',
      employees: 95,
      revenue: 2100000,
      industry: 'Education',
      location: 'Denver, CO'
    },
    {
      id: 8,
      name: 'Media Group',
      initials: 'MG',
      avatarColor: '#EC4899',
      employees: 150,
      revenue: 4200000,
      industry: 'Media',
      location: 'Los Angeles, CA'
    }
  ];

  constructor(private router: Router) {}

  onClick(company: Company) {
    console.log('Company clicked:', company);
    // Navigate to company details or perform other actions
    // this.router.navigate(['/company', company.id]);
  }

  loadMore(event: Event) {
    event.preventDefault();
    console.log('Loading more companies...');
    // Implement load more functionality
    // This could involve calling an API to fetch more companies
  }
}