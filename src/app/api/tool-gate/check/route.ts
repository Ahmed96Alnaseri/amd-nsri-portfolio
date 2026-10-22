import { check } from '@/lib/tool-gate/service';

// The email gate (src/lib/tool-gate): whether a sign-up's hash is on the removed list. Answers only yes or no and
// logs nothing about it. 404 while TOOL_GATE_MODE is off.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// run in Frankfurt (the Privacy Notice names it), like the other gate routes
export const preferredRegion = 'fra1';

export function POST(req: Request) {
  return check(req);
}
