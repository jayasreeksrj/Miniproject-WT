import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../guard/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  username: string = '';
  productCount: number = 0;
  purchasedCount: number = 0;
  topBrandsCount: number = 0;
  private userSubscription!: Subscription;

  constructor(private authService: AuthService, private dataService: DataService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      if (user) {
        this.username = user.name;
      }
    });
    this.loadCounts();
  }

  loadCounts(): void {
    this.productCount = this.dataService.getProductCount();
    this.purchasedCount = this.dataService.getPurchasedCount();
    this.topBrandsCount = this.dataService.getTopBrandsCount();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
