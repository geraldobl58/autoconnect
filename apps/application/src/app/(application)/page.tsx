import { Header } from "@/components/header";

const ApplicationPage = () => {
  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Visualização geral do sistema"
        content={
          <>
            <div className="h-8 w-8 rounded-full bg-gray-300" />
          </>
        }
      />
      <div className="p-4 m-4">
        <h1 className="text-2xl font-bold">Application Page</h1>
        <p>Welcome to the Application Page!</p>
      </div>
    </div>
  );
};

export default ApplicationPage;
