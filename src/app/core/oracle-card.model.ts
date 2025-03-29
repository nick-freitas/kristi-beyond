export type OracleCard = {
  id: number;
  equipped?: boolean;
  level: number;
  name: string;
  effect?: string;
  path?: string;
  readings?: { header: string; content: string }[];
  readingsOnly?: boolean;
  readingsId?: string;
};
