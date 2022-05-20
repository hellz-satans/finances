<template>
  <section class="import-export m-4">
    <h1 class="text-3xl">{{ $t('data.title') }}</h1>

    <article class="card">
      <header>
        <h2>{{ $t('data.import.title') }}</h2>
      </header>

      <section>
        <p v-html="$t('data.import.description')"></p>
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
          {{ $t('data.import.action') }}
        </button>
      </footer>
    </article>

    <article class="card">
      <header class="card-header">
        <h2>{{ $t('data.export.title') }}</h2>
      </header>

      <section class="card-body">
        <ul>
          <li>{{ $t('data.export.accounts') }}</li>
          <li>{{ $t('data.export.expenses') }}</li>
        </ul>

        <details>
          <summary v-html="$t('data.export.summary')"></summary>
          <p class="text-sm mt-2" v-html="$t('data.export.description')"></p>
        </details>
      </section>

      <footer class="justify-center text-white bg-blue-500 border border-blue-600">
        <button
          type="button"
          @click.prevent.stop="exportData()"
          class="mr-4"
        >
          <span class="icon">&#128190;</span>
          {{ $t('data.export.as') }} .json
        </button>

        <button
          type="button"
          @click.prevent.stop="exportData('txt')"
        >
          <span class="icon">&#128190;</span>
          {{ $t('data.export.as') }} .txt
        </button>
      </footer>
    </article>

    <article class="card">
      <header>
        <h2>{{ $t('data.seed.title') }}</h2>
      </header>

      <section>
        <p v-html="$t('data.seed.description')"></p>
      </section>

      <footer class="justify-center text-white bg-yellow-500 border border-yellow-600">
        <button
          type="button"
          @click.prevent.stop="seedData"
        >
          <span class="icon">&#9881;</span>
          {{ $t('data.seed.action') }}
        </button>
      </footer>
    </article>

    <article class="card">
      <header>
        <h2>{{ $t('data.destroy.title') }}</h2>
      </header>

      <section>
        <p v-html="$t('data.destroy.description')"></p>
      </section>

      <footer class="justify-center text-white bg-red-500 border border-red-600">
        <button
          type="button"
          @click.prevent.stop="confirmDelete"
        >
          <span class="icon">&#128465;</span>
          {{ $t('data.destroy.action') }}
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
      if (this.$refs.importFile.files.length > 0) {
        const reader = new FileReader()

          reader.addEventListener('load', (ev) => {
            const data = JSON.parse(ev.target.result)
              this.importData(data)
          })

        reader.readAsBinaryString(this.$refs.importFile.files.item(0))
      }
    },

    confirmDelete() {
      window.confirm('Are you sure?') && this.deleteData()
    },
  }
}
</script>
