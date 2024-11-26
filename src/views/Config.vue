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
