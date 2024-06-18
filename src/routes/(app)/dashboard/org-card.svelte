<script lang="ts">
  import * as Card from "$lib/components/ui/card";

  type OrgInfo = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    ownerId: string;
    verified: number;
    description: string;
  };

  const {
    data,
  }: {
    data: OrgInfo;
  } = $props();
</script>

<a href={`/dashboard/${data.id}/general`} class="block no-underline">
  <Card.Root class="w-80 h-auto bg-white overflow-hidden rounded-lg">
    <Card.Header class="px-6 py-4">
      <Card.Title class="font-bold text-xl mb-2">{data.name}</Card.Title>
      <Card.Description class="text-gray-700 text-base">
        {data.verified ? "Listed" : "Not Listed"}
      </Card.Description>
    </Card.Header>
    <Card.Content class="px-6 py-4">
      {data.description}
    </Card.Content>
  </Card.Root>
</a>
