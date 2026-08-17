export type LoginState ={
  success: boolean,
  statusCode: number,
  message:string,
  data:{
    accessToken:string,
    refreshToken:string
  }
}