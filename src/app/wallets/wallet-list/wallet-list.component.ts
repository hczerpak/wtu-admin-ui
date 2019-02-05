import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Wallet } from '../model/wallet';
import { Observable } from 'rxjs';
import { LoadWalletsAction } from '../actions/wallet.actions';
import { WalletsFeatureState, getWalletsState } from '../reducers/wallet.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.less']
})
export class WalletListComponent implements OnInit {

  wallets$: Observable<Wallet[]>;

  state$: Observable<WalletsFeatureState>;

  constructor(private store: Store<any>) {
    this.state$ = store.select<WalletsFeatureState>(getWalletsState);
    this.wallets$ = this.state$.pipe(
      map(state => state.wallets));
  }

  ngOnInit() {
    this.store.dispatch(new LoadWalletsAction());
  }
}
