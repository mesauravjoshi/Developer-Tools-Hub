export interface HeaderItem {
  key: string;
  value: string;
  enabled?: boolean;
}

export interface ParamItem {
  id: number;
  key: string;
  value: string;
  enabled: boolean;
}

export type MethodsTypes = "get" | "post" | "put" | "patch" | "delete";