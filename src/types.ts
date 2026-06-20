export interface Build {
  id: number;
  userId: string;
  command: string;
  status: "queued" | "running" | "success" | "failed";
  repoUrl: string | null;
  contractAddress: string | null;
  tokenAddress: string | null;
  createdAt: string;
}

export interface BuildStep {
  id: number;
  buildId: number;
  step: "repo" | "contracts" | "deploy" | "token";
  status: "pending" | "running" | "success" | "failed";
  output: string | null;
  createdAt: string;
}

export interface Project {
  id: number;
  userId: string;
  name: string;
  buildId: number;
  createdAt: string;
}

export interface PurchaseRecord {
  id: number;
  buildId: number;
  buyerUserId: string;
  txHash: string;
  createdAt: string;
}
