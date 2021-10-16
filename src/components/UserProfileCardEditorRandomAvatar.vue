<template>
  <div class="flex flex-col items-center mb-4 text-center">
    <button class="btn-green btn-xsmall" @click.prevent="getRandomImage">
      Random Avatar
    </button>
    <small class="opacity-50"
      >Powered by <a href="https://pixabay.com">Pixabay</a></small
    >
  </div>
</template>

<script>
import { arrayRandom } from '@/helpers'

export default {
  setup(_, { emit }) {
    const getRandomImage = async () => {
      const searchTerms = [
        'cats',
        'dogs',
        'abstract',
        'cars',
        'mountains',
        'beach',
        'landscape',
        'object',
        'food',
        'flowers',
        'architecture',
        'yellow',
        'green',
        'blue',
        'orange',
        'black',
        'white',
        'brown',
        'red',
        'patterns',
        'animal',
        'code',
        'space',
      ]

      const randomWord = arrayRandom(searchTerms)
      const res = await fetch(
        `https://pixabay.com/api/?key=${
          import.meta.env.VITE_APP_PIXABAY_API_KEY
        }&q=${randomWord}`
      )
      const data = await res.json()
      const randomImage = arrayRandom(data.hits)
      emit('hit', randomImage.webformatURL)
    }

    return {
      getRandomImage,
    }
  },
}
</script>
