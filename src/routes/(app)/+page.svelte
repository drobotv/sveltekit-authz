<script lang="ts">
  import OrgCard from "./dashboard/org-card.svelte";

  const { data } = $props();
</script>

<div class="mx-auto w-full max-w-6xl gap-2 flex justify-between">
  <h1 class="text-3xl font-semibold">Public organizations</h1>
</div>
<div
  class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
>
  {#each data.listedOrgs as org}
    <OrgCard data={org}></OrgCard>
  {/each}
</div>
