import { Client, Account, ID } from "appwrite";
import conf from "../config/conf.js";

export class AuthService {
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectID)
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(), 
                email: email, 
                password: password,
                name: name
            });
            return await this.login({email,password});
        } catch (error) {
            console.log("AppWrite Error :: Error creating account :: ",error);
            throw error;
        }
    };

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession({
                email: email,
                password: password
            });
        } catch (error) {
            console.log("AppWrite Error :: Error logging in :: ",error);
            throw error;
        }
    };

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Error :: getCurrentUserError :: ",error);
            throw error;
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Error :: Error LOGGING OUT :: ",error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;