import { Inject, Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable()
export class UserServices {
    activeUsers = ['Max', 'Anna'];
    inactiveUsers = ['Chris', 'Manu'];


    constructor(private counterService: CounterService) {}

    setToActive(id: number) {
        this.activeUsers.push(this.inactiveUsers[id]);
        // remove the element at id 
        this.inactiveUsers.splice(id, 1);
        this.counterService.incrementActiveToInactive();
    }

    setToInactive(id: number) {
        this.inactiveUsers.push(this.activeUsers[id]);
        // remove the element at id 
        this.activeUsers.splice(id, 1);
        this.counterService.incrementInactiveToActive();
    }
}