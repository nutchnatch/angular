import { Component, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private intervalSubscribtion: Subscription;

  constructor() { }

  ngOnInit() {
    // this.intervalSubscribtion = interval(1000).subscribe(
    //   count => {
    //     console.log(count);
    //   }
    // )

    const constantIntervalObservable = Observable.create(observer => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if(count === 2) {
            observer.complete();
          }
          if(count > 3) {
            observer.error(new Error('Count is greater than 3!'));
          }
          count ++;
        }, 1000);
    });

    this.intervalSubscribtion = constantIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) =>  {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
        console.log(data);
      }, error2 => {
        console.log(error2);
        alert(error2.message);
      }, () => {
        console.log('Completed!');
      }
    )
  }

  ngOnDestroy() {
    this.intervalSubscribtion.unsubscribe();
  }
}
