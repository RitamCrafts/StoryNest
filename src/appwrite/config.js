import { Client, ID, Databases, Storage, Query} from "appwrite";
import conf from "../config/conf.js";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }


    // ----------- file post service -------------

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument({
                databaseId: conf.appWriteDatabaseID,
                collectionId: conf.appwritePostsCollectionID,
                documentId: slug,
                data: {
                    "title": title,
                    "content": content,
                    "status": status,
                    "userid": userId,
                    "featuredimage": featuredImage
                },
            })
        } catch (error) {
            console.log("Appwrite Error :: Error in creating Post :: ",error);
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, userId}){
        try {
            return await this.databases.updateDocument({
                databaseId: conf.appWriteDatabaseID,
                collectionId: conf.appwritePostsCollectionID,
                documentId: slug,
                data: {
                    "title": title,
                    "content": content,
                    "status": status,
                    "userid": userId,
                    "featuredimage": featuredImage
                }
            })
            
        } catch (error) {
            console.log("Appwrite Error :: Error in updating Post :: ",error);
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument({
                databaseId: conf.appWriteDatabaseID,
                collectionId: conf.appwritePostsCollectionID,
                documentId: slug,
            })
            return true;
        } catch (error) {
            console.log("Appwrite Error :: Error in deleting Post :: ",error);
            throw error;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument({
                databaseId: conf.appWriteDatabaseID,
                collectionId: conf.appwritePostsCollectionID,
                documentId: slug,
            });
        } catch (error) {
            console.log("Appwrite Error :: Error in fetching Post :: ",error);
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", ["Public"])]){
        try {
            return await this.databases.listDocuments({
                databaseId: conf.appWriteDatabaseID,
                collectionId: conf.appwritePostsCollectionID,
                queries: queries
            })
        } catch (error) {
            console.log("Appwrite Error :: Error in fetching all posts :: ",error); 
            throw error;
        }
    }



    // ---------- file upload service ------------

    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketID,
                fileId: ID.unique(),
                file: file,
            });//returns file ID
        } catch (error) {
            console.log("Appwrite Error :: Error uploading file(s) :: ",error); 
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketID,
                fileId: fileId
            });
            return true;
        } catch (error) {
            console.log("Appwrite Error :: Error deleting file(s) :: ",error); 
            throw error;
        }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview({
                bucketId: conf.appwriteBucketID,
                fileId: fileId
            });
        } catch (error) {
            console.log("Appwrite Error :: Error getFilePreview :: ",error); 
            throw error;
        }
    }

    getFileView(fileId) {
        try {
            return this.bucket.getFileView({
                bucketId: conf.appwriteBucketID,
                fileId,
            });
        } catch (error) {
            console.log("Appwrite Error :: Error getFileView :: ", error);
            throw error;
        }
    }


    // ---------- user profile service ------------

    async createUserProfile({userId, email, name}){
        try {
            return await this.databases.createDocument({
                databaseId: conf.appWriteDatabaseID,
                collectionId: conf.appwriteUsersCollectionID,
                documentId: userId,
                data: {
                    name: name,
                    email: email,
                },
            })
        } catch (error) {
            console.log("Appwrite Error :: Error in creating User Profile :: ",error);
            throw error;
        }
    }

    async updateUserProfile(userId, {email, name}){
        try {
            return await this.databases.updateDocument({
                databaseId: conf.appWriteDatabaseID,
                collectionId: conf.appwriteUsersCollectionID,
                documentId: userId,
                data: {
                    name: name,
                    email: email,
                },
            })
            
        } catch (error) {
            console.log("Appwrite Error :: Error in updating User Profile :: ",error);
            throw error;
        }
    }

    async deleteUserProfile(userId){
        try {
            await this.databases.deleteDocument({
                databaseId: conf.appWriteDatabaseID,
                collectionId: conf.appwriteUsersCollectionID,
                documentId: userId,
            })
            return true;
        } catch (error) {
            console.log("Appwrite Error :: Error in deleting User Profile :: ",error);
            throw error;
        }
    }

    async getUserProfile(userId){
        try {
            return await this.databases.getDocument({
                databaseId: conf.appWriteDatabaseID,
                collectionId: conf.appwriteUsersCollectionID,
                documentId: userId,
            });
        } catch (error) {
            console.log(`Appwrite Error :: Error in fetching User ${userId} Profile :: `,error);
            throw error;
        }
    }

    async getUserProfiles(queries = []){
        try {
            return await this.databases.listDocuments({
                databaseId: conf.appWriteDatabaseID,
                collectionId: conf.appwriteUsersCollectionID,
                queries: queries
            })
        } catch (error) {
            console.log("Appwrite Error :: Error in fetching user profiles :: ",error); 
            throw error;
        }
    }



}

const appwriteService = new Service();
export default appwriteService;