# Notebook for Forms

This React 18 and TypeScript app stores reusable form values in the browser. Users organize fields into tabs, edit their labels, and copy individual values to the clipboard.

## Working on the app

- Start in `src/App.tsx` for tab selection, edit mode, and the field list. The active tab is selected after the saved notebook loads asynchronously.
- Edit field controls in `src/components/Input/`. Both label and value editors keep a local draft and commit it on blur. The copy button reads the current draft.
- Use Ant Design v5 components and the existing CSS Modules for component styles. Imports such as `components/Input/InputCopy` resolve from `src/`.
- Read notebook state through `useInputsStore` selectors and update it through `InputsStoreMethods` in `src/store/useInputsStore.ts`. Each tab ID is also the key for its array of fields.
- When changing the stored format, account for existing notebooks. Zustand persists `tabs` and `inputs` through localForage under the key `inputs`. The current schema version is 1.

## Development commands

Run commands from the repository root.

- `npm ci` installs dependencies from the lockfile for a fresh checkout.
- `npm start` starts the Create React App development server.
- `npm run build` creates the production bundle in `build/`.
- `npm test -- --watchAll=false --runInBand` runs Jest once. The repo includes jest-dom setup in `src/setupTests.ts` but currently has no test files.

# Development workflow

For trivial changes or questions, handle the task directly.

For substantive implementation tasks, use the direct workflow by default.
Use the delegated workflow only when the user explicitly requests it for
the current task, for example: "use subagents", "use the delegated
workflow", or "use the planner -> coder -> reviewer flow". Do not infer
delegation from task size, complexity, or mentions of agent setup.
If the user asks for direct work, solo work, or no subagents, use the
direct workflow. Keep the selected workflow for the current task unless
the user changes it; delegation does not carry over to new tasks.

## Scope and approval

- Keep working code and existing development workflows as they are unless the
  user explicitly approves changing them. This includes cleanup, refactors,
  type annotations, and decorator signatures.
- Call out proposed changes to application entry points, development commands,
  and scripts explicitly in the plan. Verify whether the existing workflow can
  support the requested change before proposing a replacement.
- Put optional improvements at the end of the plan under **Optional
  suggestions**. Briefly explain the benefit of each suggestion, such as making
  a small block easier to read. Implement an optional suggestion only if the
  user explicitly approves it.
- If implementation reveals a change beyond the approved plan, explain the
  specific change and why it is needed. Wait for explicit approval before
  making it.

## Direct workflow

The top-level agent performs all work itself. Do not spawn subagents.

1. Inspect relevant code and define the approach, acceptance criteria,
   and validation steps.
2. Present the plan and wait for explicit approval before implementation,
   unless the user explicitly authorizes proceeding without approval
   after planning. Selecting direct work alone does not waive this pause.
3. Edit files, run appropriate validation, review the changes yourself,
   and correct any issues.
4. Summarize the changes, validation results, and unresolved issues.

## Delegated workflow

1. Act as planner and coordinator. Inspect relevant code and define
   the approach, acceptance criteria, and validation steps.
2. Present the plan to the user and wait for their explicit go-ahead
   before delegating to the coder or starting implementation. Skip this
   pause only when the user explicitly authorizes proceeding without
   approval after planning. Silence or elapsed time is not approval.
3. After approval, delegate implementation to the coder agent. Provide
   the original requirements, plan, acceptance criteria, and relevant
   constraints.
4. Wait for implementation and validation to finish.
5. Delegate review to the reviewer agent. Provide the requirements,
   acceptance criteria, changed files, and validation results.
6. Send actionable review findings to the coder for correction,
   then have the reviewer check the updated changes.
7. Allow at most two correction rounds. Report any remaining findings.
8. Summarize the changes, validation results, and unresolved issues.

Keep coding and review sequential. Only the coder should edit files
during the delegated workflow. This restriction does not apply to the
direct workflow.
