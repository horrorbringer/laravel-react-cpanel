# Graph Report - .  (2026-07-21)

## Corpus Check
- 328 files · ~161,583 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 972 nodes · 1532 edges · 182 communities (176 shown, 6 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Account & Profile Settings UI|Account & Profile Settings UI]]
- [[_COMMUNITY_Auth Actions & User Model|Auth Actions & User Model]]
- [[_COMMUNITY_App Shell & Theme|App Shell & Theme]]
- [[_COMMUNITY_User & Post Models|User & Post Models]]
- [[_COMMUNITY_App Layout & Base UI|App Layout & Base UI]]
- [[_COMMUNITY_Frontend Dependencies|Frontend Dependencies]]
- [[_COMMUNITY_Build & Lint Tooling|Build & Lint Tooling]]
- [[_COMMUNITY_PHPLaravel Backend Deps|PHP/Laravel Backend Deps]]
- [[_COMMUNITY_Sidebar Navigation|Sidebar Navigation]]
- [[_COMMUNITY_Sidebar Layout Components|Sidebar Layout Components]]
- [[_COMMUNITY_App Header & Avatar|App Header & Avatar]]
- [[_COMMUNITY_Dropdown Menu UI|Dropdown Menu UI]]
- [[_COMMUNITY_Navigation Menu & Dialog UI|Navigation Menu & Dialog UI]]
- [[_COMMUNITY_Inertia Middleware & Policies|Inertia Middleware & Policies]]
- [[_COMMUNITY_Laravel Best-Practice Rules|Laravel Best-Practice Rules]]
- [[_COMMUNITY_Post Controller|Post Controller]]
- [[_COMMUNITY_Alert & Card UI|Alert & Card UI]]
- [[_COMMUNITY_Shadcn Component Config|Shadcn Component Config]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_App & Fortify Providers|App & Fortify Providers]]
- [[_COMMUNITY_Passkey Management UI|Passkey Management UI]]
- [[_COMMUNITY_Two-Factor Auth UI|Two-Factor Auth UI]]
- [[_COMMUNITY_Route Definitions|Route Definitions]]
- [[_COMMUNITY_Database Migrations|Database Migrations]]
- [[_COMMUNITY_Test Suite|Test Suite]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 127 edges
2. `require` - 29 edges
3. `Button()` - 25 edges
4. `Laravel Best Practices Skill` - 20 edges
5. `compilerOptions` - 15 edges
6. `useAppearance()` - 14 edges
7. `Controller` - 13 edges
8. `scripts` - 13 edges
9. `require-dev` - 12 edges
10. `InputError()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Deploy Workflow` --references--> `Laravel Framework`  [INFERRED]
  .github/workflows/deploy.yml → AGENTS.md
- `Dependabot Config` --references--> `PNPM Package Manager`  [INFERRED]
  .github/dependabot.yml → pnpm-workspace.yaml
- `Tests Workflow` --references--> `Pest Testing`  [INFERRED]
  .github/workflows/tests.yml → .agents/skills/pest-testing/SKILL.md
- `Inertia.js SPA` --conceptually_related_to--> `Laravel Framework`  [INFERRED]
  .agents/skills/inertia-react-development/SKILL.md → AGENTS.md
- `BreadcrumbEllipsis()` --calls--> `cn()`  [EXTRACTED]
  resources/js/components/ui/breadcrumb.tsx → resources/js/lib/utils.ts

## Import Cycles
- 1-file cycle: `resources/js/components/ui/sonner.tsx -> resources/js/components/ui/sonner.tsx`
- 1-file cycle: `resources/js/components/ui/input-otp.tsx -> resources/js/components/ui/input-otp.tsx`

## Hyperedges (group relationships)
- **Laravel Ecosystem Skills** — agents_skills_fortify_development_skill, agents_skills_inertia_react_development_skill, agents_skills_wayfinder_development_skill, agents_skills_pest_testing_skill, agents_skills_tailwindcss_development_skill, agents_skills_laravel_best_practices_skill [EXTRACTED 1.00]
- **Laravel Best Practices Ruleset** — agents_skills_laravel_best_practices_rules_advanced_queries, agents_skills_laravel_best_practices_rules_architecture, agents_skills_laravel_best_practices_rules_blade_views, agents_skills_laravel_best_practices_rules_caching, agents_skills_laravel_best_practices_rules_collections, agents_skills_laravel_best_practices_rules_config, agents_skills_laravel_best_practices_rules_db_performance, agents_skills_laravel_best_practices_rules_eloquent, agents_skills_laravel_best_practices_rules_error_handling, agents_skills_laravel_best_practices_rules_events_notifications, agents_skills_laravel_best_practices_rules_http_client, agents_skills_laravel_best_practices_rules_mail, agents_skills_laravel_best_practices_rules_migrations, agents_skills_laravel_best_practices_rules_queue_jobs, agents_skills_laravel_best_practices_rules_routing, agents_skills_laravel_best_practices_rules_scheduling, agents_skills_laravel_best_practices_rules_security, agents_skills_laravel_best_practices_rules_style, agents_skills_laravel_best_practices_rules_testing, agents_skills_laravel_best_practices_rules_validation [EXTRACTED 1.00]
- **CI/CD Pipeline** — github_workflows_tests, github_workflows_deploy, github_dependabot [INFERRED 0.85]

## Communities (182 total, 6 thin omitted)

### Community 0 - "Account & Profile Settings UI"
Cohesion: 0.06
Nodes (42): Heading(), InputError(), Props, ManageTwoFactor(), Props, Props, PasskeyRegistration(), Props (+34 more)

### Community 1 - "Auth Actions & User Model"
Cohesion: 0.05
Nodes (32): CreateNewUser, User, User, ResetUserPassword, Controller, DeployController, Request, HomeController (+24 more)

### Community 2 - "App Shell & Theme"
Cohesion: 0.06
Nodes (35): sonner, AppLogo(), AppLogoIcon(), AppearanceToggleTab(), Props, SearchInput(), Separator(), Toaster() (+27 more)

### Community 3 - "User & Post Models"
Cohesion: 0.06
Nodes (21): emailRules(), nameRules(), profileRules(), Post, User, Authenticatable, BelongsTo, PostFactory (+13 more)

### Community 4 - "App Layout & Base UI"
Cohesion: 0.08
Nodes (25): AppContent(), Props, AppShell(), Props, AppSidebar(), Badge(), badgeVariants, Table() (+17 more)

### Community 5 - "Frontend Dependencies"
Cohesion: 0.05
Nodes (41): dependencies, class-variance-authority, clsx, concurrently, globals, @inertiajs/react, @inertiajs/vite, input-otp (+33 more)

### Community 6 - "Build & Lint Tooling"
Cohesion: 0.05
Nodes (36): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-prettier, eslint-import-resolver-typescript, @eslint/js, eslint-plugin-import, eslint-plugin-react (+28 more)

### Community 7 - "PHP/Laravel Backend Deps"
Cohesion: 0.07
Nodes (29): require, inertiajs/inertia-laravel, laravel/chisel, laravel/fortify, laravel/framework, laravel/tinker, laravel/wayfinder, php (+21 more)

### Community 8 - "Sidebar Navigation"
Cohesion: 0.10
Nodes (21): NavUser(), SheetDescription(), Sidebar(), SidebarContext, SidebarGroupAction(), SidebarInput(), SidebarInset(), SidebarMenuAction() (+13 more)

### Community 9 - "Sidebar Layout Components"
Cohesion: 0.13
Nodes (21): footerNavItems, mainNavItems, NavFooter(), NavMain(), SidebarContent(), SidebarFooter(), SidebarGroup(), SidebarGroupContent() (+13 more)

### Community 10 - "App Header & Avatar"
Cohesion: 0.13
Nodes (17): AppHeader(), mainNavItems, Props, rightNavItems, Avatar(), AvatarFallback(), AvatarImage(), Sheet() (+9 more)

### Community 11 - "Dropdown Menu UI"
Cohesion: 0.13
Nodes (16): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator() (+8 more)

### Community 12 - "Navigation Menu & Dialog UI"
Cohesion: 0.15
Nodes (18): DialogOverlay(), NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger() (+10 more)

### Community 13 - "Inertia Middleware & Policies"
Cohesion: 0.16
Nodes (10): HandleAppearance, Closure, Request, Response, HandleInertiaRequests, Request, Post, User (+2 more)

### Community 14 - "Laravel Best-Practice Rules"
Cohesion: 0.10
Nodes (21): Advanced Queries Rule, Architecture Rule, Blade Views Rule, Caching Rule, Collections Rule, Config Rule, DB Performance Rule, Eloquent Rule (+13 more)

### Community 15 - "Post Controller"
Cohesion: 0.22
Nodes (5): Post, Request, Response, PostController, PostRequest

### Community 16 - "Alert & Card UI"
Cohesion: 0.19
Nodes (12): AlertError(), Props, Alert(), AlertDescription(), AlertTitle(), alertVariants, Card(), CardContent() (+4 more)

### Community 17 - "Shadcn Component Config"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 18 - "TypeScript Config"
Cohesion: 0.11
Nodes (17): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, module (+9 more)

### Community 19 - "App & Fortify Providers"
Cohesion: 0.20
Nodes (3): AppServiceProvider, FortifyServiceProvider, ServiceProvider

### Community 20 - "Passkey Management UI"
Cohesion: 0.19
Nodes (13): AfterEachCall, Architectable, BeforeEachCall, HigherOrderTapProxy, afterEach(), beforeEach(), Expectation, it() (+5 more)

### Community 21 - "Two-Factor Auth UI"
Cohesion: 0.20
Nodes (14): AGENTS Guidelines, Fortify Development Skill, Inertia React Development Skill, Pest Testing Skill, Tailwindcss Development Skill, Wayfinder Development Skill, Fortify Auth Backend, Inertia.js SPA (+6 more)

### Community 22 - "Route Definitions"
Cohesion: 0.15
Nodes (13): scripts, ci:check, dev, lint, lint:check, post-autoload-dump, post-create-project-cmd, post-root-package-install (+5 more)

### Community 23 - "Database Migrations"
Cohesion: 0.24
Nodes (10): AppSidebarHeader(), Breadcrumbs(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage() (+2 more)

### Community 24 - "Test Suite"
Cohesion: 0.17
Nodes (12): require-dev, fakerphp/faker, larastan/larastan, laravel/boost, laravel/pail, laravel/pao, laravel/pint, laravel/sail (+4 more)

### Community 25 - "Community 25"
Cohesion: 0.22
Nodes (8): description, keywords, license, minimum-stability, name, prefer-stable, $schema, type

### Community 26 - "Community 26"
Cohesion: 0.31
Nodes (5): PostEditorProps, ToolbarButtonProps, Tooltip(), TooltipContent(), TooltipTrigger()

### Community 27 - "Community 27"
Cohesion: 0.28
Nodes (7): Auth, Passkey, TwoFactorSecretKey, TwoFactorSetupData, User, InertiaConfig, InputHTMLAttributes

### Community 28 - "Community 28"
Cohesion: 0.29
Nodes (7): pestphp/pest-plugin, php-http/discovery, config, allow-plugins, optimize-autoloader, preferred-install, sort-packages

### Community 29 - "Community 29"
Cohesion: 0.29
Nodes (6): command, enabled, type, mcp, laravel-boost, $schema

### Community 30 - "Community 30"
Cohesion: 0.38
Nodes (7): Apple Touch Icon, Favicon SVG, Maskable Icon 192x192, Maskable Icon 512x512, PWA Icon 192x192, PWA Icon 512x512, PWA Asset Set

### Community 31 - "Community 31"
Cohesion: 0.43
Nodes (5): ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 33 - "Community 33"
Cohesion: 0.40
Nodes (5): autoload, psr-4, App\\, Database\\Factories\\, Database\\Seeders\\

### Community 34 - "Community 34"
Cohesion: 0.40
Nodes (5): extra, laravel, post-create-project, dont-discover, installer

### Community 37 - "Community 37"
Cohesion: 0.67
Nodes (3): autoload-dev, psr-4, Tests\\

### Community 38 - "Community 38"
Cohesion: 0.67
Nodes (3): PNPM Package Manager, Dependabot Config, PNPM Workspace Config

## Knowledge Gaps
- **267 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+262 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Navigation Menu & Dialog UI` to `Account & Profile Settings UI`, `App Shell & Theme`, `App Layout & Base UI`, `Sidebar Navigation`, `Sidebar Layout Components`, `App Header & Avatar`, `Dropdown Menu UI`, `Alert & Card UI`, `Database Migrations`, `Community 26`, `Community 31`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Frontend Dependencies` to `App Shell & Theme`, `Build & Lint Tooling`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `input-otp` connect `Frontend Dependencies` to `Account & Profile Settings UI`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _267 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Account & Profile Settings UI` be split into smaller, more focused modules?**
  _Cohesion score 0.06101231190150479 - nodes in this community are weakly interconnected._
- **Should `Auth Actions & User Model` be split into smaller, more focused modules?**
  _Cohesion score 0.05336538461538461 - nodes in this community are weakly interconnected._
- **Should `App Shell & Theme` be split into smaller, more focused modules?**
  _Cohesion score 0.06233766233766234 - nodes in this community are weakly interconnected._