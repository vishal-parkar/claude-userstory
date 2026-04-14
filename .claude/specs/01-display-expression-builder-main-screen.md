# Spec: Display-Expression-Builder-Main-Screen

---

## Overview

This feature implements the **RBP (Rule-Based Policy) Calculator main screen** — the entry point for building rule-based expressions. When a user navigates to the RBP Calculator route, they see a clean, structured interface containing the core interactive controls needed to begin constructing logical expressions:

- An **Expression** label/button (clickable)
- An **Add Comparator** label/button (clickable)
- A **+ and/or** button for joining conditions
- A **Group** button for creating sub-group conditions
- An **Add Expression** display area where expression tokens are rendered

This screen is the foundation for all subsequent Expression Builder stories (comparator selection, value input, grouping, etc.). It must render with no extra dropdowns — specifically, the `1Min` dropdown must **not** appear.

**User Stories Covered:** US-01

---

## Depends On

- Angular 19 standalone component architecture (already established)
- Angular Material (already installed via `angular.json`)
- Existing routing infrastructure (`app.routes.ts`, lazy-loading pattern)
- No backend dependency — this is a pure frontend UI story

---

## User Stories Covered

| Story ID | Description |
|----------|-------------|
| US-01    | Display Expression Builder Main Screen — view the RBP Calculator interface with all required controls |

---

## Frontend Scope

### Routes

Add to `frontend/src/app/app.routes.ts`:

```
/rbp-calculator   →  RbpCalculatorComponent  (lazy-loaded)
```

Redirect `/` or add a nav entry to `/rbp-calculator` as appropriate.

---

### Components

| Component | Path | Purpose |
|-----------|------|---------|
| `RbpCalculatorComponent` | `frontend/src/app/components/rbp-calculator/rbp-calculator.component.ts` | Container — the main screen shell |
| `ExpressionBuilderPanelComponent` | `frontend/src/app/components/rbp-calculator/expression-builder-panel/expression-builder-panel.component.ts` | Inner panel holding the expression controls |

> Follow existing standalone component pattern (no NgModule).

---

### State Management

- **Local component state only** for this story — no service or global store required.
- `RbpCalculatorComponent` holds an `expressions: ExpressionToken[]` array (initially empty).
- Clicking **Add Expression** / **+ and/or** / **Group** will mutate this local array (implemented in subsequent stories).

---

### API Integration

None — US-01 is display-only. No HTTP calls are made.

---

### Validations

None required for the display story. Controls are rendered unconditionally.

---

### UI Behaviour

| Element | Behaviour |
|---------|-----------|
| `Expression` label/button | Rendered as a clickable `mat-button` or styled anchor; emits `(click)` event (handler stubbed — implemented in later story) |
| `Add Comparator` label/button | Same as above — rendered as a clickable button, handler stubbed |
| `+ and/or` button | `mat-stroked-button` or `mat-flat-button`; appends a logical operator token (stubbed) |
| `Group` button | `mat-stroked-button`; initiates sub-group creation (stubbed) |
| `Add Expression` area | Renders a placeholder token display area; shows `ExpressionToken` chips/badges when populated (empty on load) |
| `1Min` dropdown | **MUST NOT appear** — do not include any interval/time-window select |

Layout must be clean — no stray controls beyond what is listed above.

---

### Styling Rules

- Use CSS custom properties (variables) for all colours — **no hardcoded hex values**.
- Follow the existing Angular Material `indigo-pink` theme already configured in `angular.json`.
- Component-scoped SCSS in `rbp-calculator.component.scss` and `expression-builder-panel.component.scss`.
- Layout: use Angular Material `mat-card` or a simple flex container; controls arranged horizontally in a toolbar-style row above the expression display area.

Example variable usage:
```scss
.rbp-calculator {
  background-color: var(--mat-app-background-color);
  color: var(--mat-app-on-background);
}
```

---

### Unit Testing (MANDATORY)

File: `frontend/src/app/components/rbp-calculator/rbp-calculator.component.spec.ts`

