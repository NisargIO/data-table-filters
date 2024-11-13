import { DataTableFilterField } from "@/components/data-table/types";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { ColumnSchema } from "../schema";
import { searchParamsCache } from "../search-params";
import { Skeleton } from "../skeleton";

import * as React from "react";

export const generateFilterFields = (data: ColumnSchema[]) => {
  return [
    {
      label: "Average Self-Time",
      value: "avgSelfTimes",

      type: "slider",
      min: 0,
      max: 1000,
      options: data.map(({ avgSelfTimes }) => ({ label: `${avgSelfTimes}`, value: avgSelfTimes })),
      defaultOpen: true,
    },
    {
      label: "Average Total-Time",
      value: "avgTotalTimes",
      type: "slider",
      min: 0,
      max: 10000,
      options: data.map(({ avgTotalTimes }) => ({ label: `${avgTotalTimes}`, value: avgTotalTimes })),
      defaultOpen: true,
    },
    {
      label: "Average Renders",
      value: "avgRenders",
      type: "slider",
      min: 0,
      max: 10000,
      options: data.map(({ avgRenders }) => ({ label: `${avgRenders}`, value: avgRenders })),
      defaultOpen: true,
    },
    {
      label: "Commit Hash",
      value: "commitHash",
      type: "input",
      options: data.map(({ commitHash }) => ({ label: commitHash, value: commitHash })),
    },
    {
      label: "Full Path",
      value: "url",
      type: "input",
      options: data.map(({ url }) => ({ label: url, value: url })),
    },
    {
      label: "Component Name",
      value: "component_name",
      type: "input",
      options: data.map(({ component_name }) => ({ label: component_name, value: component_name })),
    },
  ] satisfies DataTableFilterField<ColumnSchema>[];
};

export default async function Page({ searchParams, params }: { searchParams: { [key: string]: string | string[] | undefined }; params: Promise<{ slug: string }> }) {
  const search = searchParamsCache.parse(searchParams);
  const slug = (await params).slug;

  let data;
  try {
    data = (await fetch("http://localhost:42069/api/v1/apm/components?apiKey=faire-staging-apm&commitHash=" + slug, {}).then((res) => res.json())) as any;
  } catch (error) {
    console.error(error);
    return <div>Error fetching data {JSON.stringify(error)}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <React.Suspense fallback={<Skeleton />}>
      <DataTable
        columns={columns}
        data={data}
        filterFields={generateFilterFields(data)}
        defaultColumnFilters={Object.entries(search)
          .map(([key, value]) => ({
            id: key,
            value,
          }))
          .filter(({ value }) => value ?? undefined)}
      />
    </React.Suspense>
  );
}
