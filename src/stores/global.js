import { supabase } from '@/util/db'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const defFlowerColor = '#3C71F7'
  const rainbow = [
    defFlowerColor,
    '#F4493C',
    '#EA2568',
    '#9F2EB2',
    '#FFEC41',
    '#FFC30F',
    '#6C40B9',
    '#E5232B',
    '#5D12E7',
    '#08BED5',
  ]
  const flowersColors = ref([])
  const apparitions = ref({
    tulip: { title: 'Tulipanes', value: 0 },
    rose: { title: 'Rosas', value: 0 },
    dalia: { title: 'Dalias', value: 0 },
    chamomile: { title: 'Margaritas', value: 0 },
    grass: { title: 'Pasto', value: 0 },
  })
  const texts = ref([])
  const songs = ref([]) //'https://www.youtube.com/watch?v=u-_0fkY9FhI'
  const logged = ref(false)
  const random = ref(false)
  const fireworksColors = ref([...rainbow])

  const flowerFrecuency = computed(() => getFrecuency(apparitions.value))

  function getFrecuency(apparitions) {
    const arr = []
    for (const key in apparitions) {
      arr.push(...new Array(apparitions[key].value).fill(key))
    }
    return arr
  }

  function clamp(evt) {
    const $input = evt.target
    const val = parseInt($input.value)
    const min = parseInt($input.getAttribute('min'))
    const max = parseInt($input.getAttribute('max'))
    evt.target.value = Math.min(Math.max(val, min), max)
  }

  function switchRainbow(evt, arr, def) {
    while (arr.length > 0) arr.pop()
    if (evt.target.checked) arr.push(...rainbow)
    else arr.push(def)
  }

  function mutateArr(arr, val) {
    if (typeof val === 'string') arr.push(val)
    else arr.pop()
  }

  async function updateDB($evt) {
    const $form = $evt.target
    const newTexts = Array.from(
      $form.querySelectorAll('textarea[name=texts]'),
    ).map($txt => $txt.value)
    const newSongs = Array.from(
      $form.querySelectorAll('input[name=songs]'),
    ).map($txt => $txt.value)
    const newFlowerColors = Array.from(
      $form.querySelectorAll('input[name=flowersColors]'),
    ).map($txt => $txt.value)
    const newFireWorkColors = Array.from(
      $form.querySelectorAll('input[name=fireworksColors]'),
    ).map($txt => $txt.value)
    const newApparitions = Array.from(
      $form.querySelectorAll('input[name=apparitions]'),
    ).reduce((obj, $txt) => {
      obj[$txt.getAttribute('data-type')] = +$txt.value
      return obj
    }, {})

    const newRandom = $form.querySelector('input[name=random]').checked

    const { error } = await supabase
      .from('Configuration')
      .update({
        random: newRandom,
        songs: JSON.stringify(newSongs),
        texts: JSON.stringify(newTexts),
        apparitions: JSON.stringify(newApparitions),
        flowersColors: JSON.stringify(newFlowerColors),
        fireworksColors: JSON.stringify(newFireWorkColors),
      })
      .eq('id', 1)

    if (error) {
      alert('No se pudo actualizar')
      console.log(error)
    } else alert('Datos actualizados')
  }

  async function load() {
    const { data, error } = await supabase
      .from('Configuration')
      .select('*')
      .eq('id', 1)
    const [obj] = data
    if (error) console.log(error)
    else {
      const frecuency = JSON.parse(obj['apparitions'])
      for (const key in frecuency) {
        apparitions.value[key].value = frecuency[key]
      }

      random.value = JSON.parse(obj['random'])
      songs.value = JSON.parse(obj['songs'])
      texts.value = JSON.parse(obj['texts'])
      flowersColors.value = JSON.parse(obj['flowersColors'])
      fireworksColors.value = JSON.parse(obj['fireworksColors'])
    }
  }

  return {
    load,
    clamp,
    updateDB,
    mutateArr,
    switchRainbow,
    fireworksColors,
    flowerFrecuency,
    flowersColors,
    apparitions,
    random,
    logged,
    texts,
    songs,
  }
})
