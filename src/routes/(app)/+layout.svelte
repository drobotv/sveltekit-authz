<script lang="ts">
  import { CircleUser } from "lucide-svelte";
  import { Menu } from "lucide-svelte";

  import { Button } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import * as Sheet from "$lib/components/ui/sheet";
  import { page } from "$app/stores";

  const { data, children } = $props();

  $page;
</script>

<div class="flex min-h-screen w-full flex-col">
  <header
    class="sticky top-0 flex h-16 w-full items-center justify-between gap-4 border-b bg-background px-4 md:p-8"
  >
    <nav
      class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
    >
      <Button variant="link" href="/">Home</Button>
      <Button variant="link" href="/dashboard">Dashboard</Button>
    </nav>
    <Sheet.Root>
      <Sheet.Trigger asChild let:builder>
        <Button
          variant="outline"
          size="icon"
          class="shrink-0 md:hidden"
          builders={[builder]}
        >
          <Menu class="h-6 w-6" />
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="left">
        <nav class="grid gap-6 text-lg font-medium">
          <Button variant="link" href="/">Home</Button>
          <Button variant="link" href="/dashboard">Dashboard</Button>
        </nav>
      </Sheet.Content>
    </Sheet.Root>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button
          builders={[builder]}
          variant="secondary"
          size="icon"
          class="rounded-full"
        >
          <CircleUser class="h-6 w-6" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {#if data.user}
          <DropdownMenu.Label>{data.user.email}</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <form method="POST" action="/logout">
              <Button type="submit" variant="link">Logout</Button>
            </form>
          </DropdownMenu.Item>
        {:else}
          <DropdownMenu.Item href="/login">Login</DropdownMenu.Item>
          <DropdownMenu.Item href="/register">Register</DropdownMenu.Item>
        {/if}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </header>
  <main
    class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
  >
    {@render children()}
  </main>
</div>
