import { BoardsProvider } from "@/app/providers/boards-provider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const BoardsLayout = async ({ children }) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/unauthenticated");

  return (
    <BoardsProvider>
      <div className="p-6 h-full flex items-center space-x-8">{children}</div>
    </BoardsProvider>
  );
};

export default BoardsLayout;
