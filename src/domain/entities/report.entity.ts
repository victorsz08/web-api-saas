


export type BusinessReportProps = {
    revenue: number; 
    sales: number;
    installed: number;
    pending: number;
    canceled: number;
    completionRate: number;
    cancellationRate: number;
};

export class BusinessReport {

    private constructor(private readonly props: BusinessReportProps) {};

    public static with(props: BusinessReportProps) {
        return new BusinessReport(props);
    };

    public get revenue() {
        return this.props.revenue;
    };

    public get sales() {
        return this.props.sales;
    };

    public get installed() {
        return this.props.installed;
    };

    public get canceled() {
        return this.props.canceled;
    };

    public get pending() {
        return this.props.pending;
    };

    public get completionRate() {
        return this.props.completionRate;
    };

    public get cancellationRate() {
        return this.props.cancellationRate;
    };
}