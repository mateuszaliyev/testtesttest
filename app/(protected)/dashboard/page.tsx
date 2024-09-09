import { auth, signOut } from "@/auth"
 
export default async function Page() {
  const session = await auth()
 
  if (!session) {
    return <div>Not authenticated</div>
  }
 
  return (
    <div className="container">
      {JSON.stringify(session)}
      <form action={async () => {
        "use server"

        await signOut();
      }}>
        <button type="submit">
      Sign out
      </button>
      </form>
      
    </div>
  )
}