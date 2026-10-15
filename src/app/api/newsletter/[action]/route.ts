import { NextResponse } from 'next/server';
import { cleanup, confirm, status, subscribe, unsubscribe } from '@/lib/newsletter/service';

export const dynamic = 'force-dynamic';

/*
 * Every newsletter endpoint in one route, so they run in one server function: the in-memory store used by preview
 * mode without a database is then shared between sign-up, confirmation and unsubscribe.
 *   POST /api/newsletter/subscribe | confirm | unsubscribe
 *   GET  /api/newsletter/status    (lets the tool pages show their "Get tool updates" link)
 *   GET  /api/newsletter/cleanup   (daily Vercel Cron, see vercel.json; needs CRON_SECRET)
 */
const notFound = () => NextResponse.json({ error: 'not_found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });

export function GET(req: Request, { params }: { params: { action: string } }) {
  if (params.action === 'status') return status();
  if (params.action === 'cleanup') return cleanup(req);
  return notFound();
}

export function POST(req: Request, { params }: { params: { action: string } }) {
  if (params.action === 'subscribe') return subscribe(req);
  if (params.action === 'confirm') return confirm(req);
  if (params.action === 'unsubscribe') return unsubscribe(req);
  return notFound();
}
