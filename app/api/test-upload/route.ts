import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Test database connection
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
    }

    // Test file creation
    const testFile = await prisma.file.create({
      data: {
        name: 'test-file.txt',
        originalName: 'test-file.txt',
        path: '/test-file.txt',
        size: 100,
        mimeType: 'text/plain',
        extension: 'txt',
        userId: user.id
      }
    });

    // Clean up test file
    await prisma.file.delete({
      where: { id: testFile.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Database connection and file creation working',
      user: {
        id: user.id,
        clerkId: user.clerkId,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Test upload error:', error);
    return NextResponse.json({ 
      error: 'Test failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
