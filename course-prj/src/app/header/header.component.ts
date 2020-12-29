import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage';

@Component ({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(private dataStorageService: DataStorageService) {}

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFectData() {
        this.dataStorageService.fetchRecipes()
            .subscribe();
    }
}