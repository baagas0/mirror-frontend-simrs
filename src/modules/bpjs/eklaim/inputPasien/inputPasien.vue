<template>
  <div>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, accusantium? Eum voluptas deleniti illum quas numquam sapiente ullam libero est facere eveniet, exercitationem, vitae laboriosam! Similique nobis dolor laboriosam id quos vitae tempora mollitia velit quisquam delectus doloribus, repellendus, ipsam quam blanditiis possimus eius, aliquid architecto adipisci porro rerum aliquam? Ipsa atque dignissimos deserunt fuga cum officia recusandae ex saepe animi maiores incidunt ipsam placeat adipisci corporis, dolore laboriosam doloribus, mollitia libero eaque quidem accusamus veniam assumenda laudantium. Ex suscipit fugiat atque perferendis magnam alias harum, in aliquid itaque hic? Vitae culpa incidunt similique eligendi nemo accusamus provident veniam aspernatur neque dolores aliquam doloremque id illo alias in quasi consequuntur natus, soluta accusantium eos, cupiditate fugiat harum. Architecto at, nihil dignissimos doloribus est delectus error cumque voluptatibus blanditiis, suscipit eius debitis minus autem eum commodi veniam tempore sunt officiis fugiat reiciendis a culpa! Nihil rem officia, incidunt quaerat sit laborum a nobis tempore magnam molestias modi explicabo dolore reprehenderit ab excepturi distinctio architecto veritatis consequuntur harum molestiae alias magni odio vel. Architecto, nihil optio. Suscipit numquam fuga optio, ea aliquam modi error maiores molestiae culpa vero praesentium non deleniti reprehenderit omnis repellat quos ducimus dicta corporis recusandae beatae! Excepturi, provident?
  </div>
</template>

<script>
export default {
  props: [
  ],
  data() {
    return {
      busy: false,
    }
  },
  computed: {
    
  },
  watch: {
  },
  async mounted() {
    const vm = this
    await vm.getData()
  },
  methods: {
    async getData(){
      const vm = this
      vm.busy = false
      try {
        // console.log('get data')
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        vm.$_alert.success('Terjadi Kelasalahan System')
        // console.log(error)
      } finally {
        vm.busy = false
      }
    },
  },
}
</script>