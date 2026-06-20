# @axtion/sdk

TypeScript SDK for the Axtion API.

## Install

```bash
npm install @axtion/sdk
```

## Usage

```typescript
import { AxionClient } from "@axtion/sdk";

const client = new AxionClient({ token: "your-clerk-session-token" });

// Trigger a build
const build = await client.createBuild("deploy an ERC-20 token called FooToken");
console.log(build.id);

// Stream build progress
const es = client.streamBuild(build.id, (step) => {
  console.log(step.step, step.status);
});

// Get result
const result = await client.getBuild(build.id);
console.log(result.contractAddress);
```

## API

### `new AxionClient(options)`

| Option | Type | Default | Description |
|---|---|---|---|
| `token` | `string` | required | Clerk session token |
| `baseUrl` | `string` | `https://axtion.sh/api` | API base URL |

### Methods

- `createBuild(command)` -- trigger a new build
- `getBuild(id)` -- get build by ID
- `listBuilds()` -- list all builds for the authenticated user
- `getBuildSteps(buildId)` -- get step-by-step progress
- `listProjects()` -- list projects
- `streamBuild(buildId, onStep)` -- real-time SSE stream, returns EventSource

## License

MIT
