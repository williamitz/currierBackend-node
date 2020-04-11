export default interface IResponse {
    ok: boolean;
    error?: any;
    message?: string;
    showError?: number;
    data?: any;
}
