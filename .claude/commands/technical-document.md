---
name: technical-spec
description: Generate a technical specification document from user stories and create feature branch
argument-hint: path of userstory file
allowed-tools: Read, Write, Glob, Bash(git:*)
---

You are a Senior Software Architect and Backend/Frontend Lead.

Your task is to:
1. Convert given USER STORIES into a detailed TECHNICAL SPECIFICATION
2. Create a feature branch
3. Save the spec file

Follow all rules strictly.

User input: $ARGUMENTS

----------------------------------------
Step 1 — Check working directory is clean
----------------------------------------
Run git status.

If there are:
- uncommitted
- unstaged
- or untracked files

STOP and tell user:
"Please commit or stash your changes before proceeding."

DO NOT CONTINUE.

----------------------------------------
Step 2 — Parse arguments
----------------------------------------
Extract:

user_story_path:


feature_title:
- consider only file name that too string after first two dash - 

branch_name:
- feature/<feature_title>

If unclear → ASK USER.

----------------------------------------
Step 3 — Check branch name
----------------------------------------
Run:
git branch

If branch exists:
append:
-01, -02, etc.

----------------------------------------
Step 4 — Sync main branch
----------------------------------------
Run:

git checkout main
git pull origin main

----------------------------------------
Step 5 — Create feature branch
----------------------------------------
Run:

git checkout -b <branch_name>

----------------------------------------
Step 6 — Analyze codebase
----------------------------------------
Read:

- CLAUDE.md
- .claude/specs/*

Check:
- Step not already completed
If completed → STOP

----------------------------------------
Step 7 — Convert USER STORIES → TECH SPEC
----------------------------------------

IMPORTANT RULE:
Each user story may belong to:
- Frontend
- Backend
- Or both

Detect automatically based on:
- UI / interaction → Frontend
- API / DB / logic → Backend

----------------------------------------
SPEC FORMAT (STRICT)
----------------------------------------

Spec: <feature_title>

----------------------------------------
Overview
----------------------------------------
Explain:
- What feature does
- Why it exists
- Which user stories it covers

----------------------------------------
Depends on
----------------------------------------
Mention required previous steps.

----------------------------------------
User Stories Covered
----------------------------------------
List all user stories being implemented.

----------------------------------------
Frontend Scope (if applicable)
----------------------------------------

Routes:
- Page routes angular

Components:
- List of UI components

State Management:
- How state is handled

API Integration:
- API endpoints used

Validations:
- Input validations

UI Behavior:
- Dropdowns
- Toggles
- Dynamic UI logic

Styling Rules:
- Use CSS variables
- No hardcoded colors

Unit Testing (MANDATORY):
- Component tests
- Interaction tests

----------------------------------------
Backend Scope (if applicable)
----------------------------------------

Routes (APIs):
METHOD /path — description — access level

Controllers:
- Business logic description

Services:
- Core logic handling

Database changes:
- Tables / columns / constraints


Validation Rules:
- Input validation
- Error handling

Security:
- Auth rules
- Data protection

Unit Testing (MANDATORY):
- Service tests
- API tests

Performance Testing (MANDATORY):
- Load handling
- Response time benchmarks
- Edge case scenarios

----------------------------------------
Templates (if applicable)
----------------------------------------
Create:
Modify:

----------------------------------------
Files to change
----------------------------------------
List all files.

----------------------------------------
Files to create
----------------------------------------
List all new files.

----------------------------------------
New dependencies
----------------------------------------
List or:
"No new dependencies"

----------------------------------------
Rules for implementation
----------------------------------------
Always include:

- Use parameterised queries
- Clean architecture separation
- Reusable components
- Follow existing project conventions

----------------------------------------
Definition of Done
----------------------------------------
Checklist:

- Feature works end-to-end
- UI behaves correctly
- APIs return correct responses
- Unit tests written and passing
- (Backend only) Performance tested
- No console errors
- Code follows standards

----------------------------------------
Step 8 — Save spec
----------------------------------------
Save file:

.claude/specs/<step_number>-<feature_slug>.md

----------------------------------------
Step 9 — Output
----------------------------------------

Print ONLY:

Branch:    <branch_name>
Spec file: .claude/specs/<step_number>-<feature_slug>.md
Title:     <feature_title>

Then say:

"Review the spec at .claude/specs/<step_number>-<feature_slug>.md then enter Plan Mode with Shift+Tab twice to begin implementation."

DO NOT print full spec.