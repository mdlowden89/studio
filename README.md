# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Flowd Core

The Flowd Core demo implements a deterministic intake and triage engine with three verticals (employment, family, disputes).

### Running the web demo

```
npm run dev
```

Open `/flowd` to use the chat-style intake widget.

### API endpoints

- `POST /api/flowd/session/start` – start a session (body: `{ "vertical": "employment" | "family" | "disputes" }`).
- `POST /api/flowd/session/answer` – submit an answer (body: `{ session_id, question_id, user_text }`).
- `GET /api/flowd/session/:id` – fetch raw session state for debugging.
- `POST /api/flowd/handoff/send` – enqueue a brief hand-off payload.

### Scenario evaluation

A deterministic scenario suite (20 good/bad/borderline cases per module) lives in `src/lib/flowd/scenarios.ts`. Run a quick evaluation without starting the app via:

```
npx ts-node src/lib/flowd/run-scenarios.ts
```

This checks priority mapping and override triggers for every synthetic scenario.
