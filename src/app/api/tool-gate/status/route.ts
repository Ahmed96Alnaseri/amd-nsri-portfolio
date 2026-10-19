import { status } from '@/lib/tool-gate/service';

// The email gate (src/lib/tool-gate): whether it is on, and its text. 404 while TOOL_GATE_MODE is off.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// run in Frankfurt (the notice names it), on the way to the mailbox in Turkey
export const preferredRegion = 'fra1';

export function GET() {
  return status();
}
