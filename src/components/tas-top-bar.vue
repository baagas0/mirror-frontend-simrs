<template>
  <div class="">
    <div v-if="lists.length > 2 || true">
      <Container class=" d-flex flex-row flex-wrap" @drop="onDrop" orientation="horizontal" drag-class="draggable" :auto-scroll-enabled="false">
        <Draggable v-for="(item, i) in lists" :key="item.path" class="parent-top-bar">
          <div class="child d-flex flex-row align-items-center mb-2" :class="[item.active ? 'active' : '', item.static ? 'static' : 'draggable']">
            <div
              class="child-detail pt-1 pb-1 pl-2 pr-2 d-flex flex-row align-items-center"
              @click="item.static == false ? $router.push(item.path) : staticFunction(item.name)"
            >
              <div class="icon" v-if="item.static === false">
                <svg
                  class="MuiSvgIcon-root"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                  ></path>
                </svg>
              </div>
              <div class="text">{{ item.name }}</div>
            </div>
            <div
              class="child-cls pt-1 pb-1 pl-2 pr-2 d-flex flex-row align-items-center"
              v-on:click="deleteList(i)"
              v-if="item.static === false"
            >
              <div class="text">X</div>
            </div>
          </div>
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'

export default {
  name: 'tas-top-bar',
  components: { Container, Draggable },
  computed: {
  },
  data () {
    return {
      currentIndex: 0,
      lists: [
        {
          name: 'Tutup Semua',
          path: null,
          static: true
        },
        {
          name: 'Tutup Selain',
          path: null,
          static: true
        }
      ]
    }
  },
  watch: {
    $route (to) {
      this.add(to.meta.title, to.fullPath)

      let i = 0
      for (let item of this.lists) {
        if (item.path === to.fullPath) {
          this.currentIndex = i
          break
        }
        i++
      }
    }
  },
  methods: {
    applyDrag (arr, dragResult) {
      const {
        removedIndex,
        addedIndex,
        payload
      } = dragResult
      if (removedIndex === null && addedIndex === null) return arr

      const result = [...arr]
      let itemToAdd = payload

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
      }

      return result
    },
    onDrop (dropResult) {
      if (dropResult.addedIndex < 2) {
        return
      }
      this.lists = this.applyDrag(this.lists, dropResult)
    },
    add (name, path) {
      let exist = false

      for (let item of this.lists) {
        if (item.name === name) {
          exist = true
          item.active = true
        } else {
          item.active = false
        }
      }

      if (exist === false) {
        this.lists.push({name, path, static: false, active: true})
      }
    },
    deleteList (index) {
      if (index < 2) {
        return
      }

      // const currentItem = this.lists[this.currentIndex]
      const targetItem = this.lists[index]
      const prevItem = this.lists[index - 1]
      const nextItem = this.lists[index + 1]

      if (this.lists.length === 3) {
        this.$router.push('/dashboard')
      } else if (targetItem.active === true) {
        if (nextItem.path) {
          this.$router.push(nextItem.path)
        } if (prevItem.path) {
          this.$router.push(prevItem.path)
        } else {
          this.$router.push('/dashboard')
        }
      } else if (targetItem.active === false) {
        if (index === 2) {
          if (targetItem.active === true) {
            if (this.lists.length > 3) {
              this.$router.push(this.lists[index + 1].path)
            } else {
              this.$router.push('/dashboard')
            }
          }
        }
      }

      this.lists.splice(index, 1)
    },
    staticFunction (name) {
      if (name === 'Tutup Semua') {
        this.lists.splice(2, 9999)
        this.$router.push('/dashboard')
      } else if (name === 'Tutup Selain') {
        this.lists = this.lists.filter(item => !(item.static === false && item.active === false))
      }
    }
  }
}
</script>

<style scoped>

.container-top-bar {
  gap: 1rem;
  padding-bottom: 2rem;
  padding-right: 15px ;
  padding-left: 15px;
}

.parent-top-bar {
  margin-right: 0.25rem;
  /* padding-top: 0.25rem; */
}

.parent-top-bar > .child {
  width: max-content;
  min-height: 30px;
  background-color: #979797;
  color: white;
  border-radius: 5px 5px 5px 5px;
  cursor: pointer;
}

.parent-top-bar > .active {
  background-color: #52525B;
}

.parent-top-bar > .child > .child-detail {
  min-height: 2rem;
  /* background-color: aqua */;
}

.parent-top-bar > .child:hover {
  background-color: #52525B !important;
}

.parent-top-bar > .child > .child-cls {
  /* height: 30px; */
  min-height: 30px;
  border-radius: 0px 5px 5px 0px;
  /* background-color: aqua */;
}

.parent-top-bar > .child > .child-detail > .icon:hover {
  cursor:grab
}
.parent-top-bar > .child > .child-cls:hover {
  background-color: #ff0000;
  cursor: pointer;
}
</style>
