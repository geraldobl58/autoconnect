"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTable, DataTableFilter } from "@/components/data-table";
import { Header } from "@/components/header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useVehicles } from "../hooks/use-vehicles";
import { getVehiclesAction } from "../actions/vehicles";
import { vehiclesColumns } from "./vehicles-columns";
import { VehicleQueryValues } from "../schemas/vehicles";

export const ListVehicles = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // Initialize query from URL params
  const [query, setQuery] = useState<Partial<VehicleQueryValues>>(() => {
    const params: Partial<VehicleQueryValues> = {
      page: 1,
      limit: 10,
    };

    // Get params from URL
    if (searchParams.get("page")) {
      params.page = parseInt(searchParams.get("page") || "1");
    }
    if (searchParams.get("limit")) {
      params.limit = parseInt(searchParams.get("limit") || "10");
    }
    if (searchParams.get("status")) {
      params.status = searchParams.get(
        "status"
      ) as VehicleQueryValues["status"];
    }
    if (searchParams.get("brand")) {
      params.brand = searchParams.get("brand") || undefined;
    }
    if (searchParams.get("model")) {
      params.model = searchParams.get("model") || undefined;
    }
    if (searchParams.get("sortBy")) {
      params.sortBy = searchParams.get(
        "sortBy"
      ) as VehicleQueryValues["sortBy"];
    }
    if (searchParams.get("sortOrder")) {
      params.sortOrder = searchParams.get(
        "sortOrder"
      ) as VehicleQueryValues["sortOrder"];
    }

    return params;
  });

  // Local state for search inputs (for debouncing)
  const [searchBrand, setSearchBrand] = useState(query.brand || "");
  const [searchModel, setSearchModel] = useState(query.model || "");

  // Refs to track current values
  const currentBrandRef = useRef(query.brand || "");
  const currentModelRef = useRef(query.model || "");

  const { vehicles, pagination, isLoading } = useVehicles(query);

  // Update URL when query changes
  const updateURL = useCallback(
    (newQuery: Partial<VehicleQueryValues>) => {
      const params = new URLSearchParams();

      Object.entries(newQuery).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.set(key, value.toString());
        }
      });

      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : "";

      router.replace(newUrl, { scroll: false });
    },
    [router]
  );

  // Update query and URL
  const handleQueryChange = useCallback(
    (updates: Partial<VehicleQueryValues>) => {
      const newQuery = { ...query, ...updates };
      setQuery(newQuery);
      updateURL(newQuery);
    },
    [query, updateURL]
  );

  // Debounce search brand
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchBrand !== currentBrandRef.current) {
        currentBrandRef.current = searchBrand;
        handleQueryChange({ brand: searchBrand || undefined, page: 1 });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchBrand, handleQueryChange]);

  // Debounce search model
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchModel !== currentModelRef.current) {
        currentModelRef.current = searchModel;
        handleQueryChange({ model: searchModel || undefined, page: 1 });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchModel, handleQueryChange]);

  // Update refs when query changes from external sources
  useEffect(() => {
    currentBrandRef.current = query.brand || "";
    currentModelRef.current = query.model || "";
    setSearchBrand(query.brand || "");
    setSearchModel(query.model || "");
  }, [query.brand, query.model]);

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    const status =
      value === "all" ? undefined : (value as VehicleQueryValues["status"]);
    handleQueryChange({ status, page: 1 }); // Reset to page 1 when filtering
  };

  const handleAddNew = () => {
    console.log("Adicionar novo veículo");
  };

  const handleRefresh = useCallback(async () => {
    try {
      // Reset all filters to initial state
      const initialQuery: Partial<VehicleQueryValues> = {
        page: 1,
        limit: 10,
      };

      // Update local search state
      setSearchBrand("");
      setSearchModel("");
      currentBrandRef.current = "";
      currentModelRef.current = "";

      // Update query state and URL
      setQuery(initialQuery);
      updateURL(initialQuery);

      // Invalidate all vehicles queries to force refresh
      await queryClient.invalidateQueries({ queryKey: ["vehicles"] });

      console.log("Filtros resetados e dados atualizados com sucesso");
    } catch (error) {
      console.error("Erro ao resetar filtros:", error);
    }
  }, [setQuery, updateURL, queryClient]);

  // Create searchable columns with local state for debouncing
  const searchableColumns: DataTableFilter[] = [
    {
      columnId: "brand",
      placeholder: "Buscar por marca...",
      label: "Marca",
      value: searchBrand,
      onChange: (value: string) => {
        setSearchBrand(value);
      },
    },
    {
      columnId: "model",
      placeholder: "Buscar por modelo...",
      label: "Modelo",
      value: searchModel,
      onChange: (value: string) => {
        setSearchModel(value);
      },
    },
  ];

  return (
    <>
      <Header
        title="Listagem de veículos"
        subtitle="Gerenciamento de veículos"
      />

      <div className="p-6 space-y-6">
        <div className="container mx-auto space-y-4">
          {/* Status Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="status-filter">Status:</Label>
              <Select
                value={query.status || "all"}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger id="status-filter" className="w-[200px]">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="AVAILABLE">Disponível</SelectItem>
                  <SelectItem value="RESERVED">Reservado</SelectItem>
                  <SelectItem value="SOLD">Vendido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Data Table */}
          <DataTable
            columns={vehiclesColumns}
            data={vehicles}
            isLoading={isLoading}
            title="Veículos"
            searchableColumns={searchableColumns}
            onAddNew={handleAddNew}
            onRefresh={handleRefresh}
            addButtonLabel="Novo Veículo"
            emptyMessage="Nenhum veículo encontrado."
            pagination={{
              page: query.page || 1,
              limit: query.limit || 10,
              total: pagination?.total || 0,
              totalPages: pagination?.totalPages || 0,
              hasNextPage: pagination?.hasNextPage || false,
              hasPrevPage: pagination?.hasPrevPage || false,
              onPageChange: (page: number) => handleQueryChange({ page }),
              onPageSizeChange: (limit: number) =>
                handleQueryChange({ limit, page: 1 }),
            }}
          />
        </div>
      </div>
    </>
  );
};
