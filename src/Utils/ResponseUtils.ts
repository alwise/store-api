interface ErrorInt {
    error?:any,
    message:any
}
interface ResponseInt{
    status?:boolean | undefined;
    statusCode?:number | string | undefined;
    data?:any[] | JSON | object | undefined | string | number;
    message?:string | undefined;
    error?:ErrorInt
}
export const sendSuccessResponse = (props:ResponseInt) : ResponseInt => {
    return {
        status:props?.status || true,
        statusCode:props?.statusCode || 200,
        data:props?.data || {},
        message:props?.message || 'Request completed successfully'
    }
}
export const sendFailedResponse = (props:ResponseInt) : ResponseInt => {
    return {
        status:props?.status || false,
        statusCode:props?.statusCode || 400,
        data:props?.data || {},
        message:props?.message || 'Unable to complete request',
        error:{
            error:props?.error,
            message:props?.error?.message
        }
    }
}