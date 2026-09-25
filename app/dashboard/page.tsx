import Link from "next/link";
import { auth } from "../../auth";

export default async function DashboardPage() {
  const session = await auth();

  const user = session?.user;

  return (
    <main className="dashboardPage">
      <div className="dashboardContainer">
        {/* Header */}
        <div className="dashboardHeader">
          <div>
            <div className="eyebrow">INTERVIEW READY</div>

            <h1>
              Welcome back
              <span>.</span>
            </h1>

            <p>
              Track your DSA practice, contests, interview preparation and AI
              mentor sessions from one place.
            </p>
          </div>

          <div className="userCard">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="userAvatar"
              />
            ) : (
              <div className="userAvatarFallback">
                {(user?.name || "U").charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <strong>{user?.name || "Developer"}</strong>
              <span>{user?.email || "Signed in"}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <section className="dashboardStats">
          <div className="statCard">
            <span>DSA SOLVED</span>
            <strong>0</strong>
            <p>Problems completed</p>
          </div>

          <div className="statCard">
            <span>STREAK</span>
            <strong>0</strong>
            <p>Days learning</p>
          </div>

          <div className="statCard">
            <span>CONTESTS</span>
            <strong>0</strong>
            <p>Contests attempted</p>
          </div>

          <div className="statCard">
            <span>AI SESSIONS</span>
            <strong>0</strong>
            <p>Mentor conversations</p>
          </div>
        </section>

        {/* Main features */}
        <section className="dashboardGrid">
          <Link href="/leetcode" className="dashboardCard">
            <span className="cardNumber">01</span>

            <div>
              <h2>LeetCode</h2>
              <p>Practice problems by topic, difficulty and patterns.</p>
            </div>

            <span className="cardArrow">↗</span>
          </Link>

          <Link href="/codeforces" className="dashboardCard">
            <span className="cardNumber">02</span>

            <div>
              <h2>Codeforces</h2>
              <p>
                Explore problems by rating and competitive programming level.
              </p>
            </div>

            <span className="cardArrow">↗</span>
          </Link>

          <Link href="/sheets" className="dashboardCard">
            <span className="cardNumber">03</span>

            <div>
              <h2>DSA Sheets</h2>
              <p>Striver A2Z, Blind 75 and interview-focused sheets.</p>
            </div>

            <span className="cardArrow">↗</span>
          </Link>

          <Link href="/companies" className="dashboardCard">
            <span className="cardNumber">04</span>

            <div>
              <h2>Companies</h2>
              <p>Prepare company-wise coding interview problems.</p>
            </div>

            <span className="cardArrow">↗</span>
          </Link>

          <Link href="/contests" className="dashboardCard">
            <span className="cardNumber">05</span>

            <div>
              <h2>Virtual Contests</h2>
              <p>Simulate coding contests and track your performance.</p>
            </div>

            <span className="cardArrow">↗</span>
          </Link>

          <Link href="/ai" className="dashboardCard featuredCard">
            <span className="cardNumber">06</span>

            <div>
              <h2>AI Mentor</h2>
              <p>Get hints, explanations, approaches and interview guidance.</p>
            </div>

            <span className="cardArrow">↗</span>
          </Link>
        </section>

        {/* Continue learning */}
        <section className="continueSection">
          <div className="sectionHeading">
            <div>
              <div className="eyebrow">YOUR JOURNEY</div>
              <h2>Continue learning.</h2>
            </div>

            <span>01</span>
          </div>

          <div className="emptyProgress">
            <div>
              <strong>Start your first problem</strong>
              <p>Pick a DSA sheet or jump directly into LeetCode practice.</p>
            </div>

            <Link href="/sheets" className="primaryButton">
              Start practicing →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
