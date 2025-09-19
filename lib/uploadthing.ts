import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getOrCreateUser, createFile } from "@/lib/database";

const f = createUploadthing({
  token: process.env.UPLOADTHING_TOKEN,
});

export const ourFileRouter = {
  // File upload handler
  fileUploader: f({ 
    pdf: { maxFileSize: "16MB", maxFileCount: 1 },
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    video: { maxFileSize: "64MB", maxFileCount: 1 },
    audio: { maxFileSize: "16MB", maxFileCount: 1 },
    blob: { maxFileSize: "32MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      // Get user from Clerk
      const user = await getOrCreateUser();
      
      // Return user info for file creation
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Save file info to database
      const fileExtension = file.name.split('.').pop() || '';
      const mimeType = file.type || 'application/octet-stream';
      
      await createFile(
        metadata.userId,
        file.name,
        file.name,
        file.size,
        mimeType,
        fileExtension,
        file.url
      );

      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  // Multiple files upload handler
  multipleFileUploader: f({ 
    pdf: { maxFileSize: "16MB", maxFileCount: 10 },
    image: { maxFileSize: "4MB", maxFileCount: 10 },
    video: { maxFileSize: "64MB", maxFileCount: 5 },
    audio: { maxFileSize: "16MB", maxFileCount: 10 },
    blob: { maxFileSize: "32MB", maxFileCount: 10 },
  })
    .middleware(async ({ req }) => {
      const user = await getOrCreateUser();
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const fileExtension = file.name.split('.').pop() || '';
      const mimeType = file.type || 'application/octet-stream';
      
      await createFile(
        metadata.userId,
        file.name,
        file.name,
        file.size,
        mimeType,
        fileExtension,
        file.url
      );

      console.log("Multiple upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
