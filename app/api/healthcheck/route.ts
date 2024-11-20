import { NextResponse } from 'next/server';

export interface GetResponse {
    status: string;
}

export function GET() {
    return NextResponse.json<GetResponse>({ status: 'ok' });
}
