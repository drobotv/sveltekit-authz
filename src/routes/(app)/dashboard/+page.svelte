<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Input } from "$lib/components/ui/input";
  import OrgCard from "./org-card.svelte";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { superForm } from "sveltekit-superforms";
  import { valibotClient } from "sveltekit-superforms/adapters";
  import { createOrganizationSchema } from "$lib/valibot-schema";

  const { data } = $props();

  let isCreateOpen = $state(false);

  const form = superForm(data.form, {
    validators: valibotClient(createOrganizationSchema),
    onResult(event) {
      if (event.result.type === "redirect") {
        isCreateOpen = false;
      }
    },
  });

  const { form: formData, enhance, errors } = form;
</script>

<AlertDialog.Root bind:open={isCreateOpen}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Create new organization</AlertDialog.Title>
      <AlertDialog.Description>
        Your organization will be created and can listed on the platform.
        <form use:enhance method="POST" action="?/create">
          <Form.Field {form} name="name">
            <Form.Control let:attrs>
              <Form.Label>Name</Form.Label>
              <Input type="text" {...attrs} bind:value={$formData.name} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
          <Form.Field {form} name="description">
            <Form.Control let:attrs>
              <Form.Label>Description</Form.Label>
              <Textarea {...attrs} bind:value={$formData.description} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
          <Form.Errors errors={$errors._errors} />
        </form>
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <Button onclick={() => form.submit()}>Confirm</Button>
      <AlertDialog.Cancel
        class={buttonVariants({ variant: "outline" })}
        onclick={() => (isCreateOpen = false)}
      >
        Cancel
      </AlertDialog.Cancel>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

<div class="mx-auto w-full max-w-6xl gap-2 flex justify-between">
  <h1 class="text-3xl font-semibold">Your organizations</h1>
  <Button variant="outline" onclick={() => (isCreateOpen = true)}>
    Create new
  </Button>
</div>
<div
  class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
>
  {#each data.organizations as item}
    <OrgCard data={item.organization}></OrgCard>
  {/each}
</div>
