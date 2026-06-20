import type { Build, BuildStep, Project, PurchaseRecord } from "./types";

export interface AxionClientOptions {
  baseUrl?: string;
  token: string;
}

export class AxionClient {
  private baseUrl: string;
  private token: string;

  constructor(options: AxionClientOptions) {
    this.baseUrl = options.baseUrl ?? "https://axtion.sh/api";
    this.token = options.token;
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });
    if (!res.ok) throw new Error(`Axtion API error: ${res.status} ${await res.text()}`);
    return res.json() as Promise<T>;
  }

  async createBuild(command: string): Promise<Build> {
    return this.request<Build>("/builds", {
      method: "POST",
      body: JSON.stringify({ command }),
    });
  }

  async getBuild(id: number): Promise<Build> {
    return this.request<Build>(`/builds/${id}`);
  }

  async listBuilds(): Promise<Build[]> {
    return this.request<Build[]>("/builds");
  }

  async getBuildSteps(buildId: number): Promise<BuildStep[]> {
    return this.request<BuildStep[]>(`/build-steps?buildId=${buildId}`);
  }

  async listProjects(): Promise<Project[]> {
    return this.request<Project[]>("/projects");
  }

  streamBuild(buildId: number, onStep: (step: BuildStep) => void): EventSource {
    const es = new EventSource(`${this.baseUrl}/builds/${buildId}/stream?token=${this.token}`);
    es.onmessage = (e) => {
      try { onStep(JSON.parse(e.data)); } catch {}
    };
    return es;
  }
}
