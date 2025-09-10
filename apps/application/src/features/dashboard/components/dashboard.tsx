"use client";

import { Header } from "@/components/header";

export const Dashboard = () => {
  return (
    <>
      <Header title="Dashboard" subtitle="Visualização geral do sistema" />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Bem-vindo</h1>
        </div>
      </div>
    </>
  );
};
