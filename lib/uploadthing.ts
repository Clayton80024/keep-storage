import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getOrCreateUser, createFile } from "@/lib/database";

const f = createUploadthing();

export const ourFileRouter = {
  // File upload handler
  fileUploader: f({ 
    pdf: { maxFileSize: "16MB", maxFileCount: 1 },
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    video: { maxFileSize: "64MB", maxFileCount: 1 },
    audio: { maxFileSize: "16MB", maxFileCount: 1 },
    "text/plain": { maxFileSize: "4MB", maxFileCount: 1 },
    "application/zip": { maxFileSize: "32MB", maxFileCount: 1 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "16MB", maxFileCount: 1 }, // .docx
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { maxFileSize: "16MB", maxFileCount: 1 }, // .xlsx
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": { maxFileSize: "16MB", maxFileCount: 1 }, // .pptx
  })
    .middleware(async ({ req }) => {
      console.log("🔍 UploadThing middleware started");
      
      try {
        // Get user from Clerk
        const user = await getOrCreateUser();
        console.log("✅ User found/created:", { id: user.id, clerkId: user.clerkId });
        
        // Return user info for file creation
        return { userId: user.id };
      } catch (error) {
        console.error("❌ UploadThing middleware error:", error);
        throw error;
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("🎉 Upload complete callback started");
      console.log("📁 File info:", { name: file.name, size: file.size, url: file.url });
      console.log("👤 User metadata:", metadata);
      
      try {
        // Save file info to database
        const fileExtension = file.name.split('.').pop() || '';
        const mimeType = file.type || 'application/octet-stream';
        
        const savedFile = await createFile(
          metadata.userId,
          file.name,
          file.name,
          file.size,
          mimeType,
          fileExtension,
          file.url
        );

        console.log("✅ File saved to database:", savedFile.id);
        console.log("🔗 File URL:", file.url);
        
        return { uploadedBy: metadata.userId, url: file.url };
      } catch (error) {
        console.error("❌ Error saving file to database:", error);
        throw error;
      }
    }),

  // Multiple files upload handler
  multipleFileUploader: f({ 
    pdf: { maxFileSize: "16MB", maxFileCount: 10 },
    image: { maxFileSize: "4MB", maxFileCount: 10 },
    video: { maxFileSize: "64MB", maxFileCount: 10 },
    audio: { maxFileSize: "16MB", maxFileCount: 10 },
    "text/plain": { maxFileSize: "4MB", maxFileCount: 10 },
    "application/zip": { maxFileSize: "32MB", maxFileCount: 10 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "16MB", maxFileCount: 10 }, // .docx
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { maxFileSize: "16MB", maxFileCount: 10 }, // .xlsx
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": { maxFileSize: "16MB", maxFileCount: 10 }, // .pptx
  })
    .middleware(async ({ req }) => {
      console.log("🔍 Multiple upload middleware started");
      
      try {
        const user = await getOrCreateUser();
        console.log("✅ Multiple upload user found/created:", { id: user.id, clerkId: user.clerkId });
        return { userId: user.id };
      } catch (error) {
        console.error("❌ Multiple upload middleware error:", error);
        throw error;
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("🎉 Multiple upload complete callback started");
      console.log("📁 Multiple file info:", { name: file.name, size: file.size, url: file.url });
      
      try {
        const fileExtension = file.name.split('.').pop() || '';
        const mimeType = file.type || 'application/octet-stream';
        
        const savedFile = await createFile(
          metadata.userId,
          file.name,
          file.name,
          file.size,
          mimeType,
          fileExtension,
          file.url
        );

        console.log("✅ Multiple file saved to database:", savedFile.id);
        console.log("🔗 Multiple file URL:", file.url);
        
        return { uploadedBy: metadata.userId, url: file.url };
      } catch (error) {
        console.error("❌ Error saving multiple file to database:", error);
        throw error;
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
