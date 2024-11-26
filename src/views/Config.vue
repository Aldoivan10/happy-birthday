<template>
  <form @submit.prevent="gs.updateDB" class="container config">
    <article>
      <header>
        <h2>Colores de flores</h2>
        <span class="group">
          <label>
            <input
              type="checkbox"
              @change="gs.switchRainbow($event, flowersColors, '#3C71F7')"
            />
            Rainbow
          </label>
          <span class="btn-group">
            <button
              type="button"
              @click="gs.mutateArr(flowersColors, '#FFFFFF')"
            >
              +
            </button>
            <button
              type="button"
              @click="gs.mutateArr(flowersColors)"
              :disabled="flowersColors.length == 1"
            >
              -
            </button>
          </span>
        </span>
      </header>
      <ul class="list-colors">
        <li v-for="color in flowersColors" :key="color">
          <input
            type="color"
            :value="color"
            aria-label="Color picker"
            name="flowersColors"
            required
          />
        </li>
      </ul>
    </article>

    <article>
      <header>
        <h2>Probabilidades de aparición</h2>
      </header>

      <section class="flower-group">
        <div v-for="key in Object.keys(apparitions)" class="group">
          <AIFlower :type="key" size="1.3rem" />
          <p>{{ apparitions[key].title }}</p>
          <input
            :value="apparitions[key].value"
            name="apparitions"
            :data-type="key"
            @blur="gs.clamp"
            type="number"
            required
            max="10"
            min="0"
          />
          <span>/10</span>
        </div>
      </section>
    </article>

    <article>
      <header>
        <h2>Fuegos artificiales</h2>
        <span class="btn-group">
          <button type="button" @click="gs.mutateArr(texts, '')">+</button>
          <button
            type="button"
            @click="gs.mutateArr(texts)"
            :disabled="texts.length == 1"
          >
            -
          </button>
        </span>
      </header>
      <textarea v-for="text in texts" name="texts" required>{{
        text
      }}</textarea>
      <header style="margin-top: 0.1rem">
        <h2>Colores</h2>
        <span class="group">
          <label>
            <input
              checked
              type="checkbox"
              @change="gs.switchRainbow($event, fireworksColors, '#F4493C')"
            />
            Rainbow
          </label>
          <span class="btn-group">
            <button
              type="button"
              @click="gs.mutateArr(fireworksColors, '#FFFFFF')"
            >
              +
            </button>
            <button
              type="button"
              @click="gs.mutateArr(fireworksColors)"
              :disabled="fireworksColors.length == 1"
            >
              -
            </button>
          </span>
        </span>
      </header>

      <ul class="list-colors">
        <li v-for="color in fireworksColors" :key="color">
          <input
            type="color"
            :value="color"
            aria-label="Color picker"
            name="fireworksColors"
            required
          />
        </li>
      </ul>
    </article>

    <article>
      <header>
        <h2>Canciones</h2>
        <span class="group">
          <label>
            <input name="random" :checked="random" type="checkbox" />
            Aleatorio
          </label>
          <label>
            <input name="autoplay" :checked="autoplay" type="checkbox" />
            Rep. auto
          </label>
          <span class="btn-group">
            <button type="button" @click="gs.mutateArr(songs, '')">+</button>
            <button
              type="button"
              @click="gs.mutateArr(songs)"
              :disabled="songs.length == 1"
            >
              -
            </button>
          </span>
        </span>
      </header>
      <input v-for="song in songs" name="songs" required :value="song" />
    </article>

    <input type="submit" value="Guardar cambios" />
  </form>
</template>

<script setup>
import AIFlower from '@/components/AIFlower.vue'
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const gs = useGlobalStore()
const {
  flowersColors,
  apparitions,
  texts,
  fireworksColors,
  songs,
  random,
  autoplay,
} = storeToRefs(gs)

onMounted(async () => await gs.load())
</script>

<style>
.config {
  gap: 0.5rem;
  display: flex;
  flex-direction: column;

  padding: 1rem 0;

  .list-colors {
    margin: 0;
    gap: 0.5rem;
    display: grid;
    list-style: none;
    grid-template-columns: repeat(5, 1fr);

    li {
      list-style: none;
      margin: 0;

      input {
        margin: 0;
      }
    }
  }

  h2,
  label,
  input {
    margin: 0;

    &:has(input) {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
  }

  article {
    margin: 0;
    gap: 0.5rem;
    display: flex;
    flex-direction: column;

    header {
      gap: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  .group {
    gap: 0.5rem;
    flex-grow: 1;
    display: flex;
    align-items: center;

    @media (width <= 600px) {
      justify-content: space-between;
    }
  }

  .flower-group {
    display: grid;
    gap: 0.5rem 1rem;
    grid-template-columns: repeat(5, 1fr);

    .group {
      width: 100%;

      .flower {
        height: auto !important;
        position: relative;
      }
    }

    p {
      min-width: 5rem;
      margin: 0;
    }

    @media (width <= 1550px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (width <= 1160px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (width <= 600px) {
      flex-direction: column;
      justify-content: center;
      display: flex;
    }
  }

  .btn-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    button {
      height: 2rem;
      width: 2rem;
      padding: 0;
      margin: 0;
    }
  }

  @media (width <= 600px) {
    padding: 1rem 0.5rem;
  }
}
</style>
