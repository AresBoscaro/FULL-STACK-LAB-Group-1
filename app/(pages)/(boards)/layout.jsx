import { BoardsProvider } from "@/app/context/boards-provider";

const BoardsLayout = ({ children }) => {
  return (
    <div className="p-6 h-full flex items-center space-x-8">
      <BoardsProvider>{children}</BoardsProvider>
    </div>
  );
};

export default BoardsLayout;
