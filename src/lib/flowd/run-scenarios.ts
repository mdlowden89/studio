import { scenarios, evaluateScenario } from "./scenarios";

function run() {
  const results = scenarios.map((scenario) => {
    const evaluation = evaluateScenario(scenario);
    const pass = evaluation.matches && evaluation.overrideTriggered;
    return { scenario: scenario.name, pass, expected: evaluation.expectedPriority, actual: evaluation.record.priority };
  });

  const passed = results.filter((r) => r.pass).length;
  console.log(`Ran ${results.length} scenarios: ${passed} passed, ${results.length - passed} failed.`);
  const failed = results.filter((r) => !r.pass);
  failed.slice(0, 10).forEach((f) => console.log(`Fail: ${f.scenario} expected ${f.expected} got ${f.actual}`));
}

run();
