<script lang="ts">
  const { data } = $props();

  let isPublic = $state(!!data.org.verified);

  $effect(() => {
    isPublic;
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = document.getElementById("verifiedForm") as HTMLFormElement;
    form.submit();
  };
</script>

<div class="flex flex-col space-y-2">
  <h1 class="text-2xl font-semibold">Change organization settings</h1>
  <h2>
    Your organization is currently
    <strong>
      {data.org.verified ? "" : " not"} visible
    </strong>
    on the public page.
  </h2>
</div>
<form id="verifiedForm" method="POST" class="w-full space-y-4">
  <input
    type="checkbox"
    name="verified"
    id="verified"
    bind:checked={isPublic}
    onchange={(e) => handleSubmit(e)}
  />
  <label for="verified">Visible on public page?</label>
</form>
