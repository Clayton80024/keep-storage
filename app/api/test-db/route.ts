import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test basic connection
    const userCount = await prisma.user.count();
    const fileCount = await prisma.file.count();
    
    console.log('📊 Database stats:', { userCount, fileCount });
    
    // Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        clerkId: true,
        name: true,
        createdAt: true,
        _count: {
          select: {
            files: true,
            folders: true
          }
        }
      }
    });
    
    console.log('👥 Users found:', users.length);
    
    return NextResponse.json({
      success: true,
      database: {
        connected: true,
        userCount,
        fileCount,
        users: users.map(user => ({
          id: user.id,
          email: user.email,
          clerkId: user.clerkId,
          name: user.name,
          filesCount: user._count.files,
          foldersCount: user._count.folders,
          createdAt: user.createdAt
        }))
      }
    });

  } catch (error) {
    console.error('❌ Database test error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Database connection failed',
      details: error.message
    }, { status: 500 });
  }
}
