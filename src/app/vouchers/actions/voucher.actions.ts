import { Action } from '@ngrx/store';
import { Voucher } from '../model/voucher';

export enum VoucherActionTypes {
    LoadVouchers = '[Voucher] Load Vouchers',
    LoadVouchersCompleted = '[Voucher] Load Vouchers Completed',
    GenerateVouchers = '[Voucher] Generate Vouchers',
    DeleteVouchers = '[Voucher] Delete Vouchers',
    PublishVouchers = '[Voucher] Publish Vouchers'
}

export interface GenerateVouchersSpec {
    count: number;
    totalAmount: number;
    walletId: number;
    singlePrice: number;
    singlePriceCurrency: string;
    sku: string;
}

export class GenerateVouchersAction implements Action {
    readonly type = VoucherActionTypes.GenerateVouchers;

    constructor(public payload: GenerateVouchersSpec) { }
}

export class DeleteVouchersAction implements Action {
    readonly type = VoucherActionTypes.DeleteVouchers;

    constructor(public sku: string) { }
}

export class LoadVouchersAction implements Action {
    readonly type = VoucherActionTypes.LoadVouchers;
}

export class LoadVouchersCompleted implements Action {
    readonly type = VoucherActionTypes.LoadVouchersCompleted;

    constructor(public payload: Voucher[]) { }
}

export type VoucherActions = LoadVouchersAction | LoadVouchersCompleted | GenerateVouchersAction | DeleteVouchersAction;
