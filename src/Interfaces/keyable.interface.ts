interface Keyable {
    [key: string]: any;
}
interface customResponse {
    [x: string]: any;
    message: string,
    data: Record<string, unknown>,
    status?: any
}
export { Keyable, customResponse };
