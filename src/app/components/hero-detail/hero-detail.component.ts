import { Component, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../service/hero.service';
import { Hero } from '../../hero';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  constructor(
    // holds information about the route to this instance of the HeroDetailComponent
    private route: ActivatedRoute,
    private heroService: HeroService,
    // The location is an Angular service for interacting with the browser.
    //  This service lets you navigate back to the previous view.
    private location: Location
  ) { }
  hero: Hero | undefined;

  // @Input() hero?: Hero;
  // @Input() heroIndex?: number;

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    // The paramMap is a dictionary of route parameter values extracted from the URL.
    //  The "id" key returns the id of the hero to fetch.
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
  goBack(): void {
    this.location.back();
  }

}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/