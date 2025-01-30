export interface Exchange {
  provider: string | null;
  WARNING_UPGRADE_TO_V6: string | null;
  terms: string | null;
  base: string | null;
  date: string;
  time_last_updated: number;
  rates: { [key: string]: number } | null;
}
