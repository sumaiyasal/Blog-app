// app/api/webhooks/clerk/route.js
import { headers } from 'next/headers';
import { Webhook } from 'svix'; // Clerk uses Svix under the hood
import { buffer } from 'node:stream/consumers';

// For Clerk signature verification
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req) {
  try {
    const payload = await req.text(); // raw body
    const headerPayload = headers();

    const svix = new Webhook(CLERK_WEBHOOK_SECRET);
    const evt = svix.verify(payload, {
      'svix-id': headerPayload.get('svix-id'),
      'svix-timestamp': headerPayload.get('svix-timestamp'),
      'svix-signature': headerPayload.get('svix-signature'),
    });

    const eventType = evt.type;
    const eventData = evt.data;

    // 🎯 Handle the event
    if (eventType === 'user.created') {
      console.log('👤 New user created:', eventData);
      // Save user to your DB here (optional)
    }

    if (eventType === 'user.deleted') {
      console.log('🗑 User deleted:', eventData.id);
      // Remove user from your DB (optional)
    }

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('❌ Webhook error:', err);
    return new Response('Webhook error', { status: 400 });
  }
}
