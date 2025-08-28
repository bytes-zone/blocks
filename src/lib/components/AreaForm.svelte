<script lang="ts">
  import { Area } from '$lib/schema/area';
  import { co, Group } from 'jazz-tools';

  const {
    area,
    onsave,
  }: {
    area?: co.loaded<typeof Area, { title: true; notes: true }>;
    onsave: (area: Area) => void;
  } = $props();

  let draftTitle = $state(area?.title?.toString() || '');
  let draftNotes = $state(area?.notes?.toString() || '');

  function save(e: SubmitEvent) {
    e.preventDefault();

    if (area) {
      area.title.applyDiff(draftTitle);
      area.notes.applyDiff(draftNotes);
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

<form class="form" onsubmit={save}>
  <label class="label">
    <span class="label-text">Title</span>
    <input type="text" placeholder="Title" bind:value={draftTitle} />
  </label>

  <label class="label">
    <span class="label-text">Notes</span>
    <input type="text" placeholder="Notes" bind:value={draftNotes} />
  </label>

  <button class="mt-4 btn w-full preset-filled-primary-500">
    {#if area}Save{:else}Create{/if}
  </button>
</form>
