import { subscribe } from '@/lib/tool-gate/service';

// The email gate (src/lib/tool-gate): one sign-up, sent on as one email and not stored. 404 while TOOL_GATE_MODE is off.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// run in Frankfurt (the Privacy Notice names it), on the way to the mailbox in Turkey
export const preferredRegion = 'fra1';

export function POST(req: Request) {
  return subscribe(req);
}
