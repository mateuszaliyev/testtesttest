import { SessionProvider } from "next-auth/react";

interface SetupWrapperProps {
  children: React.ReactNode;
  className?: string;
}
const SetupWrapper = ({ children }: SetupWrapperProps) => {
  return <main className="mx-10 flex flex-col">{children}</main>;
};

export default SetupWrapper;
