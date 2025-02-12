export interface RateType {
  base: string;
  date: string;
  rates: {
    USD: number;
  };
  success: boolean;
  timestamp: number;
}

export type RateState = {
  rate: number;
  lastUpdated: number | null;
};
