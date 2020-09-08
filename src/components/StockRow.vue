<template>
  <div>
        <tr>
          <td>
            {{title}}
          </td>
    <div v-for="sec  in secidList" :key=sec>
      <td>
        <Stock :secid="sec">
        </Stock>
      </td>
    </div>
        </tr>
  </div>
</template>

<script>
import Stock from './Stock'
export default {
  data: function () {
    return {}
  },
  props: ['secidList', 'title'],
  components: {
    Stock
  }
}
</script>

<style>
</style>
