import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();

async function checkUserData() {
  try {
    console.log('🔍 Checking user data...\n');

    // Check all users
    const users = await prisma.user.findMany({
      include: {
        files: true,
        folders: true
      }
    });

    console.log(`📊 Total users: ${users.length}\n`);

    users.forEach((user, index) => {
      console.log(`👤 User ${index + 1}:`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Clerk ID: ${user.clerkId}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.name || 'N/A'}`);
      console.log(`   Created: ${user.createdAt}`);
      console.log(`   Files: ${user.files.length}`);
      console.log(`   Folders: ${user.folders.length}`);
      
      if (user.files.length > 0) {
        console.log('   📁 Files:');
        user.files.forEach(file => {
          console.log(`      - ${file.name} (${file.size} bytes, ${file.mimeType})`);
        });
      }
      
      console.log(''); // Empty line
    });

    // Check specifically for claytonofbusiness@gmail.com
    const claytonUser = await prisma.user.findUnique({
      where: { email: 'claytonofbusiness@gmail.com' },
      include: {
        files: true,
        folders: true
      }
    });

    if (claytonUser) {
      console.log('🎯 Clayton user found:');
      console.log(`   ID: ${claytonUser.id}`);
      console.log(`   Clerk ID: ${claytonUser.clerkId}`);
      console.log(`   Email: ${claytonUser.email}`);
      console.log(`   Files: ${claytonUser.files.length}`);
      console.log(`   Folders: ${claytonUser.folders.length}`);
    } else {
      console.log('❌ Clayton user NOT found in database');
    }

  } catch (error) {
    console.error('❌ Error checking user data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUserData();
