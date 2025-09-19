import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export async function getOrCreateUser() {
  const user = await currentUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  // Check if user exists in database
  let dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id }
  })

  // Create user if doesn't exist
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        name: user.fullName || user.firstName || '',
        imageUrl: user.imageUrl || '',
      }
    })
  }

  return dbUser
}

export async function getUserFiles(userId: string) {
  return await prisma.file.findMany({
    where: {
      userId,
      isDeleted: false
    },
    include: {
      folder: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getUserFolders(userId: string) {
  return await prisma.folder.findMany({
    where: {
      userId
    },
    include: {
      files: {
        where: {
          isDeleted: false
        }
      },
      children: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function createFolder(userId: string, name: string, parentId?: string) {
  // Generate path based on parent folder
  let path = `/${name}`
  
  if (parentId) {
    const parent = await prisma.folder.findUnique({
      where: { id: parentId }
    })
    if (parent) {
      path = `${parent.path}/${name}`
    }
  }

  return await prisma.folder.create({
    data: {
      name,
      path,
      parentId,
      userId
    }
  })
}

export async function createFile(
  userId: string, 
  name: string, 
  originalName: string,
  size: number,
  mimeType: string,
  extension: string,
  url?: string,
  folderId?: string
) {
  // Generate path
  let path = `/${name}`
  
  if (folderId) {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId }
    })
    if (folder) {
      path = `${folder.path}/${name}`
    }
  }

  return await prisma.file.create({
    data: {
      name,
      originalName,
      path,
      url,
      size,
      mimeType,
      extension,
      folderId,
      userId
    }
  })
}

export async function moveToTrash(userId: string, fileId: string) {
  return await prisma.file.update({
    where: {
      id: fileId,
      userId
    },
    data: {
      isDeleted: true,
      deletedAt: new Date()
    }
  })
}

export async function restoreFromTrash(userId: string, fileId: string) {
  return await prisma.file.update({
    where: {
      id: fileId,
      userId
    },
    data: {
      isDeleted: false,
      deletedAt: null
    }
  })
}

export async function permanentlyDeleteFile(userId: string, fileId: string) {
  return await prisma.file.delete({
    where: {
      id: fileId,
      userId
    }
  })
}

export async function getTrashedFiles(userId: string) {
  return await prisma.file.findMany({
    where: {
      userId,
      isDeleted: true
    },
    include: {
      folder: true
    },
    orderBy: {
      deletedAt: 'desc'
    }
  })
}
