import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

/*
  So basically to retrieve url like /user/:id/:name
  we can either do it with the approach of getting params on ngOnInit without Subscription, if the Component does not call itself
  if so we have to use a Subscription (observable) and destory it afterwards
 */

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    this.paramSubscription  = this.route.params.subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
    );
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

}
