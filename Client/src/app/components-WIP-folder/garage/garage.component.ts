import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription, fromEvent } from 'rxjs';

import { photos } from './garage-photos';

@Component({
    selector: 'app-garage',
    templateUrl: './garage.component.html',
    styleUrls: [ './garage.component.css' ],
    animations: [
        trigger('fade', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(1200) ])
        ]),
    ]
})
export class GarageComponent implements OnInit, OnDestroy {
    isVisible = false;
    topPosToStartShowing = 50;

    eventSubscription: Subscription = fromEvent(window, 'scroll').subscribe(e => {
        this.checkScroll();
    });

    photos!: string[];

    constructor() { }

    ngOnInit(): void {
        this.photos = photos;
    }

    checkScroll() {
        const scrollPosition = window.scrollY || 0;

        if (scrollPosition >= this.topPosToStartShowing) {
            this.isVisible = true;
        } else {
            this.isVisible = false;
        }
    }

    gotoTop() {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    ngOnDestroy(): void {
        this.eventSubscription.unsubscribe();
    }
}
