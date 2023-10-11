import {
  BuildStructuredQueryProps,
  StructuredQuery,
  WhereProps,
  WhereValue,
} from "@/firebase";

export const buildFetchRequestOption = ({
  collectionId,
  orderBy,
  selectFields,
  where,
  limit,
  tags,
}: {
  collectionId: string;
  orderBy?: [string, "asc" | "desc"];
  selectFields?: string[];
  where?: WhereProps | WhereProps[];
  limit?: number;
  tags?: string[];
}) => {
  const option: { method: string; body: string; next?: { tags: string[] } } = {
    method: "post",
    body: buildFetchRequestOptionBody({
      collectionId,
      orderBy,
      selectFields,
      where,
      limit,
    }),
  };
  if (!!tags) {
    option.next = { tags };
  }
  return option;
};

const buildFetchRequestOptionBody = ({
  collectionId,
  orderBy,
  selectFields,
  where,
  limit,
}: {
  collectionId: string;
  orderBy?: [string, "asc" | "desc"];
  selectFields?: string[];
  where?: WhereProps | WhereProps[];
  limit?: number;
}) => {
  const structuredQuery = buildStructuredQuery({
    collectionId,
    orderBy,
    selectFields,
    where,
    limit,
  });
  return JSON.stringify({ structuredQuery });
};

const buildStructuredQuery = ({
  collectionId,
  orderBy,
  selectFields,
  where,
  limit,
}: BuildStructuredQueryProps): StructuredQuery => {
  const query: StructuredQuery = { from: [{ collectionId }] };

  if (where) {
    // where の先頭が文字なら WhereProps
    if (typeof where[0] === "string") {
      const _where = where as WhereProps;
      query.where = buildWhere(_where);
    }
    // where の先頭が文字でなければ WhereProps[]
    else {
      const wheres = where as WhereProps[];
      const filters = wheres.map((where) => buildWhere(where));
      query.where = {
        compositeFilter: {
          filters,
          op: "AND",
        },
      };
    }
  }

  if (orderBy) {
    query.orderBy = [
      {
        field: {
          fieldPath: orderBy[0],
        },
        direction:
          orderBy[1] === "asc"
            ? "ASCENDING"
            : ("DESCENDING" as "ASCENDING" | "DESCENDING"),
      },
    ];
  }

  if (selectFields) {
    query.select = {
      fields: selectFields.map((field) => ({ fieldPath: field })),
    };
  }

  if (limit) {
    query.limit = limit;
  }
  return query;
};

const buildWhere = (where: WhereProps) => {
  const value = buildFieldFilterValue(where[2]);
  return {
    fieldFilter: {
      field: {
        fieldPath: where[0],
      },
      op: where[1],
      value,
    },
  };
};

const buildFieldFilterValue = (
  value: WhereValue,
):
  | { stringValue: string }
  | { integerValue: string }
  | { booleanValue: boolean }
  | {
      arrayValue: {
        values: ({ stringValue: string } | { referenceValue: string })[];
      };
    }
  | { referenceValue: string } => {
  switch (typeof value) {
    case "string":
      if (value.slice(0, 9) === "projects/") {
        return { referenceValue: value };
      }
      return { stringValue: value };
    case "number":
      return { integerValue: String(value) };
    case "boolean":
      return { booleanValue: value };
    case "object":
      return {
        arrayValue: {
          values: value.map((v) => {
            if (v.slice(0, 9) === "projects/") {
              return { referenceValue: v };
            }
            return { stringValue: v };
          }),
        },
      };
    default:
      throw new Error(`where is invalid ${value}`);
  }
};
