import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    LoadVoucherInfoCompleted, VoucherActionTypes, LoadVoucherInfo, LoadVoucherInfoFailed, RedeemVoucherFailed, RedeemVoucher,
    RedeemVoucherCompleted
} from './voucher.actions';
import { Injectable } from '@angular/core';
import { RedemptionFormService } from './voucher.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class VoucherEffects {

    constructor(
        private actions$: Actions,
        private redemptionFormService: RedemptionFormService,
        public router: Router) { }

    @Effect()
    onLoadVoucherInfo$ = this.actions$
        .pipe(
            ofType<LoadVoucherInfo>(VoucherActionTypes.LoadVoucherInfo),
            mergeMap(action => this.redemptionFormService.requestVoucherInfo(action.payload)
                .pipe(
                    map(response => new LoadVoucherInfoCompleted(response)),
                    catchError(error => of(new LoadVoucherInfoFailed())), // error contains no feedback
                ))
        );

    @Effect()
    onRedeem$ = this.actions$
        .pipe(
            ofType<RedeemVoucher>(VoucherActionTypes.RedeemVoucher),
            mergeMap(action => this.redemptionFormService.redeem(action.payload)
                .pipe(
                    map(response => new RedeemVoucherCompleted(response)),
                    catchError(error => of(new RedeemVoucherFailed())), // error contains no feedback
                ))
        );

    @Effect({ dispatch: false })
    onRedeemCompleted$ = this.actions$
        .pipe(
            ofType<RedeemVoucherCompleted>(VoucherActionTypes.RedeemVoucherCompleted),
            map(action => this.router.navigate(['/redeem/success'])
        ));

    @Effect({ dispatch: false })
    onRedeemFailed$ = this.actions$
        .pipe(
            ofType<RedeemVoucherFailed>(VoucherActionTypes.RedeemVoucherFailed),
            map(action => this.router.navigate(['/redeem/failed'])
        ));
}
