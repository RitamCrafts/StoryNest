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
                collectionId: conf.appwriteCollectionID,
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
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, userId}){
        try {
            return await this.databases.updateDocument({
                databaseId: conf.appWriteDatabaseID,
                collectionId: conf.appwriteCollectionID,
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
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument({
                databaseId: conf.appWriteDatabaseID,
                collectionId: conf.appwriteCollectionID,
                documentId: slug,
            })
            return true;
 
        } catch (error) {
            console.log("Appwrite Error :: Error in deleting Post :: ",error); 
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument({
                databaseId: conf.appWriteDatabaseID,
                collectionId: conf.appwriteCollectionID,
                documentId: slug,
            });
        } catch (error) {
            console.log("Appwrite Error :: Error in fetching Post :: ",error); 
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", ["active"])]){
        try {
            return await databases.listDocuments({
                databaseId: conf.appWriteDatabaseID,
                collectionId: conf.appwriteCollectionID,
                queries: queries
            })

        } catch (error) {
            console.log("Appwrite Error :: Error in fetching all posts :: ",error); 
            return false;
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
            return false;
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
            return false;
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
            return false;
        }
    }

}

const appwriteService = new Service();
export default appwriteService;