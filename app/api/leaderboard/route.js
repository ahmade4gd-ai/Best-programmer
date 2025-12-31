import { NextResponse } from 'next/server';


let mockLeaderboard = [
  { name: "Samer_Cyber", points: 85400, level: 142, site: "Petra" },
  { name: "Lina_Dev", points: 72100, level: 110, site: "Babylon" },
  { name: "Jordan_Hacker", points: 65000, level: 95, site: "Jerash" },
];

export async function GET() {
  const sortedData = [...mockLeaderboard].sort((a, b) => b.points - a.points);
  return NextResponse.json(sortedData);
}

export async function POST(req) {
  const newEntry = await req.json();
  mockLeaderboard.push(newEntry);
  return NextResponse.json({ status: "Score Uploaded" });
}
