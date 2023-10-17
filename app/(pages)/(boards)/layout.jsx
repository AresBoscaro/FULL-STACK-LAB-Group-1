import { BoardsProvider } from "@/app/providers/boards-provider";

const BoardsLayout = ({ children }) => {
  return (
    <BoardsProvider>
      <div className="p-6 h-full flex items-center space-x-8">{children}</div>
    </BoardsProvider>
  );
};

export default BoardsLayout;
