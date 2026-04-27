---
description: Commit all current changes and push to origin
argument-hint: [commit message]
---

When this command is invoked, execute this workflow without extra confirmation.

1. Run `git status --short` and `git diff` to review pending changes.
2. Stage all tracked/untracked changes with `git add -A`.
3. Create a commit:
   - If arguments are provided, use them as the commit message.
   - If no arguments are provided, use: `Update project changes`.
4. Push to the current branch's upstream (`git push`).
5. Return:
   - commit hash
   - branch name
   - push result

If there are no changes, report that and skip commit/push.
