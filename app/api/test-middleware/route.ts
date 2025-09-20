import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getOrCreateUser } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing UploadThing middleware...');
    
    const { userId } = await auth();
    console.log('🔑 Clerk userId:', userId);
    
    if (!userId) {
      console.log('❌ No userId from Clerk auth');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('✅ User authenticated, testing getOrCreateUser...');
    
    // Test the getOrCreateUser function that UploadThing uses
    const user = await getOrCreateUser();
    console.log('✅ getOrCreateUser successful:', {
      id: user.id,
      clerkId: user.clerkId,
      email: user.email
    });

    return NextResponse.json({
      success: true,
      message: 'UploadThing middleware test passed',
      user: {
        id: user.id,
        clerkId: user.clerkId,
        email: user.email
      }
    });

  } catch (error) {
    console.error('❌ UploadThing middleware test failed:', error);
    return NextResponse.json({ 
      error: 'UploadThing middleware test failed', 
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
