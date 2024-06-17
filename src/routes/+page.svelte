<script lang="ts">
  const { data } = $props();
</script>

<form method="POST" action="/logout">
  <button>logout</button>
</form>

<pre>
  {JSON.stringify(data.user, null, 2)}
</pre>
