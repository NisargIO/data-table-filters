import { ARRAY_DELIMITER, RANGE_DELIMITER, SLIDER_DELIMITER } from "@/lib/delimiters";
import { REGIONS } from "@/constants/region";
import { TAGS } from "@/constants/tag";
import { z } from "zod";

export const columnSchema = z.object({
  avgSelfTimes: z.number(),
  avgTotalTimes: z.number(),
  avgRenders: z.number(),
  commitHash: z.string(),
  sumTotalBatches: z.number(),
  url: z.string(),
  filename: z.string(),
  component_name: z.string(),
});

export type ColumnSchema = z.infer<typeof columnSchema>;

export const columnFilterSchema = z.object({
  filename: z.string(),
  component_name: z.string(),
  avgSelfTimes: z
    .string()
    .transform((val) => val.split(SLIDER_DELIMITER))
    .pipe(z.coerce.number().array().max(2))
    .optional(),
  avgRenders: z
    .string()
    .transform((val) => val.split(SLIDER_DELIMITER))
    .pipe(z.coerce.number().array().max(2))
    .optional(),
  avgTotalTimes: z
    .string()
    .transform((val) => val.split(SLIDER_DELIMITER))
    .pipe(z.coerce.number().array().max(2))
    .optional(),
  commitHash: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(z.enum(REGIONS).array())
    .optional(),
  url: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(z.enum(REGIONS).array())
    .optional(),
});

export type ColumnFilterSchema = z.infer<typeof columnFilterSchema>;
