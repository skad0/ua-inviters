<script>
  import { page } from "$app/stores";
  import "../app.css";
</script>

<div class="min-w-full min-h-full bg-secondary box-border py-4 px-32">
  <div
    class="px-8 py-4 rounded rounded-lg shadow shadow-lg min-h-max box-border bg-base-100"
  >
    {#if $page.url.pathname !== "/"}
      <div class="mb-4">
        <a class="text-sm text-secondary" href="/">← Назад</a>
      </div>
    {/if}
    <slot />
  </div>
</div>
