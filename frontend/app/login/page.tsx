import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="loginPage">
      <div className="loginCard">
        <h1 className="pageTitle">Sign in</h1>
        <p className="sub">WRX API</p>
        <LoginForm />
        <p className="loginFooter">
          <Link href="/">← Back to API</Link>
        </p>
      </div>
    </div>
  );
}
