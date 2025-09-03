require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function fixUserData() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 50,
    });
    console.log('Connected successfully');

    // Get the users collection
    const db = mongoose.connection.db;
    const users = db.collection('users');    // Find users with null usernames
    const nullUsers = await users.find({ username: null }).toArray();
    console.log(`Found ${nullUsers.length} users with null usernames`);

    // Update each user with a generated username
    for (let i = 0; i < nullUsers.length; i++) {
      const user = nullUsers[i];
      const newUsername = `user${i + 1}`;
      await users.updateOne(
        { _id: user._id },
        { 
          $set: { 
            username: newUsername,
            updatedAt: new Date()
          }
        }
      );
      console.log(`Updated user ${user._id} with username: ${newUsername}`);
    }

    // Find and fix duplicate emails
    const pipeline = [
      {
        $group: {
          _id: "$email",
          count: { $sum: 1 },
          docs: { $push: "$_id" }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ];

    const duplicateEmails = await users.aggregate(pipeline).toArray();
    console.log(`Found ${duplicateEmails.length} duplicate email groups`);

    for (const group of duplicateEmails) {
      // Keep the first document, update others with unique emails
      const [first, ...duplicates] = group.docs;
      for (let i = 0; i < duplicates.length; i++) {
        const uniqueEmail = `${group._id.split('@')[0]}+${i+1}@${group._id.split('@')[1]}`;
        await users.updateOne(
          { _id: duplicates[i] },
          {
            $set: {
              email: uniqueEmail,
              updatedAt: new Date()
            }
          }
        );
        console.log(`Updated duplicate email for user ${duplicates[i]} to: ${uniqueEmail}`);
      }
    }    // Rebuild the unique indexes
    console.log('Dropping existing indexes...');
    try {
      await users.dropIndex('username_1');
      await users.dropIndex('email_1');
    } catch (error) {
      console.log('Some indexes might not exist:', error.message);
    }
    
    console.log('Creating new indexes...');
    await users.createIndex(
      { username: 1 }, 
      { 
        unique: true, 
        sparse: true,
        background: true
      }
    );
    
    await users.createIndex(
      { email: 1 }, 
      { 
        unique: true,
        background: true
      }
    );

    console.log('Database cleanup completed successfully');
  } catch (error) {
    console.error('Error fixing user data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

fixUserData();
