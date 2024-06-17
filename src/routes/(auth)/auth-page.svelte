<script lang="ts">
    import { Button } from "$lib/components/ui/button";
	import type { Snippet } from "svelte";

	const { children }: {
		children: Snippet;
	} = $props();
</script>

<div
	class="bg-background container relative h-full flex-col items-center justify-center grid lg:max-w-none grid-cols-1 lg:grid-cols-2 lg:px-0"
>
	<div class="relative hidden h-full flex-col bg-muted p-10 border-r lg:flex">
		<img
      src="/images/placeholder.svg"
      alt="placeholder"
      width="1920"
      height="1080"
      class="h-full w-full object-cover absolute inset-0"
    />
		<div class="relative z-20 flex items-center text-lg font-medium">
			<Button variant="link" href="/" class="text-2xl text-background">Home</Button>
		</div>
	</div>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[350px]">
			{@render children()}
		</div>
	</div>
</div>
