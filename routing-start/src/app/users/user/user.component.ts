import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

/*
  So basically to retrieve url like /user/:id/:name
  we can either do it with the approach of getting params on ngOnInit without Subscription, if the Component does not call itself
  if so we have to use a Subscription (observable) and destory it afterwards, params is old tho so lets use paramMap
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
      name: this.route.snapshot.paramMap.get('name')
    };
// using + parameter converts string to number
    this.paramSubscription  = this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.user.id = +params.get('id');
          this.user.name = params.get('name');
        }
    );
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

}
