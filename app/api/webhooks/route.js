import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/clerk-sdk-node'; // ✅ Correct Clerk SDK
import { createOrUpdateUser, deleteUser } from '@/app/lib/users/user';

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SIGNING_SECRET to .env');
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('❌ Error verifying webhook:', err);
    return new Response('Invalid webhook signature', { status: 400 });
  }

  const { id } = evt?.data;
  const eventType = evt?.type;

  console.log(`✅ Webhook received: ${eventType} for user ${id}`);
  console.log('📦 Payload:', evt.data);

  // Handle user.created or user.updated
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { first_name, last_name, image_url, email_addresses, username } = evt?.data;

    try {
      const user = await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username
      );

      // Update Clerk public metadata on user.created
      if (user && eventType === 'user.created') {
        try {
          await clerkClient.users.updateUser(id, {
            publicMetadata: {
              userMongoId: user._id,
              isAdmin: user.isAdmin,
            },
          });
        } catch (error) {
          console.error('❌ Error updating Clerk metadata:', error);
        }
      }
    } catch (error) {
      console.error('❌ Error creating/updating user in MongoDB:', error);
      return new Response('Database error', { status: 400 });
    }
  }

  // Handle user.deleted
  if (eventType === 'user.deleted') {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error('❌ Error deleting user:', error);
      return new Response('Delete error', { status: 400 });
    }
  }

  return new Response('Webhook handled', { status: 200 });
}
