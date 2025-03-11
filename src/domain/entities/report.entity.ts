


export type ReportEntityProps = {
    revenue: number; 
    sales: number;
    installed: number;
    pending: number;
    canceled: number;
    completionRate: number;
    cancellationRate: number;
};

export class ReportEntity {

    private constructor(private readonly props: ReportEntityProps) {};

    public static with(props: ReportEntityProps) {
        return new ReportEntity(props);
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