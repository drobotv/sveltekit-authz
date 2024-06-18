<script lang="ts">
    import {page} from '$app/stores';

  const { data, children } = $props();

  $page;
</script>

<div class="mx-auto w-full max-w-6xl gap-2">
  <h1 class="text-3xl font-semibold">Manage</h1>
</div>
<div class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
  <nav class="grid gap-4 text-sm text-muted-foreground">
    <a href="/dashboard/{data.org.id}/general" class="{$page.url.pathname.includes("/general") ? "font-semibold text-primary" : ""}">General</a>
    <a href="/dashboard/{data.org.id}/members" class="{$page.url.pathname.includes("/members") ? "font-semibold text-primary" : ""}">Members</a>
  </nav>
  <div class="grid gap-6">
    {@render children()}
  </div>
</div>
