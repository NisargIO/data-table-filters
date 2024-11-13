"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Minus } from "lucide-react";
import type { ColumnSchema } from "./schema";
import { isArrayOfNumbers } from "@/lib/is-array";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export const columns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: "filename",
    header: "File Path",
    cell: ({ row }) => {
      const value = row.getValue("filename") as string;
      const truncated = value.slice(-20);
      return <div className="max-w-[200px] truncate">{`${truncated}`}</div>;
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string;
      if (typeof value === "string") return value === rowValue;
      if (Array.isArray(value)) return value.includes(rowValue);
      return false;
    },
  },
  {
    accessorKey: "component_name",
    header: "Component Name",
    cell: ({ row }) => {
      const value = row.getValue("component_name");
      return <div className="max-w-[200px] truncate">{`${value}`}</div>;
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string;
      if (typeof value === "string") return value === rowValue;
      if (Array.isArray(value)) return value.includes(rowValue);
      return false;
    },
  },

  {
    accessorKey: "avgSelfTimes",
    header: "Average Self Time",
    cell: ({ row }) => {
      const value = row.getValue("avgSelfTimes") as number;
      if (typeof value === "undefined") {
        return <Minus className="h-4 w-4 text-muted-foreground/50" />;
      }
      return (
        <div>
          <span className="font-mono">{`${value.toFixed(2)}`}</span> ms
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as number;
      if (typeof value === "number") return value === Number(rowValue);
      if (Array.isArray(value) && isArrayOfNumbers(value)) {
        if (value.length === 1) {
          return value[0] === rowValue;
        } else {
          const sorted = value.sort((a, b) => a - b);
          return sorted[0] <= rowValue && rowValue <= sorted[1];
        }
      }
      return false;
    },
  },
  {
    accessorKey: "avgTotalTimes",
    header: "Average Total Time",
    cell: ({ row }) => {
      const value = row.getValue("avgTotalTimes") as number;
      if (typeof value === "undefined") {
        return <Minus className="h-4 w-4 text-muted-foreground/50" />;
      }
      return (
        <div>
          <span className="font-mono">{`${value.toFixed(2)}`}</span> ms
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as number;
      if (typeof value === "number") return value === Number(rowValue);
      if (Array.isArray(value) && isArrayOfNumbers(value)) {
        if (value.length === 1) {
          return value[0] === rowValue;
        } else {
          const sorted = value.sort((a, b) => a - b);
          return sorted[0] <= rowValue && rowValue <= sorted[1];
        }
      }
      return false;
    },
  },
  {
    accessorKey: "avgRenders",
    header: "Average Renders",
    cell: ({ row }) => {
      const value = row.getValue("avgRenders") as number;
      if (typeof value === "undefined") {
        return <Minus className="h-4 w-4 text-muted-foreground/50" />;
      }
      return (
        <div>
          <span className="font-mono">{`✖︎${value.toFixed(2)}`}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as number;
      if (typeof value === "number") return value === Number(rowValue);
      if (Array.isArray(value) && isArrayOfNumbers(value)) {
        if (value.length === 1) {
          return value[0] === rowValue;
        } else {
          const sorted = value.sort((a, b) => a - b);
          return sorted[0] <= rowValue && rowValue <= sorted[1];
        }
      }
      return false;
    },
  },
  {
    accessorKey: "url",
    header: "Full Path",
    cell: ({ row }) => {
      const value = row.getValue("url") as string;
      if (!value) return <div className="max-w-[200px] truncate">{value}</div>;
      const truncated = value.slice(-20);
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="max-w-[200px] truncate cursor-pointer">{truncated}</div>
          </HoverCardTrigger>
          <HoverCardContent className="w-[300px] break-all">
            {value}
          </HoverCardContent>
        </HoverCard>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string;
      if (typeof value === "string") return rowValue.includes(value);
      if (Array.isArray(value)) return value.some((v) => rowValue.includes(v));
      return false;
    },
  },
];