| Test | Description |
|------|-------------|
| renders component | `RbpCalculatorComponent` creates without errors |
| shows Expression button | DOM contains element with text `Expression` |
| shows Add Comparator button | DOM contains element with text `Add Comparator` |
| shows + and/or button | DOM contains element with text matching `and/or` |
| shows Group button | DOM contains element with text `Group` |
| shows Add Expression area | DOM contains the expression token display area |
| no 1Min dropdown | DOM does NOT contain any element with text `1Min` |
| Expression button is clickable | `(click)` binding exists on Expression button |
| Add Comparator button is clickable | `(click)` binding exists on Add Comparator button |

Use `TestBed`, `ComponentFixture`, and Angular testing utilities. Mock no external dependencies (no HTTP, no services).

---

## Templates

### Create

- `frontend/src/app/components/rbp-calculator/rbp-calculator.component.html`
- `frontend/src/app/components/rbp-calculator/rbp-calculator.component.scss`
- `frontend/src/app/components/rbp-calculator/rbp-calculator.component.ts`
- `frontend/src/app/components/rbp-calculator/rbp-calculator.component.spec.ts`
- `frontend/src/app/components/rbp-calculator/expression-builder-panel/expression-builder-panel.component.html`
- `frontend/src/app/components/rbp-calculator/expression-builder-panel/expression-builder-panel.component.scss`
- `frontend/src/app/components/rbp-calculator/expression-builder-panel/expression-builder-panel.component.ts`
- `frontend/src/app/components/rbp-calculator/expression-builder-panel/expression-builder-panel.component.spec.ts`

### Modify

- `frontend/src/app/app.routes.ts` — add `/rbp-calculator` lazy-loaded route

---

## Files to Change

| File | Change |
|------|--------|
| `frontend/src/app/app.routes.ts` | Add lazy-loaded route for `RbpCalculatorComponent` at `/rbp-calculator` |

---

## Files to Create

| File | Purpose |
|------|---------|
| `frontend/src/app/components/rbp-calculator/rbp-calculator.component.ts` | Main container standalone component |
| `frontend/src/app/components/rbp-calculator/rbp-calculator.component.html` | Template with layout and child panel |
| `frontend/src/app/components/rbp-calculator/rbp-calculator.component.scss` | Component styles using CSS variables |
| `frontend/src/app/components/rbp-calculator/rbp-calculator.component.spec.ts` | Unit tests |
| `frontend/src/app/components/rbp-calculator/expression-builder-panel/expression-builder-panel.component.ts` | Panel with Expression/AddComparator/and-or/Group buttons and token area |
| `frontend/src/app/components/rbp-calculator/expression-builder-panel/expression-builder-panel.component.html` | Panel template |
| `frontend/src/app/components/rbp-calculator/expression-builder-panel/expression-builder-panel.component.scss` | Panel styles |
| `frontend/src/app/components/rbp-calculator/expression-builder-panel/expression-builder-panel.component.spec.ts` | Panel unit tests |

---

## New Dependencies

No new dependencies — Angular Material is already installed.

---

## Rules for Implementation

- Use **parameterised queries** where any data binding is involved (no string interpolation for user-controlled data in templates)
- **Clean architecture separation**: route → container component → panel component; no business logic in templates
- **Reusable components**: `ExpressionBuilderPanelComponent` is self-contained and re-usable by other calculator screens
- Follow **existing project conventions**: standalone components, `inject()` over constructor injection, `OnPush` change detection preferred
- All components are `standalone: true` (no NgModule)
- No hardcoded colours — CSS variables only
- `1Min` dropdown must be explicitly absent — add a comment in the template: `<!-- NOTE: 1Min interval dropdown intentionally excluded per BA requirement -->`

---

## Definition of Done

- [ ] Navigating to `/rbp-calculator` renders the main screen
- [ ] `Expression` clickable label/button is present in the DOM
- [ ] `Add Comparator` clickable label/button is present in the DOM
- [ ] `+ and/or` button is present and rendered correctly
- [ ] `Group` button is present and rendered correctly
- [ ] `Add Expression` area/field is present (empty token area)
- [ ] `1Min` dropdown is **not** present anywhere in the rendered output
- [ ] Layout is clean with no extra/unexpected controls
- [ ] All unit tests written and passing (`ng test`)
- [ ] No console errors on page load
- [ ] Component uses CSS variables — no hardcoded colours
- [ ] Code follows Angular 19 standalone + Angular Material conventions
- [ ] TypeScript strict mode compliance (no `any` types)
