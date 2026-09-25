import './globals.css';
import Link from 'next/link';
export const metadata={title:'InterviewReady — DSA & Interview OS',description:'LeetCode, Codeforces, DSA sheets, contests, CS fundamentals and AI mentor'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html><body><header><Link href="/" className="logo">Interview<span>Ready</span></Link><nav><Link href="/leetcode">LeetCode</Link><Link href="/codeforces">Codeforces</Link><Link href="/sheets">DSA Sheets</Link><Link href="/companies">Companies</Link><Link href="/contests">Contests</Link><Link href="/fundamentals">CS Fundamentals</Link><Link href="/ai">AI Mentor</Link></nav></header><main>{children}</main></body></html>}
