import { signIn } from "../../auth";

export default function LoginPage() {
  return (
    <main className="loginPage">
      <div className="loginCard">
        {/* Logo */}
        <div className="loginLogo">
          IR<span>.</span>
        </div>

        {/* Eyebrow */}
        <div className="eyebrow">INTERVIEW READY</div>

        {/* Heading */}
        <h1>
          Master interviews.
          <br />
          <span>Build confidence.</span>
        </h1>

        <p className="loginDescription">
          Practice DSA, prepare for coding interviews, track your progress,
          compete in contests and learn with your AI mentor.
        </p>

        {/* Authentication buttons */}
        <div className="loginButtons">
          {/* GitHub */}
          <form
            action={async () => {
              "use server";

              await signIn("github", {
                redirectTo: "/dashboard",
              });
            }}
          >
            <button type="submit" className="oauthButton">
              <span className="oauthIcon">⌘</span>

              <span>Continue with GitHub</span>

              <span>→</span>
            </button>
          </form>

         
        </div>

        {/* Divider */}
        <div className="loginDivider">
          <span />
          <p>SECURE AUTHENTICATION</p>
          <span />
        </div>

        {/* Features */}
        <div className="loginFeatures">
          <div>
            <span>✓</span>
            DSA Progress
          </div>

          <div>
            <span>✓</span>
            Contest History
          </div>

          <div>
            <span>✓</span>
            AI Mentor
          </div>
        </div>

        {/* Footer */}
        <div className="loginFooter">
          Your progress, bookmarks and interview activity will be saved to your
          account.
        </div>
      </div>
    </main>
  );
}
