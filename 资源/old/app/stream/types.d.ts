export interface Content {
  rule: "user" | "system";
  content: string;
  loading?: boolean;
}
