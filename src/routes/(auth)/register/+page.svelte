<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input";
  import { registerSchema } from "$lib/valibot-schema";
  import { superForm } from "sveltekit-superforms";
  import { valibotClient } from "sveltekit-superforms/adapters";
  import AuthPage from "../auth-page.svelte";
  import { Button } from "$lib/components/ui/button";

  const { data } = $props();

  const form = superForm(data.form, {
    validators: valibotClient(registerSchema),
  });

  const { form: formData, enhance, errors } = form;
</script>

<AuthPage>
  <div class="flex flex-col space-y-2 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
  </div>
  <form method="POST" use:enhance class="w-full space-y-4">
    <Form.Field {form} name="email">
      <Form.Control let:attrs>
        <Form.Label>Email</Form.Label>
        <Input type="text" {...attrs} bind:value={$formData.email} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="name">
      <Form.Control let:attrs>
        <Form.Label>Username</Form.Label>
        <Input type="text" {...attrs} bind:value={$formData.name} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password">
      <Form.Control let:attrs>
        <Form.Label>Password</Form.Label>
        <Input type="password" {...attrs} bind:value={$formData.password} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="confirmPassword">
      <Form.Control let:attrs>
        <Form.Label>Confirm Password</Form.Label>
        <Input
          type="password"
          {...attrs}
          bind:value={$formData.confirmPassword}
        />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Errors errors={$errors._errors} />
    <Form.Button class="w-full">Register</Form.Button>
  </form>
  <Button variant="link" class="flex justify-end" href="/login">
    Already have an account? Go to login.
  </Button>
</AuthPage>
