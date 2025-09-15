import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';

// Configure web-push with VAPID keys
webpush.setVapidDetails(
  'mailto:support@skinshine.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscription, userId } = body;

    // Store subscription in database
    // await subscriptionService.saveSubscription(userId, subscription);

    // Send welcome notification
    const payload = JSON.stringify({
      title: 'Welcome to SkinShine!',
      body: 'You will now receive important notifications about your appointments and health reminders.',
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png'
    });

    await webpush.sendNotification(subscription, payload);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Push subscription failed:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to notifications' },
      { status: 500 }
    );
  }
}