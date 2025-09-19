import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Debug API called');
    
    const { userId } = await auth();
    console.log('👤 User ID from Clerk:', userId);
    
    if (!userId) {
      return NextResponse.json({ 
        error: 'Unauthorized',
        debug: 'No userId from Clerk auth'
      }, { status: 401 });
    }

    // Check if user exists in database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        files: true,
        folders: true
      }
    });

    console.log('👤 User from database:', user ? {
      id: user.id,
      email: user.email,
      clerkId: user.clerkId,
      filesCount: user.files.length,
      foldersCount: user.folders.length
    } : 'User not found');

    if (!user) {
      return NextResponse.json({
        error: 'User not found in database',
        debug: {
          clerkUserId: userId,
          message: 'User exists in Clerk but not in database'
        }
      }, { status: 404 });
    }

    // Get all files
    const files = await prisma.file.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' }
    });

    console.log('📁 Files found:', files.length);

    return NextResponse.json({
      success: true,
      debug: {
        clerkUserId: userId,
        databaseUserId: user.id,
        userEmail: user.email,
        totalFiles: files.length,
        totalFolders: user.folders.length,
        files: files.map(file => ({
          id: file.id,
          name: file.name,
          size: file.size,
          url: file.url,
          createdAt: file.createdAt,
          updatedAt: file.updatedAt
        }))
      }
    });

  } catch (error) {
    console.error('❌ Debug API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      debug: {
        message: error.message,
        stack: error.stack
      }
    }, { status: 500 });
  }
}
