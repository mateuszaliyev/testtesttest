import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <LoginButton>
        <Button>
          Sign in
        </Button>
      </LoginButton>
    </main>
  );
}
