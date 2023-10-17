import { Provider } from "@/app/providers/boards-provider";

const BoardsLayout = ({ children }) => {
  return (
    <Provider>
      <div className="p-6 h-full flex items-center space-x-8">{children}</div>
    </Provider>
  );
};

export default BoardsLayout;
