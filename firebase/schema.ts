// https://firebase.google.com/docs/firestore/reference/rest/v1/StructuredQuery#Filter

export type WhereValue = string | number | boolean | string[];

export type WhereProps = [string, WhereOptions, WhereValue];

export type WhereOptions =
  | "LESS_THAN"
  | "LESS_THAN_OR_EQUAL"
  | "GREATER_THAN"
  | "GREATER_THAN_OR_EQUAL"
  | "EQUAL"
  | "NOT_EQUAL"
  | "ARRAY_CONTAINS"
  | "IN"
  | "ARRAY_CONTAINS_ANY"
  | "NOT_IN";

export interface FieldFilter {
  field: { fieldPath: string };
  op: WhereOptions;
  value:
    | { stringValue: string }
    | { integerValue: string }
    | { booleanValue: boolean }
    | {
        arrayValue: {
          values: ({ stringValue: string } | { referenceValue: string })[];
        };
      }
    | { referenceValue: string };
}

export interface StructuredQuery {
  from: { collectionId: string }[];
  orderBy?: {
    direction: "ASCENDING" | "DESCENDING";
    field: { fieldPath: string };
  }[];
  select?: { fields: { fieldPath: string }[] };
  where?: {
    fieldFilter?: FieldFilter;
    compositeFilter?: {
      filters: { fieldFilter: FieldFilter }[];
      op: "AND";
    };
  };
  limit?: number;
}

export interface BuildStructuredQueryProps {
  collectionId: string;
  orderBy?: [string, "asc" | "desc"];
  selectFields?: string[];
  where?: WhereProps | WhereProps[];
  limit?: number;
}
