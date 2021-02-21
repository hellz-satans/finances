<template>
  <section class="import-export m-4">
    <article class="card">
      <header>
        <h2>Import</h2>
      </header>

      <section>
        <p>Select an exported file and import it</p>
        <input
          ref="importFile"
          name="importFile"
          type="file"
          accept="*"
          @change="handleFile"
        />
      </section>

      <footer class="text-white justify-center bg-green-500 border border-green-600">
        <button
          type="button"
          @click.prevent.stop="readData"
        >
          <span class="icon">&#128193;</span>
          Upload
        </button>
      </footer>
    </article>

    <article class="card">
      <header class="card-header">
        <h2>Export</h2>
      </header>

      <section class="card-body">
        <ul>
          <li>Accounts</li>
          <li>Expenses</li>
        </ul>

        <details>
          <summary>
            If you're having trouble exporting as <code>.json</code>, export
            the data as a <code>.txt</code> file, it will still be in JSON
            format, just diferent extension.
          </summary>
          <p>
            Some mobile browsers will not let you download <code>.json</code>
            files for security reasons.
          </p>
        </details>
      </section>

      <footer class="justify-center text-white bg-blue-500 border border-blue-600">
        <button
          type="button"
          @click.prevent.stop="exportData()"
          class="mr-4"
        >
          <span class="icon">&#128190;</span>
          As .json
        </button>

        <button
          type="button"
          @click.prevent.stop="exportData('txt')"
        >
          <span class="icon">&#128190;</span>
          As .txt
        </button>
      </footer>
    </article>

    <article class="card">
      <header>
        <h2>Seed</h2>
      </header>

      <section>
        <p>Seed test data to see how it works</p>
      </section>

      <footer class="justify-center text-white bg-yellow-500 border border-yellow-600">
        <button
          type="button"
          @click.prevent.stop="seedData"
        >
          <span class="icon">&#9881;</span>
          Seed
        </button>
      </footer>
    </article>

    <article class="card">
      <header>
        <h2>Destroy</h2>
      </header>

      <section>
        <p>
          Destroy <strong>all</strong> local data
          &mdash; export first if unsure
        </p>
      </section>

      <footer class="justify-center text-white bg-red-500 border border-red-600">
        <button
          type="button"
          @click.prevent.stop="deleteData"
        >
          <span class="icon">&#128465;</span>
          Destroy
        </button>
      </footer>
    </article>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ... mapActions([ 'deleteData', 'exportData', 'importData', 'seedData' ]),
    handleFile(ev) {
      console.debug("handleFile: ev", ev)
    },
  }
}
</script>
