"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportEntity = void 0;
class ReportEntity {
    constructor(props) {
        this.props = props;
    }
    ;
    static with(props) {
        return new ReportEntity(props);
    }
    ;
    get revenue() {
        return this.props.revenue;
    }
    ;
    get sales() {
        return this.props.sales;
    }
    ;
    get installed() {
        return this.props.installed;
    }
    ;
    get canceled() {
        return this.props.canceled;
    }
    ;
    get pending() {
        return this.props.pending;
    }
    ;
    get completionRate() {
        return this.props.completionRate;
    }
    ;
    get cancellationRate() {
        return this.props.cancellationRate;
    }
    ;
}
exports.ReportEntity = ReportEntity;
