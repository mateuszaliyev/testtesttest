import { logout } from "@/actions/logout"
import { auth, signOut } from "@/auth"
import { useCurrentUser } from "@/hooks/use-current-user"
 
export default async function Page() {
  

  return (
    <div className="container">
      
      <button type="submit">
        Sign out
      </button>
      
    </div>
  )
}