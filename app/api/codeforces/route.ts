import {NextResponse} from 'next/server';
export async function GET(){try{const r=await fetch('https://codeforces.com/api/problemset.problems',{next:{revalidate:3600}});if(!r.ok)throw new Error();const j=await r.json();return NextResponse.json({problems:j.result?.problems||[]});}catch{return NextResponse.json({problems:[],error:'Codeforces API unavailable'},{status:502})}}
