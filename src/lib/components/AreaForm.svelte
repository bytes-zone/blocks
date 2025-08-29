<script lang="ts">
  import { Area } from '$lib/schema/area';
  import { co, Group } from 'jazz-tools';

  const {
    area,
    onsave,
  }: {
    area?: co.loaded<typeof Area, { title: true; notes: true; projects: true }>;
    onsave: (area: co.loaded<typeof Area, { title: true; notes: true; projects: true }>) => void;
  } = $props();

  let draftTitle = $state(area?.title?.toString() || '');
  let draftNotes = $state(area?.notes?.toString() || '');

  function save(e: SubmitEvent) {
    e.preventDefault();

    if (area) {
      area.title.$jazz.applyDiff(draftTitle);
      area.notes.$jazz.applyDiff(draftNotes);
      onsave(area);
    } else {
      onsave(
        Area.create(
          {
            title: co.plainText().create(draftTitle, Group.create()),
            notes: co.richText().create(draftNotes, Group.create()),
            projects: Area.shape.projects.create([], Group.create()),
          },
          Group.create(),
        ),
      );

      draftTitle = '';
      draftNotes = '';
    }
  }
</script>

<form onsubmit={save}>
  <label>
    <span>Title</span>
    <input type="text" placeholder="Title" bind:value={draftTitle} />
  </label>

  <label>
    <span>Notes</span>
    <textarea placeholder="Notes" bind:value={draftNotes}></textarea>
  </label>

  <button class="mt-4 btn w-full preset-filled-primary-500">
    {#if area}Save{:else}Create{/if}
  </button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
  }

  label {
    display: flex;
    flex-direction: column;
    gap: var(--size-1);
  }
</style>
