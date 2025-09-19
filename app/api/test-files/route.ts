import { NextRequest, NextResponse } from 'next/server';
import { getUserFiles, getUserFolders } from '@/lib/database';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing files API with Clayton user...');
    
    // Get Clayton user directly from database
    const user = await prisma.user.findUnique({
      where: { email: 'claytonofbusiness@gmail.com' }
    });

    if (!user) {
      return NextResponse.json({ error: 'Clayton user not found' }, { status: 404 });
    }

    console.log('👤 Found user:', { id: user.id, email: user.email, clerkId: user.clerkId });

    // Get user files and folders using database user ID
    const files = await getUserFiles(user.id);
    const folders = await getUserFolders(user.id);

    console.log('📁 Files found:', files.length);
    console.log('📂 Folders found:', folders.length);

    // Transform data to match the current design
    const transformedFiles = files.map(file => ({
      id: file.id,
      name: file.name,
      originalName: file.originalName,
      size: formatFileSize(file.size),
      modified: formatDate(file.updatedAt),
      type: file.extension,
      isFolder: false,
      url: file.url,
      mimeType: file.mimeType,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt
    }));

    const transformedFolders = folders.map(folder => ({
      id: folder.id,
      name: folder.name,
      size: `${folder.files.length} items`,
      modified: formatDate(folder.updatedAt),
      type: 'folder',
      isFolder: true,
      path: folder.path,
      createdAt: folder.createdAt,
      updatedAt: folder.updatedAt
    }));

    // Combine folders and files, folders first
    const allItems = [...transformedFolders, ...transformedFiles];

    // Get recent files (last 3 files)
    const recentFiles = transformedFiles
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3);

    return NextResponse.json({
      success: true,
      debug: {
        userId: user.id,
        clerkId: user.clerkId,
        email: user.email,
        totalFiles: files.length,
        totalFolders: folders.length
      },
      allFiles: allItems,
      recentFiles,
      totalFiles: files.length,
      totalFolders: folders.length
    });

  } catch (error) {
    console.error('❌ Test files API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error.message
    }, { status: 500 });
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} weeks ago`;
  
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}
