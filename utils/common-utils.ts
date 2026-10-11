import CryptoJS from "crypto-js";
import process from "node:process";

export class CommonUtils {

    private secretkey!: string;

    constructor() {
        this.secretkey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "yogesh";
       // if (process.env.SECRET_KEY) {
        //   //  this.secretkey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "yogesh";
        //   this.secretkey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "yogesh";

        // } else {
        //     throw new Error("Please provide Secret Key while starting execution.")

        // }
    }

    public encryptData(data: string) {
        const encryptedData = CryptoJS.AES.encrypt(data, this.secretkey).toString();
        console.log(encryptedData);
        return encryptedData;
    }

    public decryptData(endata: string) {
        const decryptData = CryptoJS.AES.decrypt(endata, this.secretkey).toString(CryptoJS.enc.Utf8);
        console.log(decryptData);
        return decryptData;
    }

    public getUserName():string{
        let username = this.decryptData(process.env.USER_NAME!);
        return username;
    }

     public getPassword():string{
        let password = this.decryptData(process.env.PASSWORD!);
        return password;
    }
}